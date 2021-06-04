import styled from "styled-components";

import { KeyboardDatePicker } from "@material-ui/pickers";

export const DatePicker = styled(KeyboardDatePicker)`
  width: 100%;
  height: 56px;

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 0!important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42)!important;
  background-color: #00000017;

  outline: 0;

  padding: 0 20px;

  font-size: 16px;
  color: #777 !important;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px !important;
  .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl.MuiInputBase-adornedEnd {
    width: 100%;
  }
  .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl.MuiInputBase-adornedEnd::before,
  .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl.MuiInputBase-adornedEnd::after {
    display: none;
  }
  .MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd {
    color: #000 !important;

    &::placeholder {
      color: #000 !important;
    }
  }
`;
