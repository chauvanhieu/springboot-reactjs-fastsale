import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import shopService from "./../service/shopService";
import userService from "./../service/userService";
import { useDispatch } from "react-redux";
import { setCurrentShop } from "../redux/shopSlice";
import { loginSuccess } from "../redux/authSlice";
import registerService from "../service/registerService";
function RegisterPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    shopName: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        username: formData.username,
        shopName: formData.shopName,
        email: formData.email,
        password: formData.password,
      };
      const res = await registerService.register(newUser);
      console.log(res);
      const shop = {
        id: res.data.user.shopId,
        name: formData.shopName,
        status: 1,
      };
      dispatch(loginSuccess(res.data));
      dispatch(setCurrentShop(shop));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="img col-6">
          <img
            style={{ maxWidth: "100%", height: "auto" }}
            src="https://img.freepik.com/premium-psd/black-friday-sale-social-media-banner-template_94378-228.jpg"
            alt=""
          />
        </div>
        <div className="container mt-5 col-6" style={{ maxWidth: 500 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your shop name</Form.Label>
              <Form.Control
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                placeholder="Enter your shop name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
              />
            </Form.Group>
            <Button variant="success" type="submit" className="m-1">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
