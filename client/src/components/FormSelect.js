import React, { useState, useContext } from "react";
import Select from "@mui/material/Select";
import Form, { FormContext } from "./Form";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import MenuItem from "@mui/material/MenuItem";
export default function FormSelect({ label, name, value, menu }) {
  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;

  return (
    <FormControl sx={{ mt: 3, width: 300 }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={form[name]}
        name={name}
        variant="standard"
        label={label}
        onChange={handleFormChange}
      >
        {menu.map((item) => (
          <MenuItem key={item.val} value={item.val}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
