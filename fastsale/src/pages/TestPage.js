import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const TestPage = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  return (
    <div>
      <h1>HOME PAGE</h1>
      <Link to="/">Trang chủ</Link>
      <Link to="/test">Test</Link>
      <Link to="/login">Đăng nhập</Link>
      <Link to="/product">Sản phẩm</Link>
      <h4>{currentUser?.accessToken}</h4>
      <h4>{currentUser?.user.name}</h4>
      <h4>{currentUser?.user.id}</h4>
    </div>
  );
};
