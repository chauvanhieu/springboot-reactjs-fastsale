import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  add,
  remove,
  update,
  restore as restoreUser,
} from "../redux/userSlice";
import Nofitication from "./Nofitication";
import { Pagination } from "react-bootstrap";
import userService from "../service/userService";
function UserManager() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);

  const shopId = useSelector((state) => state.auth.currentUser?.user.shopId);

  const userData = useSelector((state) => state.user?.data);

  const [page, setPage] = useState(1);

  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  let items = [];

  for (let number = 1; number <= Math.ceil(userData.length / limit); number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          setPage(number);
        }}
        key={number}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }

  const [userEmp, setUserEmp] = useState({
    id: -1,
    name: "",
    email: "",
    password: "",
    shopId: shopId,
    role: "",
    status: 1,
  });

  const [filter, setFilter] = useState({
    searchText: "",
    status: 2,
  });
  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleChangeUserEmp = (e) => {
    const { name, value } = e.target;
    setUserEmp((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = (item) => {
    setShowEdit(true);
    setUserEmp(item);
  };
  const dispatch = useDispatch();

  const disable = async (id) => {
    try {
      dispatch(remove({ id }));
    } catch (error) {
      console.log(error);
    }
  };

  const restore = async (id) => {
    try {
      dispatch(restoreUser({ id }));
    } catch (error) {
      console.log(error);
    }
  };

  const create = async () => {
    if (userService.validate(userEmp) === false) {
      return;
    }
    try {
      setUserEmp({ ...userEmp, id: 0, status: 1 });
      dispatch(add({ user: userEmp }));
      handleShowToast("Created !");
    } catch (error) {
      handleShowToast("Create failed !");
      console.log(error);
    }

    setShow(false);
  };

  const edit = async () => {
    if (userService.validate(userEmp) === false) {
      return;
    }
    try {
      dispatch(update({ id: Number(userEmp.id), user: userEmp }));
      handleShowToast("Updated !");
    } catch (error) {
      handleShowToast("Update failed !");
      console.log(error);
    }

    setShowEdit(false);
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleShowToast = (message) => {
    setShowToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
    }, 3000);
  };

  return (
    <div className="container-fluid">
      <Nofitication
        bg="success"
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />
      <div className="row">
        <div className="user-filter col-3">
          <InputGroup className="mb-3">
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
              value={filter.searchText}
              name="searchText"
              onChange={handleChangeFilter}
              placeholder="Find something..."
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Status</InputGroup.Text>
            <Form.Select
              onChange={handleChangeFilter}
              name="status"
              defaultValue={filter.status}
            >
              <option value="2">Using/Disable</option>
              <option value="1">Using</option>
              <option value="0">Disable</option>
            </Form.Select>
          </InputGroup>
          <Pagination>{items}</Pagination>
        </div>
        <div className="user-list col-9">
          <Button variant="primary" onClick={handleShow}>
            Create a new User
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User name</th>
                <th>Email</th>
                <th>Role</th>
                <th>status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userData
                ? userData.slice(startIndex, endIndex).map((item) => {
                    if (
                      (filter.searchText === "" ||
                        item.name
                          .toLowerCase()
                          .indexOf(filter.searchText.toLowerCase()) !== -1 ||
                        item.email
                          .toLowerCase()
                          .indexOf(filter.searchText.toLowerCase()) !== -1) &&
                      (filter.status == 2 || filter.status == item.status)
                    )
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.role}</td>
                          <td>{item.status === 1 ? "Using" : "Disabled"}</td>
                          <td>
                            <Button
                              variant="primary"
                              style={{ marginRight: 5 }}
                              onClick={() => {
                                handleShowEdit(item);
                              }}
                            >
                              Edit
                            </Button>
                            {item.status === 1 ? (
                              <Button
                                variant="danger"
                                onClick={() => {
                                  disable(item.id);
                                }}
                              >
                                Disable
                              </Button>
                            ) : (
                              <Button
                                variant="success"
                                onClick={() => {
                                  restore(item.id);
                                }}
                              >
                                Restore
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                  })
                : ""}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Let create a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User fullname</Form.Label>
              <Form.Control
                onChange={handleChangeUserEmp}
                type="text"
                required
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User role</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setUserEmp({
                    ...userEmp,
                    role: e.target.value,
                  });
                }}
              >
                <option value="">Chose a role for user</option>
                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                <option value="ROLE_USER">ROLE_USER</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={handleChangeUserEmp}
                type="email"
                required
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChangeUserEmp}
                type="password"
                required
                name="password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={create}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Let edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User fullname</Form.Label>
              <Form.Control
                value={userEmp.name}
                onChange={handleChangeUserEmp}
                type="text"
                required
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User role</Form.Label>
              <Form.Select
                name="role"
                value={userEmp.role}
                onChange={handleChangeUserEmp}
              >
                <option value="">Chose a role for user</option>
                <option value="ROLE_USER">ROLE_USER</option>
                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={userEmp.email}
                onChange={handleChangeUserEmp}
                type="email"
                required
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChangeUserEmp}
                type="password"
                required
                name="password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={edit}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserManager;
