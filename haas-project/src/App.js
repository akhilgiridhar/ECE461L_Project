import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  matchRoutes,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./LoginPage";
import Projects from "./Projects";
import CreateAccount from "./CreateAccountPage";
import { AuthProvider } from "./auth";
import { RequireAuth } from "./RequireAuth";



const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/projects/:userid/:name" element={<RequireAuth><Projects /></RequireAuth>} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route exact path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
