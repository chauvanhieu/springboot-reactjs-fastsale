/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  add,
  remove,
  restore as restoreCategory,
  update,
} from "../redux/categorySlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

function CategoryManager() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const categoryData = useSelector((state) => state.category?.data);
  const shopId = useSelector((state) => state.auth.currentUser?.shop.id);

  const handleShow = () => setShow(true);
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const [categoryEmp, setCategoryEmp] = useState({
    id: 0,
    name: "",
    status: 1,
    shopId,
  });
  const handleShowEdit = (item) => {
    setShowEdit(true);
    setCategoryEmp(item);
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
      dispatch(restoreCategory({ id }));
    } catch (error) {
      console.log(error);
    }
  };

  const create = async () => {
    try {
      setCategoryEmp({ ...categoryEmp, id: 0, status: 1 });
      dispatch(add({ category: categoryEmp }));
    } catch (error) {
      console.log(error);
    }

    setShow(false);
  };

  const edit = async () => {
    try {
      dispatch(update({ id: categoryEmp.id, category: categoryEmp }));
    } catch (error) {
      console.log(error);
    }

    setShowEdit(false);
  };

  return (
    <div className="container">
      <h1>Category Manager</h1>
      <div className="category-create">
        <Button variant="primary" onClick={handleShow}>
          Create a new Category
        </Button>
      </div>
      <div className="category-list mt-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Category name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categoryData ? (
              categoryData?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
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
            ) : (
              <tr></tr>
            )}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Let create a category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              create();
            }}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category name</Form.Label>
              <Form.Control
                value={categoryEmp.name}
                onChange={(e) => {
                  setCategoryEmp({ ...categoryEmp, name: e.target.value });
                }}
                type="text"
                placeholder=""
                required
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
          <Modal.Title>Let create a category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              edit();
            }}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setCategoryEmp({ ...categoryEmp, name: e.target.value });
                }}
                type="text"
                value={categoryEmp.name}
                placeholder=""
                autoFocus
                required
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

export default CategoryManager;
