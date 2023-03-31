import TextField from "@mui/material/TextField";
import React, { useContext } from "react";
import { FormContext } from "./Form";

export default function FormInput(props) {
  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;
  const { label, type = "text", name } = props;

  return (
    <TextField
      {...props}
      sx={{ mt: 3, width: 300 }}
      variant="standard"
      margin="normal"
      name={name}
      value={form[name]}
      onChange={handleFormChange}
      label={label}
      type={type}
    />
  );
}
