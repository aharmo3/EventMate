import React, { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import RegistrationForm from "./components/Registration/RegistrationForm";

import "./App.css";

function App() {
  return (
    <>
      <TopNav />
      <main>
        <RegistrationForm />
      </main>
    </>
  );
}

export default App;
