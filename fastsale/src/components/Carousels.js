import React from "react";
import Carousel from "react-bootstrap/Carousel";

function Carousels() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            style={{ width: "100%" }}
            alt=""
            src="https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?w=2000"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "100%" }}
            alt=""
            src="https://img.freepik.com/free-psd/horizontal-banner-template-big-sale-with-woman-shopping-bags_23-2148786755.jpg?w=2000"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "100%" }}
            alt=""
            src="https://img.freepik.com/free-psd/online-shopping-concept-banner-template_23-2148559463.jpg?w=2000"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carousels;
