/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TuneIcon from '@mui/icons-material/Tune';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';

import { setFilterOpen } from '../../../redux/actions/FilterAction';

const jobCategories = [
  'Hair Stylist', 'Makeup Artist', 'Nail Tech', 'Receptionist', 'Bridal Artist',
];

const PageTop = () => {
  const [buttonText, setButtonText] = useState('Filter');
  const filterOpen = useSelector(state => state.filterOpen);
  const dispatch = useDispatch();

  const handleClick = () => {
    const box = document.getElementsByClassName('filter-btn-box')[0];
    const btn = document.getElementsByClassName('filter-open-btn')[0];
    const filterBox = document.getElementById('filter-box');
    const arrowicon = document.getElementById('arrowicon');

    dispatch(setFilterOpen(!filterOpen.filterOpen));
    setButtonText(filterOpen.filterOpen ? 'Filter' : '');

    box.style.right = filterOpen.filterOpen ? '0' : '27%';
    box.style.transform = filterOpen.filterOpen ? 'translateX(0)' : 'matrix(1, 0, 0, 1, 0, 0)';
    btn.style.width = filterOpen.filterOpen ? '7em' : '4em';
    btn.style.padding = filterOpen.filterOpen ? '10px 50px' : '9px 0px 9px 4px';
    filterBox.style.opacity = filterOpen.filterOpen ? '0' : '1';
    filterBox.style.transform = filterOpen.filterOpen ? 'translateX(100%)' : 'translateX(0)';
    if (arrowicon) arrowicon.style.transform = filterOpen.filterOpen ? '' : 'rotate(180deg)';
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
      {/* Hero */}
      <div style={{
        position: 'relative',
        minHeight: '80vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0d0500 0%, #1a0a00 40%, #2d1200 70%, #1a0a00 100%)',
        color: '#fff',
      }}>
        {/* Decorative circles */}
        {[500, 350, 200].map((size, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            border: `1px solid rgba(199,149,108,${0.06 + i * 0.03})`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />
        ))}

        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(199,149,108,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '80px 24px 60px',
          maxWidth: '760px',
          width: '100%',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(199,149,108,0.12)',
              border: '1px solid rgba(199,149,108,0.3)',
              borderRadius: '100px',
              padding: '6px 16px',
              marginBottom: '24px',
            }}
          >
            <WorkOutlineOutlinedIcon sx={{ fontSize: 14, color: '#c7956c' }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c7956c',
            }}>
              Salon Career Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 700,
              color: '#fff',
              margin: '0 0 16px 0',
              lineHeight: 1.1,
            }}
          >
            Find Your Dream{' '}
            <em style={{ fontStyle: 'italic', color: '#c7956c' }}>Salon Career</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.6)',
              margin: '0 0 40px 0',
              lineHeight: 1.7,
            }}
          >
            Connect with top salons across India. Browse talent profiles and take the next step in your beauty career.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(199,149,108,0.3)',
              borderRadius: '100px',
              padding: '6px 8px 6px 24px',
              maxWidth: '520px',
              margin: '0 auto 40px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <SearchIcon sx={{ color: '#c7956c', fontSize: 20, mr: 1 }} />
            <input
              type="text"
              placeholder="Search by skill, role, or location..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#fff',
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
              whiteSpace: 'nowrap',
            }}>
              Search
            </button>
          </motion.div>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            {jobCategories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(199,149,108,0.25)',
                  borderRadius: '100px',
                  padding: '8px 18px',
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  letterSpacing: '0.03em',
                }}
                className="es-job-cat-pill"
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Filter toggle — keep original DOM logic */}
      <div
        className="filter-btn-box"
        onClick={handleClick}
        style={{
          position: 'fixed',
          top: '40%',
          right: '0',
          zIndex: 10,
          transform: 'translateX(0)',
          transition: 'all .5s cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        <button
          className="filter-open-btn"
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
          <ArrowBackIcon id="arrowicon" sx={{ fontSize: 16, transition: 'transform 0.3s' }} />
          <TuneIcon sx={{ fontSize: 16 }} />
          {buttonText}
        </button>
      </div>

      <style>{`
        .es-job-cat-pill:hover {
          background: rgba(199,149,108,0.15) !important;
          border-color: rgba(199,149,108,0.5) !important;
          color: #c7956c !important;
        }
      `}</style>
    </>
  );
};

export default PageTop;
