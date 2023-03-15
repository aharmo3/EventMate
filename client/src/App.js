import React, { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import RegistrationForm from "./components/RegistrationForm";
import UserListView from "./components/UserListView";

import "./App.css";
//<RegistrationForm />

function App() {
  return (
    <>
      <TopNav />
      <UserListView />
    </>
  );
}

export default App;
