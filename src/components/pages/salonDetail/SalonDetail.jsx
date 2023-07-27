/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from "react";

import "./style.css";
import Booking from "./Booking";
import FilterMenu from "../../common/FilterMenu";
import PageTop from "../../common/PageTop";
import Offer from "./Offer";
import SmallCarousel from "./SmallCarousel";
import Facilities from "./Facilities";
import SalonCarousel from "./SalonCarousel";
import ExclusiveOffer from "./ExclusiveOffer";


const SalonDetail = ({ backgroundColor }) => {

    React.useEffect(() => {
        document.getElementById("main-div").style.background = `linear-gradient(to right, ${backgroundColor}, ${backgroundColor})`;
    }, []);

    return (
        <>
            <PageTop name='details' />
            <FilterMenu />
            <SmallCarousel />
            <Booking />
            <Offer />
            <Facilities />
            <ExclusiveOffer />
            <SalonCarousel />
        </>
    )
};

export default SalonDetail;
