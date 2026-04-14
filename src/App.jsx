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
import AboutUs from "./components/pages/about/AboutUs";
import ContactUs from "./components/pages/contact/ContactUsForm";
import Home from "./components/pages/home/Home";
import JobSeeker from "./components/pages/jobSeeker/JobSeeker";
import NotFound from "./components/pages/404/Animated404Component";
import LegalInfo from "./components/pages/legal/LegalInfo";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Salon from "./components/pages/salon/Salon";
import SalonDetail from "./components/pages/salonDetail/SalonDetail";
import Product from "./components/pages/products/Product";
import ProductDetail from "./components/pages/products/ProductDetailPage";
import Faq from "./components/pages/faq/Faq";
import Footer from './components/common/Footer';

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
              minWidth: "320px",
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
              </Routes>
            </AnimatePresence>
            <Footer />
          </div>
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
