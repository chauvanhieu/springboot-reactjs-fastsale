import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to="/home">
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ">
              <Nav.Item className="m-3">
                <Link to="/home/login">Login</Link>
              </Nav.Item>
              <Nav.Item className="m-3">
                <Link to="/home/register">Sign in</Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
