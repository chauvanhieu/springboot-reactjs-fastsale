import React from "react";
import Header from "../components/Header";
import Carousels from "../components/Carousels";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ForgotPassword from "./ForgotPassword";

export const HomePage = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Carousels />} />
      </Routes>
    </div>
  );
};
