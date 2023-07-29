import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "react-bootstrap/Pagination";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  add,
  remove,
  restore as restoreProduct,
  update,
} from "../redux/productSlice";
import Nofitication from "./Nofitication";
function ProductManager() {
  const categoryData = useSelector((state) => state.category?.data);
  const productData = useSelector((state) => state.product.data);
  let active = 2;
  let pages = [];
  for (let number = 1; number <= 5; number++) {
    pages.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

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

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);

  const shopId = useSelector((state) => state.auth.currentUser?.shop.id);

  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    searchText: "",
    categoryId: 0,
    status: 2,
  });

  const [productToCreate, setProductToCreate] = useState({
    name: "",
    categoryId: 0,
    available: 0,
    importPrice: 0,
    price: 0,
    barcode: "",
    shopId: shopId,
  });

  const [productToEdit, setProductToEdit] = useState({
    id: 0,
    name: "",
    categoryId: 0,
    available: 0,
    importPrice: 0,
    price: 0,
    barcode: "",
    shopId: shopId,
  });

  const handleChangeProductToCreate = (e) => {
    const { name, value } = e.target;
    setProductToCreate((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeProductToEdit = (e) => {
    const { name, value } = e.target;
    setProductToEdit((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(filter);
  };

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = (item) => {
    setShowEdit(true);
    setProductToEdit(item);
  };

  const disable = async (id) => {
    try {
      dispatch(remove({ id }));
    } catch (error) {
      console.log(error);
    }
  };

  const restore = async (id) => {
    try {
      dispatch(restoreProduct({ id }));
    } catch (error) {
      console.log(error);
    }
  };

  const create = async () => {
    try {
      dispatch(add({ product: productToCreate }));
      handleShowToast("Created !");
    } catch (error) {
      console.log(error);
    }

    setShow(false);
  };

  const edit = async () => {
    try {
      dispatch(update({ id: productToEdit.id, product: productToEdit }));
      handleShowToast("Updated !");
    } catch (error) {
      console.log(error);
    }

    setShowEdit(false);
  };

  if (error) {
    return (
      <>
        <center>
          <h1>LỖI...</h1>
        </center>
      </>
    );
  }

  return (
    <div className="container-fluid">
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
            <InputGroup.Text>Category</InputGroup.Text>
            <Form.Select
              onChange={handleChangeFilter}
              name="categoryId"
              defaultValue={filter.categoryId}
            >
              <option value="0">All categories</option>
              {categoryData ? (
                categoryData.map((item) => {
                  if (item.status === 1)
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                })
              ) : (
                <></>
              )}
            </Form.Select>
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
          <InputGroup className="mb-3">
            <Pagination>{pages}</Pagination>
          </InputGroup>
        </div>
        <div className="product-list col-9">
          <div className="product-create">
            <Button variant="primary" onClick={handleShow}>
              Create a new Category
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product name</th>
                <th>Category name</th>
                <th>Price</th>
                <th>Import price</th>
                <th>Available</th>
                <th>Barcode</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productData ? (
                productData.map((item) => {
                  if (
                    (filter.searchText === "" ||
                      item.name
                        .toLowerCase()
                        .indexOf(filter.searchText.toLowerCase()) !== -1 ||
                      item.barcode
                        .toLowerCase()
                        .indexOf(filter.searchText.toLowerCase()) !== -1) &&
                    (filter.categoryId == 0 ||
                      item.categoryId == filter.categoryId) &&
                    (filter.status == 2 || filter.status == item.status)
                  )
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.categoryName}</td>
                        <td>{item.price}</td>
                        <td>{item.importPrice}</td>
                        <td>{item.available}</td>
                        <td>{item.barcode}</td>
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
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Let create a product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="create-form"
            onSubmit={(e) => {
              e.preventDefault();
              create();
            }}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                onChange={handleChangeProductToCreate}
                type="text"
                required
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Chose a category</Form.Label>
              <Form.Select
                required
                onChange={(e) => {
                  setProductToCreate({
                    ...productToCreate,
                    categoryId: e.target.value,
                  });
                }}
              >
                {categoryData ? (
                  categoryData.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })
                ) : (
                  <option value="0">Nothing here</option>
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                onChange={handleChangeProductToCreate}
                type="text"
                required
                name="price"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Import price</Form.Label>
              <Form.Control
                onChange={handleChangeProductToCreate}
                type="text"
                required
                name="importPrice"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Available</Form.Label>
              <Form.Control
                onChange={handleChangeProductToCreate}
                type="text"
                required
                name="available"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                onChange={handleChangeProductToCreate}
                type="text"
                name="barcode"
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
          <Modal.Title>Let edit your product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                onChange={handleChangeProductToEdit}
                value={productToEdit.name}
                type="text"
                required
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Chose a category</Form.Label>
              <Form.Select
                defaultValue={productToEdit.categoryId}
                onChange={(e) => {
                  setProductToEdit({
                    ...productToEdit,
                    categoryId: e.target.value,
                  });
                }}
              >
                {categoryData ? (
                  categoryData.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                onChange={handleChangeProductToEdit}
                value={productToEdit.price}
                type="text"
                required
                name="price"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Import price</Form.Label>
              <Form.Control
                onChange={handleChangeProductToEdit}
                value={productToEdit.importPrice}
                type="text"
                required
                name="importPrice"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Available</Form.Label>
              <Form.Control
                onChange={handleChangeProductToEdit}
                value={productToEdit.available}
                type="text"
                required
                name="available"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                onChange={handleChangeProductToEdit}
                value={productToEdit.barcode}
                type="text"
                name="barcode"
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

export default ProductManager;
