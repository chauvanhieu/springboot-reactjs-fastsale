import { remove, update, clear } from "../redux/cartSlice";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import orderService from "./../service/orderService";
import Nofitication from "./Nofitication";

function ShopingCart() {
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

  const cartData = useSelector((state) => state.cart.data);
  const user = useSelector((state) => state.auth.currentUser?.user);
  const [amount, setAmount] = useState(0);
  const [totalElement, setTotalElement] = useState(0);
  const dispatch = useDispatch();

  const removeItem = (productId) => {
    dispatch(remove(productId));
  };

  const updateCount = (productId, newCount) => {
    dispatch(update({ productId, newCount }));
  };

  const clearCart = () => {
    dispatch(clear());
  };

  const totalAmount = () => {
    let total = 0;
    if (cartData) {
      cartData.forEach((item) => {
        total += item.count * item.price;
      });
    }
    return total;
  };

  const checkout = async () => {
    if (!cartData || cartData.length === 0) {
      alert("No element in your shoping cart");
      return;
    }
    try {
      const order = {
        shopId: user.shopId,
        userId: user.id,
        price: amount,
        createdAt: new Date(),
        orderType: "EXPORT",
        status: 1,
        orderDetails: cartData,
      };

      const res = await orderService.create(order);
      if (res.status === 201) {
        handleShowToast("Checkout success !");
        dispatch(clear());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let am = 0;
    let el = 0;
    if (cartData) {
      cartData.forEach((item) => {
        am = am + item.count * item.price;
        el = el + item.count;
      });
    }
    setAmount(am);
    setTotalElement(el);
  }, [cartData]);

  return (
    <div className="table-container">
      <div className="table scroll-container" style={{ height: 500 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product name</th>
              <th>Price</th>
              <th>Total</th>
              <th>
                <center>
                  <Button variant="info" onClick={clearCart}>
                    Clear
                  </Button>
                </center>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartData ? (
              cartData.map((item) => {
                return (
                  <tr key={item.productId}>
                    <td>{item.name}</td>
                    <td>{item.price.toLocaleString()}</td>
                    <td>
                      <Form.Control
                        type="number"
                        value={item.count}
                        onChange={(e) => {
                          updateCount(item.productId, e.target.value);
                        }}
                        style={{ maxWidth: 80 }}
                      />
                    </td>
                    <td>
                      <center>
                        <Button
                          variant="danger"
                          onClick={() => {
                            removeItem(item.productId);
                          }}
                        >
                          Remove
                        </Button>
                      </center>
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
      <div className="checkout">
        <h3>Amount: {amount.toLocaleString()}</h3>
        <h3>Total element: {totalElement}</h3>
        <Button variant="success" onClick={checkout}>
          CheckOut
        </Button>
      </div>
      <Nofitication
        bg="success"
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />
    </div>
  );
}

export default ShopingCart;
