import { ConflictException, Injectable } from '@nestjs/common';
import { Cart, CartItem, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { RemoveCartItemDto } from './dto/remove-cart.dto';

@Injectable()
export class CartService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async getUserCart(userId: string): Promise<Cart> {
        return await this.prisma.cart.findFirst({
            where: {
                userId
            }
        })
    }

    private convertProductToCartItem(product: Product): CartItem {
        const { id, categoryId, ...remainingProperties } = product;

        return {
            productId: id,
            ...remainingProperties
        }
    }

    async addItemsToCart(userId: string, data: CreateCartDto): Promise<Cart> {
        const product = await this.prisma.product.findFirst({
            where: {
                id: data.productId
            }
        });

        if (!product) {
            throw new ConflictException('Invalid product provided')
        } else {
            let cart = await this.prisma.cart.findFirst({
                where: {
                    userId
                }
            })
            
            const cartItem = this.convertProductToCartItem(product);
            if (cart) {

                cart = await this.prisma.cart.update({
                    where: {
                        id: cart.id
                    },
                    data: {
                        items: [
                            ...cart.items,
                            cartItem
                        ],
                        total: {
                            increment: cartItem.price
                        }
                    }
                })
            } else {
                cart = await this.prisma.cart.create({
                    data: {
                        userId,
                        items: [cartItem],
                        total: cartItem.price
                    }
                })
            }

            return cart;
        }
    };

    async removeItemsFromCart(userId: string, data: RemoveCartItemDto): Promise<Cart | string> {
        let cart = await this.prisma.cart.findFirst({
            where: {
                userId
            }
        });

        if (cart) {

            for (let i=0; i<cart.items.length; i++) {

                if (cart.items[i].productId === data.productId) {

                    if (cart.items.length === 1) {
                        await this.prisma.cart.delete({
                            where: { id: cart.id }
                        })
                        
                        return 'cart is empty'
                    }

                    const itemToRemove = cart.items.splice(i, 1);
                    cart = await this.prisma.cart.update({
                        where: {
                            id: cart.id
                        },
                        data: {
                            items: cart.items,
                            total: {
                                decrement: itemToRemove[0].price
                            }
                        }
                    });
                    return cart;
                }
            };

            throw new ConflictException('Item was not present in cart')
        } else {
            throw new ConflictException('Cart does not exists')
        }
    }
}