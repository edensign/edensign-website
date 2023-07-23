/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import AboutContainer from "./AboutContainer";
import Carousel from "./BodyCarousel";
import ProductList from "./BodyProductList";
import ImageBoxes from "./ImageBoxes";
import ImageContainer from "./ImageContainer";
import ServicesList from "./ServicesList";
import Testimonial from "./Testimonial";
import Newsletter from "../../common/Newsletter";

const Home = () => {

  return (
    <>
      <Carousel />
      <ProductList />
      <ImageBoxes />
      <ServicesList />
      <ImageContainer />
      <AboutContainer />
      <Newsletter />
      {/* <Testimonial /> */}

    </>
  )
};

export default Home;
