/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import categoryService from "./../service/categoryService";
import { getData } from "../redux/categorySlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

function CategoryManager() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryNameToEdit, setCategoryNameToEdit] = useState("");
  const [idCategoryToEdit, setIdCategoryToEdit] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    setShowEdit(true);
    setIdCategoryToEdit(id);
  };

  const categoryData = useSelector((state) => state.category?.data);

  const shopId = useSelector((state) => state.auth.currentUser?.user.shopId);

  const dispatch = useDispatch();

  const getDataFromDatabase = async () => {
    try {
      dispatch(getData({ shopId }));
    } catch (error) {
      console.log(error);
    }
  };

  const disable = async (id) => {
    try {
      await categoryService.delete(id);
      getDataFromDatabase();
    } catch (error) {
      console.log(error);
    }
  };

  const restore = async (id) => {
    try {
      await categoryService.restore(id);
      getDataFromDatabase();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCategoryName = (e) => {
    setNewCategoryName(e.target.value);
  };

  const create = async () => {
    try {
      const category = {
        name: newCategoryName,
        shopId: shopId,
        status: 1,
      };

      await categoryService.create(category);
      getDataFromDatabase();
    } catch (error) {
      console.log(error);
    }

    setShow(false);
  };

  const edit = async () => {
    try {
      const category = {
        id: idCategoryToEdit,
        name: categoryNameToEdit,
        shopId: shopId,
        status: 1,
      };
      if (category.name) {
        await categoryService.update(idCategoryToEdit, category);
        getDataFromDatabase();
      }
    } catch (error) {
      console.log(error);
    }

    setShowEdit(false);
  };

  useEffect(() => {
    getDataFromDatabase();
  }, []);

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
                          handleShowEdit(item.id);
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
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category name</Form.Label>
              <Form.Control
                value={newCategoryName}
                onChange={handleChangeCategoryName}
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
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setCategoryNameToEdit(e.target.value);
                }}
                type="text"
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
