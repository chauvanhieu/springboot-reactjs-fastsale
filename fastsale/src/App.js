import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Application from "./pages/Appication";
import { HomePage } from "./pages/HomePage";
import { useEffect } from "react";
import loginService from "./service/loginService";
import { useDispatch } from "react-redux";

function App() {
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
      <Routes>
        <Route path="/app/*" element={<Application />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default App;
