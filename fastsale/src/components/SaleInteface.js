import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ProductItem from "./ProductItem";
import ShopingCart from "./ShopingCart";
import { add } from "../redux/cartSlice";
function SaleInterface() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const productData = useSelector((state) => state?.product?.data);

  const categoryData = useSelector((state) => state?.category?.data);

  const [barcode, setBarcode] = useState("");
  const [filter, setFilter] = useState({
    categoryId: 0,
    searchText: "",
  });

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeBarcode = () => {
    const product = productData.find(
      (item) => item.barcode === barcode && item.status === 1
    );
    if (product && barcode !== "") {
      dispatch(add(product));
      setBarcode("");
    }
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

  if (loading) {
    return (
      <>
        <center>
          <h1>Đang tải dữ liệu....</h1>
        </center>
      </>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="product-control col-7"
          style={{ borderRight: "1px solid blue", height: "85vh" }}
        >
          <div className="filter row">
            <div className="col-3 category-selection">
              <Form.Select name="categoryId" onChange={handleChangeFilter}>
                <option value={0}>All categories</option>
                {categoryData ? (
                  // eslint-disable-next-line array-callback-return
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
            </div>
            <div className="col-4 search-input">
              <InputGroup className="mb-3">
                <InputGroup.Text id="search-input">Search</InputGroup.Text>
                <Form.Control
                  name="searchText"
                  onChange={handleChangeFilter}
                  placeholder="Enter a product name..."
                  aria-describedby="search-input"
                />
              </InputGroup>
            </div>
            <div className="col-4 barcode-input">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChangeBarcode();
                }}
              >
                <InputGroup className="mb-3">
                  <InputGroup.Text id="barcode-input">Barcode</InputGroup.Text>
                  <Form.Control
                    value={barcode}
                    onChange={(e) => {
                      setBarcode(e.target.value);
                    }}
                    placeholder="Scan barcode here..."
                    aria-describedby="barcode-input"
                  />
                </InputGroup>
              </Form>
            </div>
          </div>
          <div
            className="product-items scroll-container"
            style={{ height: "80vh" }}
          >
            <div className="row">
              {productData ? (
                // eslint-disable-next-line array-callback-return
                productData.map((item) => {
                  if (
                    // eslint-disable-next-line eqeqeq
                    (item.categoryId == filter.categoryId ||
                      // eslint-disable-next-line eqeqeq
                      filter.categoryId == 0) &&
                    (filter.searchText === "" ||
                      item.name
                        .toLowerCase()
                        .indexOf(filter.searchText.toLocaleLowerCase()) !==
                        -1) &&
                    item.status === 1
                  )
                    return <ProductItem item={item} key={item.id} />;
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="product-cart col-5">
          <ShopingCart />
        </div>
      </div>
    </div>
  );
}

export default SaleInterface;
