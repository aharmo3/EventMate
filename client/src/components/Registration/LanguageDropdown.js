import React, { useContext } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { FormContext } from "../Form";
import languages from "../../data/languages";
import FormInput from "../FormInput";

export default function LanguageDropdown({ label, placeholder, name }) {
  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;
  return (
    <>
      <Autocomplete
        multiple
        onChange={(event, newValue) => {
          handleFormChange(event, { name: name, value: newValue });
        }}
        options={languages}
        getOptionLabel={(option) => option && option.name}
        renderInput={(params) => (
          <FormInput {...params} label={label} placeholder={placeholder} />
        )}
      />
    </>
  );
}
