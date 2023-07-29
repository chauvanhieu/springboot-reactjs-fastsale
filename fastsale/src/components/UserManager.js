import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import userService from "./../service/userService";
import { setData } from "../redux/userSlice";
function UserManager() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);

  const [searchText, setSearchText] = useState("");

  const shopId = useSelector((state) => state.auth.currentUser?.user.shopId);

  const userData = useSelector((state) => state.user?.data);

  const [userToCreate, setUserToCreate] = useState({
    name: "",
    email: "",
    password: "",
    shopId: shopId,
    role: "",
    status: 1,
  });

  const [userToEdit, setUserToEdit] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    shopId: shopId,
    role: "",
    status: 1,
  });

  const handleChangeUserToCreate = (e) => {
    const { name, value } = e.target;
    setUserToCreate((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeUserToEdit = (e) => {
    const { name, value } = e.target;
    setUserToEdit((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = (item) => {
    setShowEdit(true);
    setUserToEdit(item);
  };
  const dispatch = useDispatch();

  const getDataFromDatabase = async () => {
    try {
      const res = await userService.findAll({ shopId });
      dispatch(setData(res.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFromDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disable = async (id) => {
    try {
      await userService.delete(id);
      getDataFromDatabase();
    } catch (error) {
      console.log(error);
    }
  };

  const restore = async (id) => {
    try {
      await userService.restore(id);
      getDataFromDatabase();
    } catch (error) {
      console.log(error);
    }
  };

  const create = async () => {
    try {
      await userService.create(userToCreate);
      console.log(userToCreate);
      getDataFromDatabase();
    } catch (error) {
      console.log(error);
    }

    setShow(false);
  };

  const edit = async () => {
    try {
      await userService.update(userToEdit.id, userToEdit);
      getDataFromDatabase();
    } catch (error) {
      console.log(error);
    }

    setShowEdit(false);
  };
  return (
    <div className="container-fluid">
      <div className="user-create">
        <InputGroup className="mb-3">
          <InputGroup.Text>Search</InputGroup.Text>
          <Form.Control
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Find something..."
          />
        </InputGroup>
        <Button variant="primary" onClick={handleShow}>
          Create a new User
        </Button>
      </div>
      <div className="user-list">
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
              ? userData.map((item) => {
                  if (
                    item.name
                      .toLowerCase()
                      .indexOf(searchText.toLowerCase()) !== -1 ||
                    item.email
                      .toLowerCase()
                      .indexOf(searchText.toLowerCase()) !== -1
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Let create a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User fullname</Form.Label>
              <Form.Control
                onChange={handleChangeUserToCreate}
                type="text"
                required
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User role</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setUserToCreate({
                    ...userToCreate,
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
                onChange={handleChangeUserToCreate}
                type="email"
                required
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChangeUserToCreate}
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
                value={userToEdit.name}
                onChange={handleChangeUserToEdit}
                type="text"
                required
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User role</Form.Label>
              <Form.Select
                value={userToEdit.role}
                onChange={(e) => {
                  setUserToEdit({
                    ...userToEdit,
                    role: e.target.value,
                  });
                }}
              >
                <option value="">Chose a role for user</option>
                <option value="ROLE_USER">ROLE_USER</option>
                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={userToEdit.email}
                onChange={handleChangeUserToEdit}
                type="email"
                required
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChangeUserToEdit}
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
