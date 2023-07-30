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
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "react-bootstrap/Pagination";
import Nofitication from "./Nofitication";

function CategoryManager() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const [filter, setFilter] = useState({
    searchText: "",
    status: 2,
  });
  const categoryData = useSelector((state) => state.category?.data);

  const [page, setPage] = useState(1);

  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  let items = [];

  for (
    let number = 1;
    number <= Math.ceil(categoryData.length / limit);
    number++
  ) {
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

  const shopId = useSelector((state) => state.auth.currentUser?.shop.id);

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
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
      handleShowToast("Created !");
    } catch (error) {
      handleShowToast("Create failed !");
      console.log(error);
    }

    setShow(false);
  };

  const edit = async () => {
    try {
      dispatch(update({ id: categoryEmp.id, category: categoryEmp }));
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
    <div className="container">
      <Nofitication
        bg="success"
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />
      <div className="row">
        <div className="product-filter col-3">
          <InputGroup className="mb-3">
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
              onChange={handleChangeFilter}
              name="searchText"
              value={filter.searchText}
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
        <div className="category-list mt-2 col-9">
          <div className="category-create">
            <Button variant="primary" onClick={handleShow}>
              Create a new Category
            </Button>
          </div>
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
                categoryData.slice(startIndex, endIndex).map((item) => {
                  if (
                    (filter.searchText === "" ||
                      item.name
                        .toLowerCase()
                        .indexOf(filter.searchText.toLowerCase()) !== -1) &&
                    (filter.status == 2 || filter.status == item.status)
                  )
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
    </div>
  );
}

export default CategoryManager;
