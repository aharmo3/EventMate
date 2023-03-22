import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffe121",
    },
    secondary: {
      main: "#36414d",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "outlined" &&
            ownerState.color === "primary" && {
              borderColor: "#36414d",
              color: "#36414d",
            }),
          // Button styles for text link
          ...(ownerState.color === "primary" &&
            ownerState.variant === "text" && {
              color: "#3498db",
            }),
        }),
      },
    },
  },
  typography: {
    fontSize: 15,
    fontFamily: "Work Sans",
    logo: {
      fontFamily: "Days One",
      fontSize: 29,
      color: "#fff",
    },
    h1: {
      fontSize: 47,
      fontWeight: 600,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
