"use client";

import React from "react";
import LoginForm from "../../../components/Loginform";
import {
  StyledContainer,
  StyledLeftSection,
  StyledRightSection,
} from "@/utils/utils";

const LoginPage = () => {
  return (
    <StyledContainer>
      <StyledLeftSection>
        <h1>StoreFront</h1>
      </StyledLeftSection>
      <StyledRightSection>
        <LoginForm />
      </StyledRightSection>
    </StyledContainer>
  );
};

export default LoginPage;
