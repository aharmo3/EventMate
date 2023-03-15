import React, { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import RegistrationForm from "./components/Registration/RegistrationForm";

import "./App.css";
import ChooseEvents from "./components/ChooseEvents";
import SearchEvents from "./components/SearchEvents";

function App() {
  return (
    <>
      <TopNav />
      
      <main>
        {/* <RegistrationForm /> */}
        {/* <SearchEvents/> */}
        <ChooseEvents/>
      </main>
    </>
  );
}

export default App;
