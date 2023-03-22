import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import video from "../smiling.mp4"; // Tell webpack this JS file uses this image

import Local from "../helpers/Local";
import { Typography } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = Local.getToken() !== "";

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src={video} type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video>
      <Box
        sx={{
          width: "80%",
          background: "rgba(255,255,255, 0.8)",
          minHeight: "80vh",
          mx: "auto",
          p: 10,
          mt: "30px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            gridColumn: "1",
            gridRow: "1",
          }}
        >
          <Typography variant="h1">
            Find a friend to go to an event together.
          </Typography>
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Go to concerts, theatre plays, art exhibitions and outdoor movies.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            mt: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              style={{
                padding: "20px 25px",
                fontSize: "21px",
                fontWeight: "bold",
              }}
            >
              Find a Mate
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
