/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import TuneIcon from '@mui/icons-material/Tune';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';

import { setFilterOpen } from '../../../redux/actions/FilterAction';
import SalonBg from '../../assets/salonbg.jpg';

const SalonPageTop = () => {
  const [buttonText, setButtonText] = useState('Filter');
  const filterOpen = useSelector(state => state.filterOpen);
  const dispatch = useDispatch();

  const handleClick = () => {
    const box = document.getElementsByClassName('filter-btn-box')[0];
    const btn = document.getElementsByClassName('filter-open-btn')[0];
    const filterBox = document.getElementById('filter-box');
    const arrowIcon = document.getElementById('arrow-icon');

    dispatch(setFilterOpen(!filterOpen.filterOpen));
    setButtonText(filterOpen.filterOpen ? 'Filter' : '');

    box.style.right = filterOpen.filterOpen ? '0' : '21%';
    box.style.transform = filterOpen.filterOpen ? 'translateX(0)' : 'matrix(1, 0, 0, 1, 0, 0)';
    btn.style.width = filterOpen.filterOpen ? '7em' : '4em';
    btn.style.padding = filterOpen.filterOpen ? '10px 50px' : '9px 0px 9px 4px';
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
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.96)',
              borderRadius: '100px',
              padding: '6px 8px 6px 24px',
              maxWidth: '520px',
              margin: '0 auto',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <SearchIcon sx={{ color: '#c7956c', fontSize: 20, mr: 1 }} />
            <input
              type="text"
              placeholder="Search by salon name or city..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#1a0f08',
                background: 'transparent',
                padding: '10px 0',
              }}
            />
            <button style={{
              background: 'linear-gradient(135deg, #c7956c, #a8724d)',
              border: 'none',
              borderRadius: '100px',
              padding: '12px 28px',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
              transition: 'box-shadow 0.2s',
            }}>
              Search
            </button>
          </motion.div>
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

      {/* Filter toggle button — keep existing DOM logic */}
      <div className="filter-btn-box" onClick={handleClick} style={{
        position: 'fixed',
        top: '40%',
        right: '0',
        zIndex: '10',
        transform: 'translateX(0)',
        transition: 'all .5s cubic-bezier(0.77, 0, 0.175, 1)',
      }}>
        <button
          className="filter-open-btn"
          title="Show Filters"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #1a0a00, #3d1e0a)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: '10px 0 0 10px',
            width: '7em',
            padding: '10px 50px',
            transition: 'all .15s ease',
            boxShadow: '-4px 4px 16px rgba(26,10,0,0.3)',
          }}
        >
          <ArrowBackIcon id="arrow-icon" sx={{ fontSize: 16, transition: 'transform 0.3s' }} />
          <TuneIcon sx={{ fontSize: 16 }} />
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default SalonPageTop;
