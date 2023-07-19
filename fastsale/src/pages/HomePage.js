import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleLogout } from "../redux/apiRequest";
export const HomePage = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const logout = () => {
    handleLogout(dispatch);
  };
  return (
    <div>
      <h1>HOME PAGE</h1>
      <Link to="/">Trang chủ</Link>
      <Link to="/test">Test</Link>
      <Link to="/login">Đăng nhập</Link>
      <Link to="/product">Sản phẩm</Link>
      <button onClick={logout}>Logout</button>
      <h4>{currentUser?.accessToken}</h4>
      <h4>{currentUser?.user.name}</h4>
      <h4>{currentUser?.user.id}</h4>
    </div>
  );
};
