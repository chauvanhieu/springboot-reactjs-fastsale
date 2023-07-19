import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/apiRequest";
export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hanleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const hanleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  function login() {
    const user = {
      email: email,
      password: password,
    };
    loginUser(user, dispatch, navigate);
  }

  return (
    <div>
      <div>
        <label htmlFor="">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => hanleChangeEmail(e)}
          placeholder="Nhập email của bạn..."
        />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => hanleChangePassword(e)}
          placeholder="Nhập password của bạn..."
        />
      </div>
      <button onClick={login}>Login</button>
    </div>
  );
};
