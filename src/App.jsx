/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { ThemeProvider, useTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// import { useIdleTimer } from 'react-idle-timer';

import { ColorModeContext, useMode, tokens } from "./theme";
import Topbar from "./components/common/Topbar";
import Loader from "./components/common/Loader";
import AboutUs from "./components/pages/about/AboutUs";
import ContactUs from "./components/pages/contact/ContactUsForm";
import Home from "./components/pages/home/Home";
import JobSeeker from "./components/pages/jobSeeker/JobSeeker";
import NotFound from "./components/pages/404/Animated404Component";
import Salon from "./components/pages/salon/Salon";
import SalonDetail from "./components/pages/salonDetail/SalonDetail";
// import Services from "./components/pages";
// import PrivacyPolicy from "./components/pages";
import Footer from './components/common/Footer';

function App() {

  const [theme, colorMode] = useMode();
  const themes = useTheme();
  const colors = tokens(themes.palette.mode);
  const location = useLocation();

  // old gradient = linear-gradient(to right, #d9a7c7, #ffdde1)

  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
       <CssBaseline/>
        <Suspense fallback={<Loader />}>
          <div id="main-div" style={{
            backgroundColor: "#f3f3f3", background: location.pathname == "/salons" ? `radial-gradient(circle, rgba(160,177,193,1) 0%, rgba(194,192,197,1) 100%)` :
              location.pathname == "/about" ? `linear-gradient(to bottom right, rgb(249,249,249), #f3f3f3, rgb(236,236,236))` : `linear-gradient(to bottom right, rgba(182,164,159,1), rgba(231,214,202,1))`,
            color: "#000000", position: "relative", display: "flex", flexDirection: "column", minHeight: "100vh", minWidth: "320px", width: "100%", maxWidth: "100vw", transition: "background 1s ease"
          }}>
            <Topbar />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/about' element={<AboutUs />} />
              <Route exact path='/contact' element={<ContactUs />} />
              <Route exact path='/job-seeker' element={<JobSeeker />} />
              <Route exact path='/salons' element={<Salon />} />
              <Route exact path='/salon/detail/:code' element={<SalonDetail />} />
              {/* <Route path='/services' element={<Services />} />
              <Route path='/privacyPolicy' element={<PrivacyPolicy />} /> */}
            </Routes>
            <Footer />
          </div>
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
