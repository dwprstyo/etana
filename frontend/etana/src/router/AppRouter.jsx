import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "../pages/Form";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/edit/:id" element={<Form />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
