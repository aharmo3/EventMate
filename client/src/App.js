import React, { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import RegistrationForm from "./components/RegistrationForm";

import "./App.css";

function App() {
  return (
    <>
      <TopNav />
      <RegistrationForm />
    </>
  );
}

export default App;
