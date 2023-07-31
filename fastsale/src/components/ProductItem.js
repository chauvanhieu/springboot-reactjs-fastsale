import { add } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

function ProductItem(props) {
  const dispatch = useDispatch();

  const item = props.item;

  const addToCart = () => {
    dispatch(add(item));
  };
  return (
    <div
      onClick={addToCart}
      className="item col-2 text-center"
      style={{
        border: "1px solid blue",
        borderRadius: "25%",
        userSelect: "none",
        margin: 37,
        cursor: "pointer",
      }}
    >
      <div className="item-icon mt-1">
        <img
          src={item.image || "/productItem.jpg"}
          alt=""
          style={{ width: 60, height: 60, objectFit: "contain" }}
        />
      </div>
      <div className="item-info ">
        <h6 style={{ color: "blue" }}>{item.name}</h6>
        <p style={{ fontWeight: 700, color: "red" }}>
          {item.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
