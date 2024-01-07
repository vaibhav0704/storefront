import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;

  height: 100vh;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const StyledLeftSection = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  color: #252525;

  h1 {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledRightSection = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    height: 100%;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  height: 100vh;
  flex-direction: column;

  .formHeading {
    font-size: 2rem;
    margin-bottom: 15px;
  }
`;

export const FormCard = styled.div`
  width: 400px;
  padding: 30px 20px;
  border-radius: 10px;
  background-color: #292929;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StyledLabel = styled.label`
  font-size: 1rem;
  margin-bottom: 10px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #434343;
`;

export const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  margin-top: 20px;
  font-weight: bold;
  border: none;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0b69cd;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin: 5px 0px 5px 0px;
  font-weight: bold;
`;
