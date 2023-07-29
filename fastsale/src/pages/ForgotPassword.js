import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/authSlice";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async () => {
    try {
      dispatch(resetPassword(email));
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>
        <b>Forgot Password</b>
      </h1>
      <InputGroup className="mb-3" style={{ maxWidth: 400, margin: "0 auto" }}>
        <InputGroup.Text>Enter your email</InputGroup.Text>
        <Form.Control
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </InputGroup>
      <center>
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit
        </button>
      </center>
    </div>
  );
}

export default ForgotPassword;
