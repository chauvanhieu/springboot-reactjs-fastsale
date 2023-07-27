import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function Nofitication(props) {
  return (
    <>
      <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
        <Toast bg="primary" animation={true}>
          <Toast.Header closeButton={true}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Nofitication</strong>
          </Toast.Header>
          <Toast.Body>{props.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Nofitication;
