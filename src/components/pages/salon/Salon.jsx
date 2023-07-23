/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import PageTop from "../../common/PageTop";
import SalonListCards from './SalonListCards';
import FilterMenu from "../../common/FilterMenu";

import BookAppointment from './BookAppointment';

const Salon = ({ colors }) => {
  return (
    <>
      <PageTop name='salons' colors={colors} />
      <FilterMenu />
      <SalonListCards />
      {/* <BookAppointment /> */}
    </>
  );
}

export default Salon;
