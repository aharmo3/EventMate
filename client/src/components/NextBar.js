import React from "react";
import Button from "@mui/material/Button";
import LinearStepper from "./LinearStepper";
export default function NextBar({ activeStep, prevCb, nextCb }) {
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
      </div>
    </div>
  );
}
