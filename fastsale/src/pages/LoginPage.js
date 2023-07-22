import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import loginService from "../service/loginService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  async function login() {
    try {
      const res = await loginService.login(email, password);
      dispatch(loginSuccess(res.data));
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="img col-6">
          <img
            style={{ maxWidth: "100%", height: "auto" }}
            src="https://i.pinimg.com/originals/93/b6/ed/93b6eda7d64c9107d4ec7eefb178baf9.jpg"
            alt=""
          />
        </div>
        <div className="container mt-5 col-6" style={{ maxWidth: 500 }}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => {
                  handleChangeEmail(e);
                }}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => {
                  handleChangePassword(e);
                }}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <center>
              <Button
                onClick={login}
                variant="primary"
                type="button"
                className="m-1"
              >
                Login
              </Button>
              <Button variant="success" type="button" className="m-1">
                Register
              </Button>
            </center>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
