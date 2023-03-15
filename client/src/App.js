import React from "react";
import TopNav from "./components/TopNav";
import UserListView from "./components/UserListView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RegistrationForm from "./components/Registration/RegistrationForm";

import "./App.css";
import ChooseEvents from "./components/ChooseEvents";

//<RegistrationForm />
//<ChooseEvents />
//<UserListView />
function App() {
  return (
    <>
      <TopNav />
      <main>
      <Routes>
      <Route path="/matched" element={<UserListView />} />
      <Route path="/register" element={<RegistrationForm />}/>
      <Route path="/events" element={<ChooseEvents />}/>
      </Routes>
      </main>
     
    </>
  );
}

export default App;
