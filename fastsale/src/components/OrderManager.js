import { Form, InputGroup, Pagination, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
function OrderManager() {
  const orderData = useSelector((state) => state.order.data);

  const [page, setPage] = useState(1);

  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  let items = [];

  for (
    let number = 1;
    number <= Math.ceil(orderData.length / limit);
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

  const [filter, setFilter] = useState({
    searchText: "",
    minPrice: 0,
    maxPrice: 99999999,
  });
  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    console.log(filter);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="order-filter col-3">
          <InputGroup className="mb-3">
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
              onChange={handleChangeFilter}
              name="searchText"
              value={filter.searchText}
              placeholder="Find something..."
            />
          </InputGroup>

          <div className="form-group">
            <label>
              Min price : {Number(filter.minPrice).toLocaleString()}
            </label>
            <input
              type="range"
              className="form-range"
              value={filter.minPrice}
              onChange={handleChangeFilter}
              name="minPrice"
              min="0"
              max="99999999"
              step="1"
            />
          </div>
          <div className="form-group">
            <label>
              Max price : {Number(filter.maxPrice).toLocaleString()}
            </label>
            <input
              type="range"
              className="form-range"
              value={filter.maxPrice}
              onChange={handleChangeFilter}
              name="maxPrice"
              min="0"
              max="99999999"
              step="1"
            />
          </div>
          <Pagination>{items}</Pagination>
        </div>
        <div className="order-list col-9">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Created by</th>
                <th>Created at</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderData ? (
                orderData.slice(startIndex, endIndex).map((item) => {
                  if (
                    (filter.searchText === "" ||
                      item.username
                        .toLowerCase()
                        .indexOf(filter.searchText.toLowerCase()) !== -1) &&
                    item.price > Number(filter.minPrice) &&
                    item.price < Number(filter.maxPrice)
                  )
                    return (
                      <>
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.username}</td>
                          <td>{item.createdAt}</td>
                          <td>{item.price.toLocaleString()}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapseExample${item.id}`}
                              aria-expanded="false"
                              aria-controls="collapseExample"
                            >
                              View
                            </button>
                          </td>
                        </tr>

                        <tr
                          className="collapse"
                          id={`collapseExample${item.id}`}
                        >
                          <td colSpan={5}>
                            <div className="card card-body">
                              <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Product ID</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total money</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.orderDetails ? (
                                    item.orderDetails.map((detail) => {
                                      return (
                                        <tr key={detail.id}>
                                          <td>{detail.productId}</td>
                                          <td>{detail.productName}</td>
                                          <td>{detail.count}</td>
                                          <td>
                                            {detail.price.toLocaleString()}
                                          </td>
                                          <td>
                                            {(
                                              detail.price * detail.count
                                            ).toLocaleString()}
                                          </td>
                                        </tr>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                })
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default OrderManager;
