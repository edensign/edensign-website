/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from "react";

import "./style.css";
import BookAppointment from "./BookAppointment";
import DetailPageTop from "./DetailPageTop";
import ExclusiveOffer from "./ExclusiveOffer";
import Facilities from "./Facilities";
import FilterMenu from "../../common/FilterMenu";
import ImagesCarousel from "./ImagesCarousel";
import LatestOffer from "./LatestOffer";
import Newsletter from "../../common/Newsletter";
import Offer from "./Offer";
import Review from "./Review";
import SalonCarousel from "./SalonCarousel";
import ServicesStrip from "./ServicesStrip";
import TheLocations from "./TheLocations";
import VideoSection from "./VideoSection";


const SalonDetail = () => {

    //808076, 94948b, a9a9a1, bebeb8, d3d3cf
    // React.useEffect(() => {
    // document.getElementById("main-div").style.background = `linear-gradient(to bottom right, ${backgroundColor} 10%, d3d3cf 20%)`;
    // }, []);

    return (
        <>
            <DetailPageTop />
            <FilterMenu />
            <ServicesStrip />
            <Offer />
            <Facilities />
            <ExclusiveOffer />
            <SalonCarousel />
            <VideoSection />
            <LatestOffer />
            <ImagesCarousel />
            <BookAppointment />
            <Newsletter />
            <Review />
            <TheLocations />
        </>
    )
};

export default SalonDetail;
