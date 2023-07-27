function ProductItem(props) {
  const item = props.item;

  return (
    <div
      className="item col-2 text-center"
      style={{
        border: "1px solid blue",
        borderRadius: "15px",
        margin: 37,
        cursor: "pointer",
      }}
    >
      <div className="item-icon mt-1">
        <img src="/productItem.jpg" alt="" style={{ width: 60, height: 60 }} />
      </div>
      <div className="item-info ">
        <h6 style={{ color: "blue" }}>{item.name}</h6>
        <p style={{ fontWeight: 700, color: "red" }}>{item.price}</p>
      </div>
    </div>
  );
}

export default ProductItem;
