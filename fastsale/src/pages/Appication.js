import { Route, Routes } from "react-router-dom";
import CategoryManager from "../components/CategoryManager";
import OrderManager from "../components/OrderManager";
import ProductManager from "../components/ProductManager";
import SideBar from "../components/SideBar";
import UserManager from "../components/UserManager";
import SaleInterface from "./../components/SaleInteface";
import Report from "./../components/Report";
function Application() {
  return (
    <>
      <SideBar />
      <div style={{ marginTop: "12vh" }}>
        <Routes>
          <Route path="/report" element={<Report />} />
          <Route path="/product" element={<ProductManager />} />
          <Route path="/order" element={<OrderManager />} />
          <Route path="/category" element={<CategoryManager />} />
          <Route path="/user" element={<UserManager />} />
          <Route path="/" element={<SaleInterface />} />
        </Routes>
      </div>
    </>
  );
}

export default Application;
