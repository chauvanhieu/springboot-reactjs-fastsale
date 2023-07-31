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
  importDataFromExcel,
  remove,
  restore as restoreProduct,
  update,
} from "../redux/productSlice";
import * as XLSX from "xlsx";
import Nofitication from "./Nofitication";
import productService from "../service/productService";
import { Link } from "react-router-dom";
function ProductManager() {
  const categoryData = useSelector((state) => state.category?.data);
  const productData = useSelector((state) => state.product.data);
  const shopId = useSelector((state) => state.auth.currentUser?.shop.id);
  const [selectedFile, setSelectedFile] = useState(null);
  const [rowData, setRowData] = useState({});
  // Xử lý khi người dùng chọn tệp
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Xử lý khi người dùng nhấn nút tải lên
  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();

      // Đọc dữ liệu từ tệp Excel khi nó đã được tải lên
      reader.onload = (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        // Chuyển đổi dữ liệu từ sheet thành mảng các đối tượng (mỗi dòng là một object)
        const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        // Xử lý từng dòng của dữ liệu (loại bỏ dòng tiêu đề nếu cần)
        const rowDataObjects = [];

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const [name, price, importPrice, available, barcode] = row;

          // Kiểm tra hàng trống (tất cả các giá trị đều là rỗng)
          if (name || price || importPrice || available || barcode) {
            rowDataObjects.push({
              name,
              price,
              importPrice,
              available,
              barcode,
              image: "",
              status: 1,
              categoryId: categoryData[0].id,
              shopId: shopId,
            });
          } else {
            // Dừng vòng lặp khi gặp hàng trống
            break;
          }
        }

        setRowData([...rowDataObjects]);
      };

      // Đọc dữ liệu của tệp Excel dưới dạng 'binary' (dữ liệu nhị phân)
      reader.readAsBinaryString(selectedFile);
      handleShowToast("Get products success !");
    } else {
      alert("Vui lòng chọn một tệp Excel để tải lên.");
    }
  };
  const importData = async () => {
    try {
      dispatch(importDataFromExcel(rowData));
    } catch (e) {
      console.log(e);
    }
  };
  const [fileImage, setFileImage] = useState({});

  const [page, setPage] = useState(1);

  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  let items = [];

  for (
    let number = 1;
    number <= Math.ceil(productData.length / limit);
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
    image: "",
    importPrice: 0,
    price: 0,
    barcode: "",
    shopId: shopId,
  });

  const [productToEdit, setProductToEdit] = useState({
    id: 0,
    name: "",
    image: "",
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
    if (productService.validate(productToCreate) === false) {
      return;
    }
    try {
      dispatch(
        add({
          product: { ...productToCreate },
          file: fileImage,
        })
      );
      handleShowToast("Created !");
    } catch (error) {
      console.log(error);
    }

    setFileImage({});
    setShow(false);
  };

  const edit = async () => {
    if (productService.validate(productToEdit) === false) {
      return;
    }
    try {
      dispatch(
        update({
          id: productToEdit.id,
          product: productToEdit,
          file: fileImage,
        })
      );
      handleShowToast("Updated !");
    } catch (error) {
      console.log(error);
    }
    setFileImage({});

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

          <Pagination>{items}</Pagination>
          <hr />

          <div className="form-group">
            <a
              href="/fileExcelToImport.xlsx"
              target={"_blank"}
              download
              style={{ color: "red" }}
            >
              Click to Download the sample file here !!!
            </a>
            <input
              className="form-control"
              type="file"
              onChange={handleFileChange}
            />
            <Button variant="success" className="m-1" onClick={handleUpload}>
              Get Products from file excel
            </Button>
            <Button variant="primary" className="m-1" onClick={importData}>
              Upload
            </Button>
          </div>
        </div>
        <div className="product-list col-9">
          <div className="product-create">
            <Button variant="primary" className="m-1" onClick={handleShow}>
              Create a new Product
            </Button>
          </div>
          <div
            className="tabale scroll-container"
            style={{ maxHeight: "80vh" }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
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
                  productData.slice(startIndex, endIndex).map((item) => {
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
                          <td>
                            <img
                              style={{ maxWidth: 150 }}
                              className="img-thumbnail"
                              src={item.image || "/productItem.jpg"}
                              alt=""
                            />
                          </td>
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
              <Form.Label>Photo</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setFileImage(e.target.files[0]);
                }}
                type="file"
                required
                name="img"
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
                <option value={0}>Chose a category?</option>
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
                type="number"
                required
                name="price"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Import price</Form.Label>
              <Form.Control
                onChange={handleChangeProductToCreate}
                type="number"
                required
                name="importPrice"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Available</Form.Label>
              <Form.Control
                onChange={handleChangeProductToCreate}
                type="number"
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
              <Form.Label>Photo</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setFileImage(e.target.files[0]);
                }}
                type="file"
                required
                name="img"
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
                type="number"
                required
                name="price"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Import price</Form.Label>
              <Form.Control
                onChange={handleChangeProductToEdit}
                value={productToEdit.importPrice}
                type="number"
                required
                name="importPrice"
              />
              import productService from './../service/productService';
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Available</Form.Label>
              <Form.Control
                onChange={handleChangeProductToEdit}
                value={productToEdit.available}
                type="number"
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
