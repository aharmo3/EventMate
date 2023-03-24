import React from "react";
import Button from "@mui/material/Button";
import LinearStepper from "./LinearStepper";
import { useParams, useNavigate } from "react-router-dom";

export default function NextBar({ activeStep, prevCb, nextCb }) {
  const navigate = useNavigate();

  return (
    <div className="next-bar">
      <div>
        {prevCb && (
          <Button
            size="large"
            variant="contained"
            type="submit"
            onClick={() => {
              prevCb();
            }}
          >
            Back
          </Button>
        )}
      </div>
      <div>
        <LinearStepper activeStep={activeStep} />
      </div>
      <div>
        {nextCb && (
          <Button
            size="large"
            variant="contained"
            type="submit"
            onClick={() => {
              nextCb();
            }}
          >
            Next
          </Button>
        )}
        {!nextCb && (
          <Button
            size="large"
            variant="contained"
            type="submit"
            onClick={() => {
              navigate("/notifications");
            }}
          >
            View Notifications
          </Button>
        )}
      </div>
    </div>
  );
}
