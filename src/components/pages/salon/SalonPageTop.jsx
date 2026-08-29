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
        background: 'var(--es-background)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        color: 'var(--es-on-surface)',
        padding: '80px 24px 40px 24px',
      }}>
        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '900px',
          width: '100%',
        }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-label-caps"
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: 'var(--es-primary)',
              marginBottom: '16px',
            }}
          >
            Curated Excellence
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 5.5vw, 56px)',
              fontWeight: 600,
              color: 'var(--es-espresso)',
              margin: '0 0 16px 0',
              lineHeight: 1.15,
            }}
          >
            The Salon <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Directory</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              color: 'var(--es-on-surface-variant)',
              margin: '0 0 48px 0',
              lineHeight: 1.7,
              maxWidth: '640px',
              marginLeft: 'auto',
              marginRight: 'auto',
              opacity: 0.85,
            }}
          >
            Discover the world's most prestigious beauty spaces, vetted for technique, ambiance, and extraordinary service.
          </motion.p>

          {/* Search bar Card layout from the stitch design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="salon-search-card"
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '860px',
              margin: '0 auto 32px auto',
              boxShadow: '0 15px 40px rgba(127, 85, 50, 0.06)',
              border: '1px solid rgba(213, 195, 184, 0.5)',
              position: 'relative',
            }}
          >
            <form className="salon-search-form" onSubmit={handleSearchSubmit} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr auto',
              gap: '16px',
              alignItems: 'center',
            }}>
              {/* Keyword input */}
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '6px' }}>
                <label className="font-label-caps" style={{ fontSize: '10px', color: 'var(--es-on-surface-variant)', opacity: 0.7 }}>Search Salons</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--es-outline-variant)', borderRadius: '8px', padding: '6px 12px', background: 'var(--es-background)' }}>
                  <SearchIcon sx={{ color: 'var(--es-primary)', fontSize: 18, mr: 1 }} />
                  <input
                    type="text"
                    placeholder="Salon name or keyword..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      color: 'var(--es-on-surface)',
                      background: 'transparent',
                      width: '100%',
                      padding: '4px 0',
                    }}
                  />
                </div>
              </div>

              {/* Location input */}
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '6px' }}>
                <label className="font-label-caps" style={{ fontSize: '10px', color: 'var(--es-on-surface-variant)', opacity: 0.7 }}>Location</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--es-outline-variant)', borderRadius: '8px', padding: '6px 12px', background: 'var(--es-background)' }}>
                  <LocationOnOutlinedIcon sx={{ color: 'var(--es-primary)', fontSize: 18, mr: 1 }} />
                  <input
                    type="text"
                    placeholder="Paris, London..."
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      color: 'var(--es-on-surface)',
                      background: 'transparent',
                      width: '100%',
                      padding: '4px 0',
                    }}
                  />
                </div>
              </div>

              {/* Category input */}
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '6px' }}>
                <label className="font-label-caps" style={{ fontSize: '10px', color: 'var(--es-on-surface-variant)', opacity: 0.7 }}>Category</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--es-outline-variant)', borderRadius: '8px', padding: '8px 12px', background: 'var(--es-background)' }}>
                  <select
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      color: 'var(--es-on-surface)',
                      background: 'transparent',
                      width: '100%',
                      padding: '0',
                    }}
                  >
                    <option>All Specialities</option>
                    <option>Hair Artistry</option>
                    <option>Skin Rituals</option>
                    <option>Nails</option>
                    <option>Massage & Spa</option>
                  </select>
                </div>
              </div>

              {/* Search button */}
              <div style={{ paddingTop: '20px' }}>
                <button 
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #c7956c, #7f5532)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px 28px',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'transform 0.2s',
                  }}
                  className="es-search-btn-pill"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Suggestions dropdown list */}
            {showDropdown && filteredSalons.length > 0 && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '24px',
                  right: '24px',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 12px 40px rgba(127,85,50,0.12)',
                  border: '1px solid var(--es-outline-variant)',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  zIndex: 9999,
                  padding: '8px 0',
                  marginTop: '6px',
                  textAlign: 'left',
                }}
              >
                {filteredSalons.map((salon) => (
                  <div
                    key={salon.id || salon.salon_code}
                    onClick={() => handleSelectSalon(salon)}
                    style={{
                      padding: '12px 20px',
                      cursor: 'pointer',
                      borderBottom: '1px solid rgba(213, 195, 184, 0.3)',
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
                        color: 'var(--es-espresso)',
                        textTransform: 'capitalize',
                      }}
                    >
                      {salon.name}
                    </span>
                    <span 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        color: 'var(--es-on-surface-variant)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <LocationOnOutlinedIcon sx={{ fontSize: 13, color: 'var(--es-primary)', flexShrink: 0 }} />
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

          {/* Popular Tag Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginTop: '16px',
            }}
          >
            <span className="font-label-caps" style={{ fontSize: '10px', color: 'var(--es-on-surface-variant)', opacity: 0.6, letterSpacing: '0.15em' }}>Popular:</span>
            {['Manicure', 'Balayage', 'Facial', 'Bridal'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--es-outline-variant)',
                  borderRadius: '100px',
                  padding: '6px 16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'var(--es-on-surface-variant)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s ease',
                }}
                className="es-popular-tag-btn"
              >
                {tag}
              </button>
            ))}
          </motion.div>

          <style>{`
            .es-search-btn-pill:hover {
              transform: scale(0.96);
            }
            .es-popular-tag-btn:hover {
              background: var(--es-primary) !important;
              color: #ffffff !important;
              border-color: var(--es-primary) !important;
            }
            .search-suggestion-item:hover {
              background-color: rgba(199, 149, 108, 0.08) !important;
              padding-left: 26px !important;
            }
            .search-suggestion-item:last-child {
              border-bottom: none !important;
            }
            @media (max-width: 900px) {
              .salon-search-form {
                grid-template-columns: 1fr !important;
                gap: 12px !important;
              }
              .salon-search-form button {
                width: 100% !important;
                padding: 16px !important;
              }
              .salon-search-form div {
                width: 100% !important;
              }
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default SalonPageTop;
