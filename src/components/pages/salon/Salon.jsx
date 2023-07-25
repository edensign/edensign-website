/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from "react";

import Brands from "../../common/Brands";
import PageTop from "../../common/PageTop";
import FilterMenu from "../../common/FilterMenu";
import Newsletter from "../../common/Newsletter";
import SalonListCards from './SalonListCards';

import BookAppointment from './BookAppointment';

const Salon = ({ backgroundColor }) => {

  React.useEffect(() => {
    document.getElementById("main-div").style.background = `linear-gradient(to right, ${backgroundColor}, ${backgroundColor})`;
  }, []);

  return (
    <>
      <PageTop name='salons' />
      <FilterMenu />
      <SalonListCards />
      <Newsletter />
      <Brands />
      {/* <BookAppointment /> */}
    </>
  );
}

export default Salon;
