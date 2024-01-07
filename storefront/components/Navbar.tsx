"use client";

import styled from "styled-components";

import Link from "next/link";

const StyledNavbars = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #252525;
  color: #ffffff;

  .siteName a {
    color: #ffffff;
    text-decoration: none;
  }

  .navLinks {
    display: flex;
    gap: 30px;
    a {
      color: #ffffff;
      text-decoration: none;
    }
  }
`;

export const Navbars = () => {
  return (
    <StyledNavbars>
      <h1 className="siteName">
        <Link href="/">StoreFront</Link>
      </h1>
      <div className="navLinks">
        <Link href="/cart">Cart</Link>
        <Link href="/myorders">My Orders</Link>
      </div>
    </StyledNavbars>
  );
};
