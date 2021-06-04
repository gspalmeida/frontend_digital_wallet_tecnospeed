import styled from "styled-components";

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 25px;
  margin-bottom: 25px;

  width: 85%;
`;

export const Input = styled.input`
  width: 100%;
  height: 56px;

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  background-color: #00000017;

  outline: 0;

  padding: 0 20px;

  font-size: 16px;

  &::placeholder {
    color: #777;
    font-size: 16px;
  }
  &:nth-child(n + 1) {
    margin-bottom: 15px;
  }
`;
