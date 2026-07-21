/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { ThemeProvider, useTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { ColorModeContext, useMode, tokens } from "./theme";
import BRAND, { getMetaTitle } from "./brand";
import Topbar from "./components/common/Topbar";
import Loader from "./components/common/Loader";
import Footer from './components/common/Footer';
import { ToastProvider } from "./components/common/Toast";
import {
  SkeletonStyles,
  HomePageSkeleton,
  AboutPageSkeleton,
  ContactPageSkeleton,
  SalonGridSkeleton,
  SalonDetailHeroSkeleton,
  ProductPageSkeleton,
  ProductDetailSkeleton,
  JobSeekerPageSkeleton,
  JobSeekerDetailSkeleton,
} from "./components/common/PageSkeletons";

const PageSuspenseFallback = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path === "/" || path === "") {
    return <HomePageSkeleton />;
  }
  if (path === "/about") {
    return <AboutPageSkeleton />;
  }
  if (path === "/contact") {
    return <ContactPageSkeleton />;
  }
  if (path.startsWith("/salon/detail")) {
    return <SalonDetailHeroSkeleton />;
  }
  if (path === "/salons") {
    return <SalonGridSkeleton count={6} />;
  }
  if (path === "/products") {
    return <ProductPageSkeleton />;
  }
  if (path.startsWith("/product/detail")) {
    return <ProductDetailSkeleton />;
  }
  if (path === "/job-seeker") {
    return <JobSeekerPageSkeleton />;
  }
  if (path.startsWith("/job-seeker/")) {
    return <JobSeekerDetailSkeleton />;
  }

  // Fallback for auth pages or other pages (simple generic skeleton)
  return (
    <div style={{ padding: "80px 5%", background: "#f8fafc" }}>
      <SkeletonStyles />
      <div className="es-sk" style={{ height: "40px", width: "220px", marginBottom: "30px" }} />
      <div className="es-sk" style={{ height: "13px", width: "100%", marginBottom: "12px" }} />
      <div className="es-sk" style={{ height: "13px", width: "90%", marginBottom: "12px" }} />
      <div className="es-sk" style={{ height: "13px", width: "95%", marginBottom: "30px" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="es-sk" style={{ height: "180px", borderRadius: "12px" }} />
        ))}
      </div>
    </div>
  );
};

// Lazy load page components
const AboutUs = lazy(() => import("./components/pages/about/AboutUs"));
const ContactUs = lazy(() => import("./components/pages/contact/ContactUsForm"));
const Home = lazy(() => import("./components/pages/home/Home"));
const JobSeeker = lazy(() => import("./components/pages/jobSeeker/JobSeeker"));
const JobSeekerDetail = lazy(() => import("./components/pages/jobSeeker/JobSeekerDetail"));
const NotFound = lazy(() => import("./components/pages/404/Animated404Component"));
const LegalInfo = lazy(() => import("./components/pages/legal/LegalInfo"));
const Login = lazy(() => import("./components/pages/auth/Login"));
const Register = lazy(() => import("./components/pages/auth/Register"));
const Salon = lazy(() => import("./components/pages/salon/Salon"));
const SalonDetail = lazy(() => import("./components/pages/salonDetail/SalonDetail"));
const Product = lazy(() => import("./components/pages/products/Product"));
const ProductDetail = lazy(() => import("./components/pages/products/ProductDetailPage"));
const Faq = lazy(() => import("./components/pages/faq/Faq"));
const CartPage = lazy(() => import("./components/pages/cart/CartPage"));
const CheckoutPage = lazy(() => import("./components/pages/checkout/CheckoutPage"));
const Academy = lazy(() => import("./components/pages/academy/Academy"));
const Dashboard = lazy(() => import("./components/pages/dashboard/Dashboard"));

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ flex: 1, display: "flex", flexDirection: "column" }}
  >
    {children}
  </motion.div>
);

