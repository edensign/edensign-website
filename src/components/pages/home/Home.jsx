/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React, { Suspense, useState, useEffect } from "react";
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
import HomeReviewSection from "./HomeReviewSection";

import {
  SkeletonStyles,
  StatsBarSkeleton,
  ServiceCardSkeleton,
  SponsoredBannerSkeleton,
  ProductCarouselSkeleton,
  ImageGridSkeleton,
  AboutBlockSkeleton,
  BrandsSkeleton,
  TestimonialsSkeleton,
  NewsletterSkeleton,
  SectionHeaderSkeleton,
} from "../../common/PageSkeletons";

/* ── Lazy section that shows a skeleton until the element is in view ── */
const LazySection = ({ children, skeleton, height = "400px" }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "150px 0px",
  });

  return (
    <div ref={ref} style={{ minHeight: inView ? "auto" : height }}>
      {inView ? children : (skeleton || null)}
    </div>
  );
};

/* ── Active offers skeleton ── */
const ActiveOffersSkeleton = () => (
  <div style={{ padding: "60px 5%", background: "#fff" }}>
    <SectionHeaderSkeleton centered />
    <div style={{ display: "flex", gap: "24px", overflowX: "auto", paddingBottom: "8px" }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ flexShrink: 0, width: "280px" }}>
          <div className="es-sk" style={{ height: "160px", borderRadius: "16px", marginBottom: "12px" }} />
          <div className="es-sk" style={{ height: "16px", width: "70%", marginBottom: "8px" }} />
          <div className="es-sk" style={{ height: "12px", width: "50%" }} />
        </div>
      ))}
    </div>
  </div>
);

/* ── Image container skeleton ── */
const ImageContainerSkeleton = () => (
  <div style={{ padding: "60px 5%", background: "#f8f4f0" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "center" }}>
      <div className="es-sk" style={{ height: "400px", borderRadius: "16px" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="es-sk" style={{ height: "12px", width: "80px" }} />
        <div className="es-sk" style={{ height: "40px", width: "70%" }} />
        <div className="es-sk" style={{ height: "13px", width: "100%" }} />
        <div className="es-sk" style={{ height: "13px", width: "85%" }} />
        <div className="es-sk" style={{ height: "44px", width: "140px", borderRadius: "30px", marginTop: "8px" }} />
      </div>
    </div>
  </div>
);

const Home = () => {
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    // Brief mount delay to allow first paint before showing real content
    const t = requestAnimationFrame(() => setPageReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <>
      <SkeletonStyles />
      <Carousel />

      <LazySection height="90px" skeleton={<StatsBarSkeleton />}>
        <StatsBar />
      </LazySection>

      <LazySection height="480px" skeleton={<SponsoredBannerSkeleton />}>
        <SponsoredProductBanner />
      </LazySection>

      <LazySection height="380px" skeleton={
        <div style={{ padding: "60px 5%", background: "#f8fafc" }}>
          <SectionHeaderSkeleton centered />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[1, 2, 3].map((i) => <ServiceCardSkeleton key={i} />)}
          </div>
        </div>
      }>
        <ServicesList />
      </LazySection>

      <LazySection height="340px" skeleton={<ActiveOffersSkeleton />}>
        <ActiveOffersSection title="Exclusive Digital Offer Cards" />
      </LazySection>

      <LazySection height="560px" skeleton={<ProductCarouselSkeleton />}>
        <ProductList />
      </LazySection>

      <LazySection height="460px" skeleton={<ImageGridSkeleton rows={2} cols={3} height="200px" padding="60px 5%" bg="#fff" />}>
        <ImageBoxes />
      </LazySection>

      <LazySection height="400px" skeleton={<ImageContainerSkeleton />}>
        <ImageContainer />
      </LazySection>

      <LazySection height="480px" skeleton={<AboutBlockSkeleton />}>
        <AboutContainer />
      </LazySection>

      <LazySection height="120px" skeleton={<BrandsSkeleton />}>
        <Brands />
      </LazySection>

      <LazySection height="400px" skeleton={<TestimonialsSkeleton />}>
        <Testimonials />
      </LazySection>

      <LazySection height="500px" skeleton={<div className="es-sk" style={{ height: "500px", borderRadius: "24px" }} />}>
        <HomeReviewSection />
      </LazySection>

      <LazySection height="280px" skeleton={<NewsletterSkeleton />}>
        <Newsletter />
      </LazySection>
    </>
  );
};

export default Home;
