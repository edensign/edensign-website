/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import TuneIcon from '@mui/icons-material/Tune';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import { setFilterOpen } from '../../../redux/actions/FilterAction';
import SalonBg from '../../assets/salonbg.jpg';
import API from '../../../apis';

const SalonPageTop = () => {
  const [buttonText, setButtonText] = useState('Filter');
  const filterOpen = useSelector(state => state.filterOpen);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [allSalons, setAllSalons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    API.SalonAPI.getSalonList()
      .then(res => {
        if (res.status === 'Success') {
          setAllSalons(res.data || []);
        }
      })
      .catch(err => {
        console.error("Error fetching salons for search:", err);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const searchBar = document.querySelector('.salon-search-bar');
      if (searchBar && !searchBar.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSalons = searchQuery.trim() === '' ? [] : allSalons.filter(salon => {
    const query = searchQuery.toLowerCase().trim();
    const normalizedQuery = query
      .replace(/barei+ly/g, 'bareilly')
      .replace(/bareily/g, 'bareilly');

    const name = (salon.name || '').toLowerCase();
    const street = (salon.street || '').toLowerCase();
    const landmark = (salon.landmark || '').toLowerCase();

    return name.includes(query) || name.includes(normalizedQuery) ||
           street.includes(query) || street.includes(normalizedQuery) ||
           landmark.includes(query) || landmark.includes(normalizedQuery);
  });

  const handleSelectSalon = (salon) => {
    setShowDropdown(false);
    setSearchQuery(salon.name);
    navigate(`/salon/detail/${salon.salon_code}`);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (filteredSalons.length > 0) {
      handleSelectSalon(filteredSalons[0]);
    }
  };

  const handleClick = () => {
    const box = document.getElementsByClassName('filter-btn-box')[0];
    const btn = document.getElementsByClassName('filter-open-btn')[0];
    const filterBox = document.getElementById('filter-box');
    const arrowIcon = document.getElementById('arrow-icon');

    const isMobile = window.innerWidth <= 768;
    const offset = isMobile ? (filterOpen.filterOpen ? '0' : '70%') : (filterOpen.filterOpen ? '0' : '21%');

    box.style.right = offset;
    box.style.transform = filterOpen.filterOpen ? 'translateX(0)' : 'matrix(1, 0, 0, 1, 0, 0)';
    btn.style.width = filterOpen.filterOpen ? (isMobile ? '5.5em' : '7em') : '4em';
    btn.style.padding = filterOpen.filterOpen ? (isMobile ? '10px 20px' : '10px 50px') : '9px 0px 9px 4px';
    filterBox.style.opacity = filterOpen.filterOpen ? '0' : '1';
    filterBox.style.transform = filterOpen.filterOpen ? 'translateX(100%)' : 'translateX(0)';
    if (arrowIcon) arrowIcon.style.transform = filterOpen.filterOpen ? '' : 'rotate(180deg)';
  };

  useEffect(() => {
    const onScroll = () => {
      const btn = document.getElementsByClassName('filter-open-btn')[0];
      const scroll = window.pageYOffset;
      if (!btn) return;
      if (scroll > 100) {
        btn.style.width = '4em';
        btn.style.padding = '9px 0px 9px 4px';
        setButtonText('');
      } else {
        btn.style.width = '7em';
        btn.style.padding = '10px 50px';
        setButtonText('Filter');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div style={{
        position: 'relative',
        height: '88vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        color: '#fff',
      }}>
        {/* Background image */}
        <img
          src={SalonBg}
          alt="Salons"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.04)',
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,4,2,0.55) 0%, rgba(26,10,0,0.75) 60%, rgba(26,10,0,0.92) 100%)',
        }} />

        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          border: '1px solid rgba(199,149,108,0.15)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          width: 320,
          height: 320,
          borderRadius: '50%',
          border: '1px solid rgba(199,149,108,0.1)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '760px',
          width: '100%',
        }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block',
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#c7956c',
              marginBottom: '16px',
              background: 'rgba(199,149,108,0.12)',
              padding: '6px 16px',
              borderRadius: '100px',
              border: '1px solid rgba(199,149,108,0.3)',
            }}
          >
            10,000+ Salons Across India
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 6vw, 68px)',
              fontWeight: 700,
              color: '#fff',
              margin: '0 0 16px 0',
              lineHeight: 1.1,
            }}
          >
            Find Your Perfect <em style={{ fontStyle: 'italic', color: '#c7956c' }}>Salon</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.7)',
              margin: '0 0 40px 0',
              lineHeight: 1.7,
            }}
          >
            Browse top-rated salons across 15 states and book your appointment in seconds.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="salon-search-bar"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.96)',
              borderRadius: '100px',
              padding: '6px 8px 6px 20px',
              maxWidth: '520px',
              margin: '0 auto',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(10px)',
              position: 'relative', // Relative position is critical to anchor suggestion dropdown!
            }}
          >
            <SearchIcon sx={{ color: '#c7956c', fontSize: { xs: 18, sm: 20 }, mr: 1 }} />
            <input
              type="text"
              placeholder="Search by salon name or city..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#1a0f08',
                background: 'transparent',
                padding: '10px 0',
                minWidth: 0, // fix for flex items
              }}
            />
            <button 
              onClick={handleSearchSubmit}
              style={{
                background: 'linear-gradient(135deg, #c7956c, #a8724d)',
                border: 'none',
                borderRadius: '100px',
                padding: '12px 24px',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                transition: 'box-shadow 0.2s',
              }}
            >
              Search
            </button>

            {/* Suggestions dropdown list */}
            {showDropdown && filteredSalons.length > 0 && (
              <div 
                style={{
                  position: 'absolute',
                  top: '105%',
                  left: '0',
                  right: '0',
                  background: 'rgba(255, 255, 255, 0.98)',
                  borderRadius: '20px',
                  boxShadow: '0 12px 40px rgba(26,10,0,0.18)',
                  border: '1px solid rgba(199,149,108,0.2)',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  zIndex: 9999,
                  padding: '8px 0',
                  marginTop: '6px',
                  textAlign: 'left',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {filteredSalons.map((salon) => (
                  <div
                    key={salon.id || salon.salon_code}
                    onClick={() => handleSelectSalon(salon)}
                    style={{
                      padding: '12px 20px',
                      cursor: 'pointer',
                      borderBottom: '1px solid rgba(199,149,108,0.06)',
                      transition: 'background-color 0.2s, padding-left 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                    }}
                    className="search-suggestion-item"
                  >
                    <span 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#1a0f08',
                        textTransform: 'capitalize',
                      }}
                    >
                      {salon.name}
                    </span>
                    <span 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        color: '#9a8070',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        maxWidth: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      <LocationOnOutlinedIcon sx={{ fontSize: 13, color: '#c7956c', flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {salon.landmark ? `${salon.landmark}, ` : ''}
                        {salon.street || ''}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
          <style>{`
            .search-suggestion-item:hover {
              background-color: rgba(199, 149, 108, 0.08) !important;
              padding-left: 26px !important;
            }
            .search-suggestion-item:last-child {
              border-bottom: none !important;
            }
            @media (max-width: 600px) {
              .salon-search-bar {
                padding: 4px 6px 4px 16px !important;
                border-radius: 50px !important;
              }
              .salon-search-bar input {
                font-size: 13px !important;
              }
              .salon-search-bar button {
                padding: 10px 20px !important;
                font-size: 12px !important;
              }
            }
          `}</style>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>scroll</span>
          <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, rgba(199,149,108,0.8), transparent)' }} />
        </motion.div>
      </div>


    </>
  );
};

export default SalonPageTop;
