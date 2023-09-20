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
import ImageBoxes from "./ImageBoxes";
import ImageContainer from "./ImageContainer";
import Newsletter from "../../common/Newsletter";
import ProductList from "./BodyProductList";
import ServicesList from "./ServicesList";
import ServiceListBottom from "../../common/ServiceListBottom";
import Testimonials from "../../common/Testimonials";

const Home = () => {

  // React.useEffect(() => {
  //   //scroll to top of the page automatically, if not on top
  //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //     document.body.scrollTop = 0;
  //     document.documentElement.scrollTop = 0;
  //   }
  // }, []);

  return (
    <>
      <Carousel />
      <ProductList />
      <ImageBoxes />
      <ServicesList />
      <ImageContainer />
      <AboutContainer />
      <Brands />
      <ServiceListBottom />
      <Testimonials />
      <Newsletter />
    </>
  )
};

export default Home;
