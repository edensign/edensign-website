/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from "react";

import "./style.css";
import AboutContainer from "./AboutContainer";
import Brands from "../../common/Brands";
import Carousel from "../../common/Carousel";
import ProductList from "./BodyProductList";
import ImageBoxes from "./ImageBoxes";
import ImageContainer from "./ImageContainer";
import ServicesList from "./ServicesList";
import Newsletter from "../../common/Newsletter";
import Testimonial from "./Testimonial";

const Home = ({ background }) => {

  React.useEffect(() => {
    document.getElementById("main-div").style.background = background;
  }, []);

  return (
    <>
      <Carousel />
      <ProductList />
      <ImageBoxes />
      <ServicesList />
      <ImageContainer />
      <AboutContainer />
      <Newsletter />
      <Brands />
      {/* <Testimonial /> */}

    </>
  )
};

export default Home;
