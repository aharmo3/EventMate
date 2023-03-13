import React, { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import RegistrationForm from "./components/RegistrationForm";

import "./App.css";
import ChooseEvents from "./components/ChooseEvents";

function App() {
  return (
    <>
      <TopNav />
      <RegistrationForm />
      <ChooseEvents/>
    </>
  );
}

export default App;