function App() {
  const [theme, colorMode] = useMode();
  const themes = useTheme();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  React.useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }

    const path = location.pathname;
    let title = "";

    if (path === "/" || path === "") {
      title = `${BRAND.name} — ${BRAND.tagline}`;
    } else if (path === "/about") {
      title = getMetaTitle("About Us");
    } else if (path === "/contact") {
      title = getMetaTitle("Contact Us");
    } else if (path === "/job-seeker") {
      title = getMetaTitle("Careers & Opportunities");
    } else if (path.startsWith("/job-seeker/")) {
      title = getMetaTitle("Job Opportunity");
    } else if (path === "/legal-info") {
      title = getMetaTitle("Legal & Privacy Information");
    } else if (path === "/login") {
      title = getMetaTitle("Login");
    } else if (path === "/register") {
      title = getMetaTitle("Register");
    } else if (path === "/salons") {
      title = getMetaTitle("Discover Salons");
    } else if (path.startsWith("/salon/detail")) {
      title = getMetaTitle("Salon Details");
    } else if (path === "/products") {
      title = getMetaTitle("Beauty Products");
    } else if (path.startsWith("/product/detail")) {
      title = getMetaTitle("Product Details");
    } else if (path === "/faq") {
      title = getMetaTitle("FAQ");
    } else if (path === "/cart") {
      title = getMetaTitle("Shopping Cart");
    } else if (path === "/checkout") {
      title = getMetaTitle("Checkout");
    } else if (path === "/academy") {
      title = getMetaTitle(BRAND.academy);
    } else if (path.startsWith("/dashboard")) {
      title = getMetaTitle(BRAND.dashboard);
    } else {
      title = getMetaTitle("404 Not Found");
    }

    document.title = title;
  }, [location.pathname]);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastProvider>
          <div
            id="main-div"
            style={{
              backgroundColor: "#f8fafc",
              color: "#1a0f08",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              width: "100%",
              maxWidth: "100%",
              overflowX: "hidden",
            }}
          >
            <Topbar />
            <Suspense fallback={<PageSuspenseFallback />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route exact path='/' element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path='*' element={<PageWrapper><NotFound /></PageWrapper>} />
                  <Route path='/about' element={<PageWrapper><AboutUs /></PageWrapper>} />
                  <Route exact path='/contact' element={<PageWrapper><ContactUs /></PageWrapper>} />
                  <Route exact path='/job-seeker' element={<PageWrapper><JobSeeker /></PageWrapper>} />
                  <Route exact path='/job-seeker/:id' element={<PageWrapper><JobSeekerDetail /></PageWrapper>} />
                  <Route path='/legal-info' element={<PageWrapper><LegalInfo /></PageWrapper>} />
                  <Route exact path='/login' element={<PageWrapper><Login /></PageWrapper>} />
                  <Route exact path='/register' element={<PageWrapper><Register /></PageWrapper>} />
                  <Route exact path='/salons' element={<PageWrapper><Salon /></PageWrapper>} />
                  <Route exact path='/products' element={<PageWrapper><Product /></PageWrapper>} />
                  <Route exact path='/salon/detail/:code' element={<PageWrapper><SalonDetail /></PageWrapper>} />
                  <Route exact path='/faq' element={<PageWrapper><Faq /></PageWrapper>} />
                  <Route exact path='/product/detail' element={<PageWrapper><ProductDetail /></PageWrapper>} />
                  <Route exact path='/cart' element={<PageWrapper><CartPage /></PageWrapper>} />
                  <Route exact path='/checkout' element={<PageWrapper><CheckoutPage /></PageWrapper>} />
                  <Route exact path='/academy' element={<PageWrapper><Academy /></PageWrapper>} />
                  <Route exact path='/dashboard' element={<PageWrapper><Dashboard /></PageWrapper>} />
                </Routes>
              </AnimatePresence>
            </Suspense>
            {!isDashboard && <Footer />}
          </div>
        </ToastProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
