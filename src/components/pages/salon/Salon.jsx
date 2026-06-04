/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import React, { useState, useEffect } from "react";
import { 
  Box, 
  FormControl, 
  Select, 
  MenuItem, 
  Button, 
  Menu
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import API from '../../../apis';
/* style.css preserved for any remaining legacy classes */
import "./style.css";
import Brands from "../../common/Brands";
import Newsletter from "../../common/Newsletter";
import SalonListCards from './SalonListCards';
import SalonPageTop from "./SalonPageTop";

import {
  SkeletonStyles,
  PageTopBannerSkeleton,
  SalonGridSkeleton,
  NewsletterSkeleton,
  BrandsSkeleton,
} from "../../common/PageSkeletons";

/* ── Page-level skeleton shown on first load ── */
const SalonPageSkeleton = () => (
  <>
    <SkeletonStyles />
    <PageTopBannerSkeleton height="88vh" />
    {/* Filter bar skeleton */}
    <div style={{ padding: '20px 5%', background: '#fff', display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '1px solid rgba(199,149,108,0.1)' }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="es-sk" style={{ height: '36px', width: '110px', borderRadius: '30px' }} />
      ))}
    </div>
    <SalonGridSkeleton count={6} />
    <NewsletterSkeleton />
    <BrandsSkeleton />
  </>
);

