import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getData } from "../redux/productSlice";
import { getData as setCategoryData } from "../redux/categorySlice";
import productService from "./../service/productService";

function ProductManager() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);

  const shopId = useSelector((state) => state.auth.currentUser?.shop.id);

  const categoryData = useSelector((state) => state.category?.data);

  const loading = useSelector((state) => state.auth.loading);

  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.product.data);
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

  useEffect(() => {
    getDataFromDatabase();
    getCategoryDataFromDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error) {
    return (
      <>
        <center>
          <h1>LỖI...</h1>
        </center>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <center>
          <h1>Đang đăng nhập....</h1>
        </center>
      </>
    );
  }

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

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = (item) => {
    setShowEdit(true);
    setProductToEdit(item);
  };

  const getDataFromDatabase = async () => {
    try {
      dispatch(getData({ shopId }));
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryDataFromDatabase = async () => {
    try {
      dispatch(setCategoryData({ shopId }));
    } catch (error) {
      console.log(error);
    }
  };

  const disable = async (id) => {
    try {
      await productService.delete(id);
      getDataFromDatabase();
    } catch (error) {
      console.log(error);
    }
  };

  const restore = async (id) => {
    try {
      await productService.restore(id);
      getDataFromDatabase();
    } catch (error) {
      console.log(error);
    }
  };

  const create = async () => {
    try {
      await productService.create(productToCreate);
      getDataFromDatabase();
    } catch (error) {
      console.log(error);
    }

    setShow(false);
  };

  const edit = async () => {
    try {
      await productService.update(productToEdit.id, productToEdit);
      getDataFromDatabase();
    } catch (error) {
      console.log(error);
    }

    setShowEdit(false);
  };

  return (
    <div className="container-fluid">
      <div className="product-create">
        <Button variant="primary" onClick={handleShow}>
          Create a new Category
        </Button>
      </div>
      <div className="product-li">
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Let create a product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                onChange={handleChangeProductToCreate}
                type="text"
                required
                name="price"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Import price</Form.Label>
              <Form.Control
                onChange={handleChangeProductToCreate}
                type="text"
                required
                name="importPrice"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Available</Form.Label>
              <Form.Control
                onChange={handleChangeProductToCreate}
                type="text"
                required
                name="available"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
                  <option value="0">Nothing here</option>
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
