export interface Product {
    id: string,
    name: string,
    price: number,
    description: string,
    image: Image,
}

export interface Category {
    id: string,
    name: string,
    products: Products[]?
}

export interface Cart {
    id: string,
    userId: string,
    items: CartItem[],
    total: number    
}

export type CartItem = {
    productId: string,
    name: string,
    price: number,
    description: string,
    image: Image
}

export type Image = {
    alt: string,
    src: string,
}