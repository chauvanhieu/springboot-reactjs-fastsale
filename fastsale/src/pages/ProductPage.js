import React from "react";
import { useSelector } from "react-redux";

export const ProductPage = () => {
  const listProduct = useSelector((state) => state.product.products);

  console.log(listProduct);

  return (
    <div>
      <h1>product Page</h1>
    </div>
  );
};
