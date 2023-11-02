import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, matchRoutes } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import Projects from './Projects';
import CreateAccount from './CreateAccountPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects/:userid/:name" element={<Projects />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route exact path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;