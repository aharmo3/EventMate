import React, { useState } from "react";
import TopNav from "./components/TopNav";
import UserListView from "./components/UserListView";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import RegistrationForm from "./components/Registration/RegistrationForm";
import "./App.css";
import ChooseEvents from "./components/ChooseEvents";
import FormInput from "./components/FormInput";
import Local from "./helpers/Local";
import ClientAPI from "./helpers/ClientAPI";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboardView";
import SearchEvents from "./components/SearchEvents";

function App() {
  let [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [registrationErrorMsg, setRegistrationErrorMsg] = useState("");
  const [userid, setUserid] = useState(false);

  const navigate = useNavigate();

  async function doRegister(username, email, password) {
    let myresponse = await ClientAPI.registerUser(username, email, password);

    if (myresponse.ok) {
      console.log("doreg data----", myresponse.data);
      Local.updateUserInfo(myresponse.data);
      setRegistrationErrorMsg("");
      if (myresponse.data.userId !== null) {
        navigate("/register-two");
      }
    } else {
      console.log(myresponse);
      setRegistrationErrorMsg(`Registration Failed`);
    }
  }

  async function doLogin(username, password) {
    let myresponse = await ClientAPI.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      // navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    // (NavBar will send user to home page)
  }

  return (
    <>
      <TopNav user={user} logOutCb={doLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<LoginForm doRegister={doRegister} />}
          />
          <Route path="/matched" element={<UserListView />} />
          <Route
            path="/register"
            element={<LoginForm doRegister={doRegister} />}
          />
          <Route path="/register-two" element={<RegistrationForm />} />
          <Route path="/events" element={<ChooseEvents />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/searchevents" element={<SearchEvents />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
