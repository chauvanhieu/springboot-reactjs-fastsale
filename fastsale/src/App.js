import { Routes, Route, Navigate } from "react-router-dom";
import Application from "./pages/Appication";
import { HomePage } from "./pages/HomePage";
import { useSelector } from "react-redux";
function App() {
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  if (error) {
    return (
      <>
        <center>
          <h1>LỖI...</h1>
        </center>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <center>
          <h1>Đang đăng nhập....</h1>
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
