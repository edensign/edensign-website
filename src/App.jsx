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
import Topbar from "./components/common/Topbar";
import Loader from "./components/common/Loader";
import Footer from './components/common/Footer';

// Lazy load page components
const AboutUs = lazy(() => import("./components/pages/about/AboutUs"));
const ContactUs = lazy(() => import("./components/pages/contact/ContactUsForm"));
const Home = lazy(() => import("./components/pages/home/Home"));
const JobSeeker = lazy(() => import("./components/pages/jobSeeker/JobSeeker"));
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
  const theme = useMode()[0];
  const colorMode = useMode()[1];
  const themes = useTheme();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  React.useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loader />}>
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
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route exact path='/' element={<PageWrapper><Home /></PageWrapper>} />
                <Route path='*' element={<PageWrapper><NotFound /></PageWrapper>} />
                <Route path='/about' element={<PageWrapper><AboutUs /></PageWrapper>} />
                <Route exact path='/contact' element={<PageWrapper><ContactUs /></PageWrapper>} />
                <Route exact path='/job-seeker' element={<PageWrapper><JobSeeker /></PageWrapper>} />
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
            {!isDashboard && <Footer />}
          </div>
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
