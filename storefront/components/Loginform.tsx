import client from "@/utils/client";
import {
  ErrorMessage,
  FormCard,
  StyledButton,
  StyledForm,
  StyledInput,
  StyledLabel,
} from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    // Implement sign up logic, e.g., make a request to your authentication API
    const data = await client('/auth/signin', 'post', { email, password })

    console.log(data)

    if (!data?.response?.data) {
      // Sign up successful, handle the response accordingly
      window.localStorage.setItem('access_token', data.access_token)
      router.push('/')
    } else {
      // Sign up failed, handle the error
      // const errorData = await response.json(); // Assuming error messages are in the response body
      setError(data.response.data.message)
    }
  };

  return (
    <StyledForm>
      <h2 className="formHeading">Login</h2>
      <ErrorMessage>{error}</ErrorMessage>
      <FormCard>
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
        <StyledButton type="button" onClick={handleLogin}>
          Login
        </StyledButton>
      </FormCard>
    </StyledForm>
  );
};

export default LoginForm;
