/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import "./style.css";
import AmenitiesComponent from "./AmenitiesComponent";
import BookAppointment from "./BookAppointment";
import DetailPageTop from "./DetailPageTop";
import ExclusiveOffer from "./ExclusiveOffer";
import FilterMenu from "../../common/FilterMenu";
import ImagesCarousel from "./ImagesCarousel";
import Newsletter from "../../common/Newsletter";
import Offer from "./Offer";
import Review from "./Review";
import ServicesCarousel from "./ServicesCarousel";
import ServicesStrip from "./ServicesStrip";
import TheLocations from "./TheLocations";
import VideoSection from "./VideoSection";
import ScrollToTop from "../../common/ScrollToTop";

import API from '../../../apis';
import { setSalonDetail } from '../../../redux/actions/SalonAction';
import ActiveOffersSection from "../ActiveOffersSection";
import SalonGallery from "./SalonGallery";


const SalonDetail = () => {
    const [amenities, setAmenities] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);   //this will contain id of service selected from services carousel
    const [salon, setSalon] = useState(null);

    const URLParams = useParams();
    const dispatch = useDispatch();
    const appointmentRef = useRef(null);

    const handleClick = (service) => {
        appointmentRef.current.scrollIntoView({ behavior: "smooth" });
        setSelectedService(service.id);
    };

    const getSelectedAmenitiesByName = (dataObj) => {
        if (dataObj) {
            return amenities.filter(amenity => dataObj.includes(amenity.id.toString()));
        }
    };

    const getSelectedServicesByName = (dataObj) => {
        if (dataObj) {
            return services.filter(service => dataObj.includes(service.id.toString()));
        }
    };

    useEffect(() => {
        API.SalonAPI.getSalonDetail(URLParams)
            .then(response => {
                if (response.status === "Success") {
                    response.data.salon.amenities = getSelectedAmenitiesByName(response.data.salon?.amenities);
                    response.data.salon.services = getSelectedServicesByName(response.data.salon?.services);

                    setSalon(response.data.salon);
                    dispatch(setSalonDetail({ salon: response.data.salon, images: response.data.images }));
                    console.log("Salon detail response=>", response.data);
                } else {
                    dispatch(setSalonDetail({ salon: {}, images: [] }))
                }
            })
            .catch(error => {
                dispatch(setSalonDetail({ salon: {}, images: [] }))
                throw error;
            });
    }, [amenities, services]);

    //get all amenities from amenity table stored in the db
    useEffect(() => {
        API.AmenityAPI.getAll(false, 0, 30)
            .then(amenities => {
                if (amenities.status === 'Success') {
                    setAmenities(amenities.data.rows);
                } else {
                    console.log("Error, Please Try Again");
                }
            })
            .catch(err => {
                throw err;
            });
    }, []);

    //get all services from service table stored in db
    useEffect(() => {
        API.ServiceAPI.getAll(false, 0, 30)
            .then(services => {
                if (services.status === 'Success') {
                    setServices(services.data.rows);
                } else {
                    console.log("Error, Please Try Again");
                }
            })
            .catch(err => {
                throw err;
            });
    }, []);


    return (
        <ScrollToTop>
            <DetailPageTop />
            <ServicesStrip />
            <Offer />
            <AmenitiesComponent />
            <SalonGallery />
            <ExclusiveOffer />
            <ServicesCarousel handleClick={handleClick} />
            {salon && (salon.video_url || salon.videoUrl || salon.video || salon.work_video_url) && (
                <VideoSection salon={salon} />
            )}
            {salon && <ActiveOffersSection salonId={salon.id} title={`${salon.name} Exclusive Offers`} />}
            <BookAppointment appointmentRef={appointmentRef} selectedService={selectedService} />
            <Newsletter />
            <Review />
            <TheLocations />
        </ScrollToTop>
    )
};

export default SalonDetail;
