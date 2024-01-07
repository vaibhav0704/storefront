"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CartItemComp from "./CartItem";
import { Cart } from "../../../../types";
import client from "@/utils/client";

const CartContainer = styled.div`
  margin-top: 16px;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
`;

const CartWrapper = styled.div`
  margin-top: 16px;
  padding: 16px;
`

const ValueContainer = styled.div`

`
const Cart = () => {
  const [cart, setCart] = useState<Cart>();

  const getCart = async () => {
    const data = await client('/cart', 'get', {});

    if (!data?.response?.data) {
      setCart(data)
    } else {
      alert(data.response.data.message)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  if (cart) {
    return (
      <CartWrapper>
        <ValueContainer>
          <span>Total: {cart?.total}</span>
        </ValueContainer>
        <CartContainer>
          {cart?.items.map((item, index) => (
            <CartItemComp setCart={setCart} key={index} item={item} />
          ))}
        </CartContainer>
      </CartWrapper>
    )
  } else {
    return (
      <>
        <CartContainer>

        </CartContainer>
      </>
    )
  }
    
};

export default Cart;
