"use client";

import React from "react";
import styled from "styled-components";

const StyledOrders = styled.div`
  display: flex;
  padding: 20px;
`;

const MyOrders = () => {
  return (
    <StyledOrders>
      <h1>My Orders</h1>
    </StyledOrders>
  );
};

export default MyOrders;
