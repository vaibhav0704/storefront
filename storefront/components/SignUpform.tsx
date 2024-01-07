import React, { useState } from "react";
import styled from "styled-components";
import {
  ErrorMessage,
  FormCard,
  StyledButton,
  StyledForm,
  StyledInput,
  StyledLabel,
} from "@/utils/utils";
import client from "@/utils/client";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Update the styles to match the design in the image

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter()

  const handleSignUp = async () => {
    // Implement sign up logic, e.g., make a request to your authentication API
    const data = await client('/auth/signup', 'post', { name, email, password })
    if (!data.response.data) {
      // Sign up successful, handle the response accordingly
      // console.log(window.localStorage.getItem('access_token'))
      router.push('./login')
    } else {
      // Sign up failed, handle the error
      // const errorData = await response.json(); // Assuming error messages are in the response body
      setError(data.response.data.message)
    }
  };

  return (
    <StyledForm>
         <h2 className="formHeading">SignUp</h2>
         <ErrorMessage>{error}</ErrorMessage>
      <FormCard>
        <StyledLabel htmlFor="name">name:</StyledLabel>
        <StyledInput
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledLabel htmlFor="email">Email:</StyledLabel>
        <StyledInput
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledLabel htmlFor="password">Password:</StyledLabel>
        <StyledInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton type="button" onClick={handleSignUp}>
          Sign Up
        </StyledButton>
      </FormCard>
    </StyledForm>
  );
};

export default SignUpForm;
