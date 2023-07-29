import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Nofitication = (props) => {
  return (
    <ToastContainer position="bottom-end" style={{ margin: 20 }}>
      <Toast
        bg={props.bg}
        show={props.show}
        onClose={props.onClose}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Nofitication</strong>
        </Toast.Header>
        <Toast.Body>
          <h3>{props.message}</h3>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Nofitication;
