/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React, { Suspense } from "react";
import { useInView } from "react-intersection-observer";

import "./style.css";
import AboutContainer from "./AboutContainer";
import Brands from "../../common/Brands";
import Carousel from "../../common/Carousel";
import ImageBoxes from "./ImageBoxes";
import ImageContainer from "./ImageContainer";
import Newsletter from "../../common/Newsletter";
import ProductList from "./BodyProductList";
import ServicesList from "./ServicesList";
import SponsoredProductBanner from "./SponsoredProductBanner";
import StatsBar from "./StatsBar";
import Testimonials from "../../common/Testimonials";
import ActiveOffersSection from "../ActiveOffersSection";

const LazySection = ({ children, height = "400px" }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  return (
    <div ref={ref} style={{ minHeight: inView ? 'auto' : height }}>
      {inView ? children : null}
    </div>
  );
};

const Home = () => {
  return (
    <>
      <Carousel />
      <StatsBar />
      <LazySection height="300px">
        <SponsoredProductBanner />
      </LazySection>
      <LazySection height="400px">
        <ServicesList />
      </LazySection>
      <LazySection height="350px">
        <ActiveOffersSection title="Exclusive Digital Offer Cards" />
      </LazySection>
      <LazySection height="600px">
        <ProductList />
      </LazySection>
      <LazySection height="500px">
        <ImageBoxes />
      </LazySection>
      <LazySection height="400px">
        <ImageContainer />
      </LazySection>
      <LazySection height="500px">
        <AboutContainer />
      </LazySection>
      <LazySection height="200px">
        <Brands />
      </LazySection>
      <LazySection height="400px">
        <Testimonials />
      </LazySection>
      <LazySection height="300px">
        <Newsletter />
      </LazySection>
    </>
  );
};

export default Home;
