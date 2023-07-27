import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Application from "./pages/Appication";
import { HomePage } from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "./redux/authSlice";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.auth.loading);

  function refreshData() {
    try {
      dispatch(refresh({ dispatch, navigate }));
    } catch (error) {}
  }

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <>
        <center>
          <h1>Đang tải dữ liệu...</h1>
        </center>
      </>
    );
  }

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
