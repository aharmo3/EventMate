import React, { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import RegistrationForm from "./components/Registration/RegistrationForm";

import "./App.css";
import ChooseEvents from "./components/ChooseEvents";

function App() {
  return (
    <>
      <TopNav />
      
      <main>
        <RegistrationForm />
        <ChooseEvents/>
      </main>
    </>
  );
}

export default App;
