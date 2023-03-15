import React, { useContext } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { FormContext } from "../Form";

import betterInterests from "../../data/interests";
import FormInput from "../FormInput";
export default function InterestsDropdown({ label, placeholder, name }) {
  const formContext = useContext(FormContext);
  const { handleFormChange } = formContext;
  return (
    <Autocomplete
      multiple
      options={betterInterests}
      onChange={(event, newValue) => {
        const values = newValue.map((value) => value.title);
        handleFormChange(event, { name: name, value: values });
      }}
      getOptionLabel={(option) => option.title}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.key}>
            {option.title}
          </li>
        );
      }}
      renderInput={(params) => (
        <FormInput {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
}
