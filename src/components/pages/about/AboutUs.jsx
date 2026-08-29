import React, { useState, useEffect } from "react";

import ServiceListBottom from "../../common/ServiceListBottom";
import AboutCEO from "./AboutCEO";
import AboutPageTop from "./AboutPageTop";
import MissionComponent from "./MissionComponent";
import Newsletter from "../../common/Newsletter";

import "./AboutUs.css";
import {
  SkeletonStyles,
  AboutPageSkeleton,
  NewsletterSkeleton,
} from "../../common/PageSkeletons";

/* ── Full about page skeleton ── */
const AboutLoadingSkeleton = () => (
  <>
    <SkeletonStyles />
    <AboutPageSkeleton />
    {/* Service list bottom skeleton */}
    <div style={{ padding: '60px 5%', background: '#fff' }}>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ flex: '0 0 calc(25% - 18px)', background: '#f8f4f0', borderRadius: '16px', padding: '28px 20px', minWidth: '160px' }}>
            <div className="es-sk" style={{ width: '44px', height: '44px', borderRadius: '12px', marginBottom: '14px' }} />
            <div className="es-sk" style={{ height: '18px', width: '80%', marginBottom: '8px' }} />
            <div className="es-sk" style={{ height: '13px', width: '100%', marginBottom: '6px' }} />
            <div className="es-sk" style={{ height: '13px', width: '75%' }} />
          </div>
        ))}
      </div>
    </div>
    <NewsletterSkeleton />
  </>
);

const AboutUs = () => {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPageLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  if (!pageLoaded) {
    return <AboutLoadingSkeleton />;
  }

  return (
    <>
      <SkeletonStyles />
      <div className="ourcomponent">
        <AboutPageTop />
        <MissionComponent />
        <AboutCEO />
        <ServiceListBottom />
        <Newsletter />
      </div>
    </>
  );
};

export default AboutUs;
