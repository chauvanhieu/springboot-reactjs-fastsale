import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import CategoryManager from "../components/CategoryManager";
import OrderManager from "../components/OrderManager";
import ProductManager from "../components/ProductManager";
import SideBar from "../components/SideBar";
import UserManager from "../components/UserManager";
import loginService from "../service/loginService";

function Application() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const load = async () => {
    await loginService.rememberUserLoad(navigate, dispatch);
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/product" element={<ProductManager />} />
        <Route path="/order" element={<OrderManager />} />
        <Route path="/category" element={<CategoryManager />} />
        <Route path="/user" element={<UserManager />} />
      </Routes>
    </>
  );
}

export default Application;
