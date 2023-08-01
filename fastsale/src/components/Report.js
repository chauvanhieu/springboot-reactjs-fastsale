import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";

function Report() {
  const productData = useSelector((state) => state.product.data);
  const orderData = useSelector((state) => state.order.data);

  const [top10Products, setTop10Products] = useState([]);

  const getTop10Products = () => {
    const productSales = {};
    orderData.forEach((order) => {
      order.orderDetails.forEach((orderDetail) => {
        const productId = orderDetail.productId;
        const count = orderDetail.count;
        if (productId in productSales) {
          productSales[productId] += count;
        } else {
          productSales[productId] = count;
        }
      });
    });

    const sortedProductSales = Object.entries(productSales).sort(
      (a, b) => b[1] - a[1]
    );
    const top10ProductIds = sortedProductSales
      .slice(0, 10)
      .map((entry) => parseInt(entry[0]));
    return top10ProductIds.map((productId) => {
      const product = productData.find((product) => product.id === productId);
      const totalSold = productSales[productId];
      return { ...product, totalSold };
    });
  };

  const setData = () => {
    if (productData && orderData) {
      const data = getTop10Products();
      setTop10Products([...data]);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  if (!top10Products) {
    return (
      <div className="container">
        <h1>Không có dữ liệu thống kê</h1>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>Top 10 sản phẩm bán chạy nhất</h1>

      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Photo</th>
            <th>Product name</th>
            <th>Category name</th>
            <th>Price</th>
            <th>Import price</th>
            <th>Total sold</th>
          </tr>
        </thead>
        <tbody>
          {top10Products ? (
            top10Products.map((item) => {
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
                  <td>{item.totalSold}</td>
                </tr>
              );
            })
          ) : (
            <tr></tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Report;
