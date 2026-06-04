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

import {
  SkeletonStyles,
  SalonDetailHeroSkeleton,
  ServicesStripSkeleton,
  AmenitiesSkeleton,
  GallerySkeleton,
  SectionHeaderSkeleton,
  ReviewSkeleton,
  NewsletterSkeleton,
} from "../../common/PageSkeletons";

/* ── Offer section skeleton ── */
const OfferSkeleton = () => (
  <div style={{ padding: '40px 5%', background: '#fff', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    {[1, 2].map(i => (
      <div key={i} style={{ flex: '0 0 calc(50% - 10px)', background: '#f8f4f0', borderRadius: '20px', padding: '28px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div className="es-sk" style={{ width: '80px', height: '80px', borderRadius: '16px', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div className="es-sk" style={{ height: '18px', width: '70%', marginBottom: '10px' }} />
          <div className="es-sk" style={{ height: '13px', width: '90%', marginBottom: '6px' }} />
          <div className="es-sk" style={{ height: '13px', width: '60%' }} />
        </div>
      </div>
    ))}
  </div>
);

/* ── Services carousel skeleton ── */
const ServicesCarouselSkeleton = () => (
  <div style={{ padding: '60px 5%', background: '#f8fafc' }}>
    <SectionHeaderSkeleton />
    <div style={{ display: 'flex', gap: '24px', overflowX: 'auto' }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ flexShrink: 0, width: '280px', background: '#fff', borderRadius: '20px', overflow: 'hidden' }}>
          <div className="es-sk" style={{ height: '200px', borderRadius: 0 }} />
          <div style={{ padding: '20px' }}>
            <div className="es-sk" style={{ height: '20px', width: '70%', marginBottom: '10px' }} />
            <div className="es-sk" style={{ height: '13px', width: '90%', marginBottom: '6px' }} />
            <div className="es-sk" style={{ height: '36px', width: '140px', borderRadius: '4px', marginTop: '14px' }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Book appointment skeleton ── */
const BookAppointmentSkeleton = () => (
  <div style={{ padding: '60px 5%', background: '#fff' }}>
    <SectionHeaderSkeleton />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="es-sk" style={{ height: '56px', borderRadius: '10px' }} />
        ))}
        <div className="es-sk" style={{ height: '52px', borderRadius: '30px', marginTop: '8px' }} />
      </div>
      <div className="es-sk" style={{ height: '360px', borderRadius: '20px' }} />
    </div>
  </div>
);

/* ── Locations skeleton ── */
const LocationsSkeleton = () => (
  <div style={{ padding: '60px 5%', background: '#f8fafc' }}>
    <SectionHeaderSkeleton />
    <div className="es-sk" style={{ height: '400px', borderRadius: '20px' }} />
  </div>
);

/* ── Full page skeleton for salon detail ── */
const SalonDetailSkeleton = () => (
  <>
    <SkeletonStyles />
    <SalonDetailHeroSkeleton />
    <ServicesStripSkeleton />
    <OfferSkeleton />
    <AmenitiesSkeleton />
    <GallerySkeleton />
    <ServicesCarouselSkeleton />
    <BookAppointmentSkeleton />
    <NewsletterSkeleton />
    <ReviewSkeleton />
    <LocationsSkeleton />
  </>
);


const SalonDetail = () => {
    const [amenities, setAmenities] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);   //this will contain id of service selected from services carousel
    const [salon, setSalon] = useState(null);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            })
            .catch(error => {
                dispatch(setSalonDetail({ salon: {}, images: [] }))
                setLoading(false);
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

    /* Show skeleton until the main salon data is fetched */
    if (loading) {
        return <SalonDetailSkeleton />;
    }

    return (
        <ScrollToTop>
            <SkeletonStyles />
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
