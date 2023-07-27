import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/authSlice";
function SideBar() {
  const dispatch = useDispatch();

  const userRole = useSelector((state) => state.auth.currentUser?.user.role);
  const closeSideBar = () => {
    const buttonElement = document.querySelector(".btn-close");
    buttonElement.click();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    dispatch(logout());
    try {
      window.location("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar
        expand={false}
        className="bg-body-tertiary mb-3"
        style={{
          backgroundColor: "black !important",
          borderBottom: "1px solid #a7a2a2",
        }}
      >
        <Container fluid>
          <Navbar.Brand>
            <Link to="/app">
              <h1
                style={{
                  color: "transparent",
                  background: "linear-gradient(45deg, #ff0000, #00ff00)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  fontWeight: "bold",
                }}
              >
                FAST SALE
              </h1>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                FAST SALE
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Item onClick={closeSideBar} className="m-3">
                  <Link to="/app">Trang chủ</Link>
                </Nav.Item>
                <Nav.Item onClick={closeSideBar} className="m-3">
                  <Link to="/app/order">Đơn hàng</Link>
                </Nav.Item>
                <Nav.Item onClick={closeSideBar} className="m-3">
                  <Link to="/app/product">Sản phẩm</Link>
                </Nav.Item>
                {userRole === "ROLE_ADMIN" ? (
                  <Nav.Item onClick={closeSideBar} className="m-3">
                    <Link to="/app/user">Nhân viên</Link>
                  </Nav.Item>
                ) : (
                  <></>
                )}

                <Nav.Item onClick={closeSideBar} className="m-3">
                  <Link to="/app/category">Danh mục sản phẩm</Link>
                </Nav.Item>
                <Nav.Item className="m-3">
                  <Link to="/home" onClick={handleLogout}>
                    Đăng xuất
                  </Link>
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default SideBar;
