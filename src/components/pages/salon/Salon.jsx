/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from "react";

import "./style.css";
import Brands from "../../common/Brands";
import FilterMenu from "../../common/FilterMenu";
import Newsletter from "../../common/Newsletter";
import SalonListCards from './SalonListCards';
import SalonPageTop from "./SalonPageTop";


const Salon = () => {

  React.useEffect(() => {
    //scroll to top of the page automatically
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }, []);

  return (
    <>
      <SalonPageTop />
      <FilterMenu />
      <SalonListCards />
      <Newsletter />
      <Brands />
    </>
  );
}

export default Salon;
