import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProductItem from "./ProductItem";

function SaleInterface() {
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

    console.log(e.value);
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
        <div className="product-control col-7">
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
                  alert("ád");
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
          <div className="product-items">
            <div className="row">
              {productData ? (
                // eslint-disable-next-line array-callback-return
                productData.map((item) => {
                  if (
                    (item.categoryId == filter.categoryId ||
                      filter.categoryId == 0) &&
                    (filter.searchText === "" ||
                      item.name
                        .toLowerCase()
                        .indexOf(filter.searchText.toLocaleLowerCase()) !== -1)
                  )
                    return <ProductItem item={item} key={item.id} />;
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="product-cart col-5">giỏ hàng</div>
      </div>
    </div>
  );
}

export default SaleInterface;
