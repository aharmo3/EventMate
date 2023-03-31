import React, { useState } from "react";
import TopNav from "./components/TopNav";
import UserListView from "./components/UserListView";
import Home from "./components/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import RegistrationForm from "./components/Registration/RegistrationForm";
import "./App.css";
import ChooseEvents from "./components/ChooseEvents";
import Local from "./helpers/Local";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboardView";
import SearchEvents from "./components/SearchEvents";
import NotificationView from "./components/NotificationView";
import Chat from "./components/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  let [user, setUser] = useState(Local.getUser());

  const navigate = useNavigate();

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    navigate("/");
    // (NavBar will send user to home page)
  }

  return (
    <>
      <TopNav logOutCb={doLogout} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/matched"
            element={
              <ProtectedRoute>
                <UserListView />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<LoginForm />} />

          <Route
            path="/register-two"
            element={
              <ProtectedRoute>
                <RegistrationForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <ChooseEvents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/searchevents"
            element={
              <ProtectedRoute>
                <SearchEvents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
