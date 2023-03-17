import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import Form from "../Form";
import LanguageDropdown from "./LanguageDropdown";
import LocationDropdown from "./LocationDropdown";
import InterestsDropdown from "./InterestsDropdown";
import UploadImage from "./UploadImage";
import ClientAPI from "../../helpers/ClientAPI";
import Local from "../../helpers/Local";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const userId = Local.getUserId();
  console.log(userId);

  const userInfo = Local.getUser();
  async function updateUser(form) {
    let myresponse = await ClientAPI.updateUser(form, userId);

    if (myresponse.ok) {
      const updatedUser = { ...userInfo, ...form };
      Local.updateUserInfo(updatedUser);
      navigate(`/events`);
    } else {
      console.log('Error!', myresponse.error);
    }
  }

  return (
    <Form
      submit={(form) => {
        // TODO: data for submit
        updateUser(form);
      }}
      formInitialValues={{
        age: userInfo?.age || "",
        gender: userInfo?.gender || "",
        location: userInfo?.location || "",
        occupation: userInfo?.occupation || "",
        languages: userInfo?.languages || [],
        interests: userInfo?.interests || [],
        avatarURL: userInfo?.avatarURL || "",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">A Few More Details...</Typography>
        </Grid>

        <Grid item xs={6}>
          <FormInput label="Age" name="age" type="number" required />

          <FormSelect
            label="Gender"
            name="gender"
            required
            menu={[
              { val: "Male", label: "Male" },
              { val: "Female", label: "Female" },
              { val: "Non-Binary", label: "Non-Binary" },
            ]}
          />

          <FormControl sx={{ mt: 5, width: 300 }}>
            <LocationDropdown
              label="Where I live now"
              required
              name="location"
              defaultValue={userInfo.location}
            />
          </FormControl>

          <FormInput label="Occupation" name="occupation" />
        </Grid>
        <Grid item xs={6}>
          <LanguageDropdown
            label="Languages I speak"
            name="languages"
            placeholder="Select A Language"
            defaultValue={userInfo.languages}
          />

          <InterestsDropdown
            label="General Interests"
            name="interests"
            placeholder="Select An Interest"
          />
          <FormControl sx={{ mt: 5, width: 300 }}>
            <UploadImage name="avatarURL" />
          </FormControl>
          <FormControl sx={{ mt: 5, width: 300 }}>
            <FormInput label="About Me" name="about" multiline />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" type="submit" size="large">
              Submit
            </Button>
        </Grid>
      </Grid>
    </Form>
  );
}
