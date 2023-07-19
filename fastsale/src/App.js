import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { TestPage } from "./pages/TestPage";
import { ProductPage } from "./pages/ProductPage";
import { useEffect } from "react";

function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route exact path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