const Salon = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [selectedCategory] = useState('');
  
  // State for all filters
  const [selectedGender, setSelectedGender] = useState(''); // '' means All
  const [selectedCity, setSelectedCity] = useState(''); // '' means All/Auto
  const [selectedCityName, setSelectedCityName] = useState('');
  const [selectedRating, setSelectedRating] = useState(''); // '' means All
  const [sortByNearest, setSortByNearest] = useState(true);

  // Geolocation state
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [locationState, setLocationState] = useState('prompt'); // 'prompt', 'granted', 'denied'

  // DB Cities
  const [cities, setCities] = useState([]);

  // Popover Anchor States
  const [ratingAnchorEl, setRatingAnchorEl] = useState(null);

  useEffect(() => {
    // Request geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationState('granted');
        },
        (error) => {
          console.warn("Geolocation access denied or failed:", error);
          setLocationState('denied');
          setSortByNearest(false); // disable by default if denied
        }
      );
    } else {
      setLocationState('denied');
      setSortByNearest(false);
    }

    // Load cities
    API.CityAPI.getCities()
      .then(res => {
        if (res.status === 'Success' && res.data && res.data.rows) {
          setCities(res.data.rows);
        }
      })
      .catch(err => {
        console.error("Error fetching cities:", err);
      });

    // Give the hero image a moment to start loading before revealing content
    const t = setTimeout(() => setPageLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleCityChange = (event) => {
    const val = event.target.value;
    setSelectedCity(val);
    if (val === '') {
      setSelectedCityName('');
    } else {
      const cityObj = cities.find(c => c.id === val);
      if (cityObj) setSelectedCityName(cityObj.name);
    }
  };

  const handleCityDetected = ({ id, name }) => {
    // Only set if not already manually selected by user
    if (!selectedCity && id) {
      setSelectedCity(id);
      setSelectedCityName(name);
    }
  };

  if (!pageLoaded) {
    return <SalonPageSkeleton />;
  }

  return (
    <>
      <SkeletonStyles />
      <SalonPageTop />
      
      {/* ── Sleek Glassmorphic Filter Bar ── */}
      <Box style={{
        position: 'sticky',
        top: '64px',
        zIndex: 99,
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(199, 149, 108, 0.15)',
        padding: '16px 5%',
        boxShadow: '0 8px 32px rgba(26, 10, 0, 0.04)',
      }}>
        <Box style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Left Part: Tabs & City */}
          <Box style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Gender Segmented Control */}
            <Box style={{
              display: 'inline-flex',
              background: 'rgba(26, 10, 0, 0.04)',
              padding: '4px',
              borderRadius: '100px',
              border: '1px solid rgba(199, 149, 108, 0.1)'
            }}>
              {[
                { label: 'All', value: '' },
                { label: 'Men', value: 'male' },
                { label: 'Women', value: 'female' },
                { label: 'Unisex', value: 'unisex' }
              ].map(opt => {
                const active = selectedGender === opt.value;
                return (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedGender(opt.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: active ? '#c7956c' : 'transparent',
                      color: active ? '#fff' : '#5a463b',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: active ? 600 : 500,
                      padding: '8px 18px',
                      borderRadius: '100px',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </Box>

            {/* City Dropdown */}
            <FormControl size="small" style={{ minWidth: '160px' }}>
              <Select
                value={selectedCity}
                onChange={handleCityChange}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9a8070' }}>
                        <LocationOnIcon style={{ fontSize: '16px', color: '#c7956c' }} />
                        {locationState === 'granted' && !selectedCity ? 'Nearby' : 'Select City'}
                      </span>
                    );
                  }
                  return (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1a0f08', fontWeight: 600 }}>
                      <LocationOnIcon style={{ fontSize: '16px', color: '#c7956c' }} />
                      {selectedCityName}
                    </span>
                  );
                }}
                sx={{
                  borderRadius: '100px',
                  borderColor: 'rgba(199, 149, 108, 0.25)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(199, 149, 108, 0.25)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#c7956c',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#c7956c',
                  },
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  backgroundColor: '#fff',
                }}
              >
                <MenuItem value="">
                  <em>Show All Cities</em>
                </MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.id} style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Right Part: Popover Filters & Sorting */}
          <Box style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Rating Filter Trigger */}
            <Button
              onClick={(e) => setRatingAnchorEl(e.currentTarget)}
              endIcon={<KeyboardArrowDownIcon />}
              startIcon={<StarRateIcon style={{ fontSize: '15px' }} />}
              sx={{
                borderRadius: '100px',
                border: '1px solid rgba(199, 149, 108, 0.25)',
                color: selectedRating ? '#c7956c' : '#5a463b',
                background: selectedRating ? 'rgba(199, 149, 108, 0.06)' : '#fff',
                fontWeight: selectedRating ? 600 : 500,
                fontSize: '13px',
                textTransform: 'none',
                fontFamily: 'Inter, sans-serif',
                px: '16px',
                '&:hover': {
                  borderColor: '#c7956c',
                  background: 'rgba(199, 149, 108, 0.04)',
                }
              }}
            >
              {selectedRating ? `${selectedRating}★ & above` : 'Rating'}
            </Button>
            <Menu
              anchorEl={ratingAnchorEl}
              open={Boolean(ratingAnchorEl)}
              onClose={() => setRatingAnchorEl(null)}
              PaperProps={{
                style: {
                  borderRadius: '16px',
                  marginTop: '8px',
                  boxShadow: '0 10px 40px rgba(26,10,0,0.12)',
                  border: '1px solid rgba(199,149,108,0.15)',
                  minWidth: '160px',
                  padding: '8px 0',
                }
              }}
            >
              <MenuItem onClick={() => { setSelectedRating(''); setRatingAnchorEl(null); }} style={{ fontSize: '13px', fontFamily: 'Inter' }}>
                <em>Any Rating</em>
              </MenuItem>
              {[4.5, 4.0, 3.5, 3.0].map((r) => (
                <MenuItem 
                  key={r} 
                  onClick={() => { setSelectedRating(r); setRatingAnchorEl(null); }}
                  style={{ 
                    fontSize: '13px', 
                    fontFamily: 'Inter',
                    fontWeight: selectedRating === r ? 600 : 400,
                    color: selectedRating === r ? '#c7956c' : '#1a0f08'
                  }}
                >
                  {r}★ & above
                </MenuItem>
              ))}
            </Menu>

            {/* Nearest Sorting Button */}
            {coordinates.latitude && (
              <Button
                variant={sortByNearest ? "contained" : "outlined"}
                onClick={() => setSortByNearest(!sortByNearest)}
                startIcon={<MyLocationIcon style={{ fontSize: '14px' }} />}
                sx={{
                  borderRadius: '100px',
                  boxShadow: 'none',
                  textTransform: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  px: '16px',
                  backgroundColor: sortByNearest ? '#c7956c' : '#fff',
                  color: sortByNearest ? '#fff' : '#5a463b',
                  borderColor: sortByNearest ? 'transparent' : 'rgba(199, 149, 108, 0.25)',
                  '&:hover': {
                    backgroundColor: sortByNearest ? '#b08059' : 'rgba(199, 149, 108, 0.04)',
                    borderColor: sortByNearest ? 'transparent' : '#c7956c',
                    boxShadow: 'none',
                  }
                }}
              >
                Nearest First
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Salon cards grid with all filters passed down */}
      <SalonListCards 
        selectedCategory={selectedCategory} 
        selectedGender={selectedGender}
        selectedCity={selectedCity}
        selectedRating={selectedRating}
        latitude={sortByNearest ? coordinates.latitude : null}
        longitude={sortByNearest ? coordinates.longitude : null}
        onCityDetected={handleCityDetected}
      />
      
      <Newsletter />
      <Brands />
    </>
  );
}

export default Salon;
