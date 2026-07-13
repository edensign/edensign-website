/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import SearchIcon from '@mui/icons-material/Search';

import { setFilterOpen } from '../../../redux/actions/FilterAction';
import AddJobSeekerModal from './AddJobSeekerModal';

const jobCategories = [
  'Hair Stylist', 'Makeup Artist', 'Nail Tech', 'Receptionist', 'Bridal Artist',
];

const PageTop = ({ onSearch, skills = [], onProfileAdded }) => {
  const [buttonText, setButtonText] = useState('Filter');
  const [searchValue, setSearchValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(null);
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
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        overflow: 'hidden',
        background: 'var(--es-cream)',
        color: 'var(--es-charcoal)',
        padding: '96px 5% 40px 5%',
      }}>
        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'left',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
        }}>
          {/* Label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'var(--es-emerald-soft)',
            marginBottom: '20px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--es-emerald-soft)' }} />
            Salon Career Platform
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            fontSize: 'clamp(40px, 6vw, 76px)',
            fontWeight: 400,
            color: 'var(--es-charcoal)',
            margin: '0 0 24px 0',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            The <em style={{ fontStyle: 'italic', color: 'var(--es-emerald)', fontWeight: '400' }}>Talent</em> Directory.
          </h1>

          {/* Paragraph */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: 'var(--es-charcoal-60)',
            lineHeight: '1.7',
            maxWidth: '680px',
            margin: '0 0 40px 0',
          }}>
            Connect with the world's most desirable salons. Browse artisan portfolios, or add your own to take the next step in a beautiful career.
          </p>

          {/* Search bar inside container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#ffffff',
            border: '1px solid rgba(26, 21, 18, 0.08)',
            borderRadius: '100px',
            padding: '8px 8px 8px 24px',
            maxWidth: '900px',
            width: '100%',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)',
            boxSizing: 'border-box'
          }}>
            <SearchIcon sx={{ color: 'var(--es-charcoal-60)', opacity: 0.6, fontSize: 20, mr: 1.5 }} />
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onSearch && onSearch(e.target.value);
              }}
              placeholder="Search talent, cities, skills..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                color: 'var(--es-charcoal)',
                background: 'transparent',
                padding: '10px 0',
              }}
            />
            {searchValue && (
              <button
                onClick={() => { setSearchValue(''); onSearch && onSearch(''); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--es-charcoal-60)',
                  opacity: 0.6,
                  cursor: 'pointer',
                  fontSize: '18px',
                  lineHeight: 1,
                  padding: '0 12px 0 0',
                }}
                aria-label="Clear search"
              >✕</button>
            )}
            <button
              onClick={() => setModalOpen(true)}
              style={{
                background: 'var(--es-emerald)',
                border: 'none',
                borderRadius: '100px',
                padding: '12px 28px',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
              className="es-add-profile-btn-hero"
            >
              Add your profile <span style={{ fontSize: '16px' }}>→</span>
            </button>
          </div>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'flex-start',
              marginTop: '24px'
            }}
          >
            {jobCategories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                onClick={() => {
                  setSearchValue(cat);
                  onSearch && onSearch(cat);
                }}
                style={{
                  background: searchValue === cat ? 'rgba(15, 93, 78, 0.06)' : '#ffffff',
                  border: searchValue === cat ? '1px solid var(--es-emerald)' : '1px solid rgba(15, 93, 78, 0.15)',
                  borderRadius: '100px',
                  padding: '8px 18px',
                  color: searchValue === cat ? 'var(--es-emerald)' : 'var(--es-charcoal)',
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

      <AddJobSeekerModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        skills={skills}
        onSuccess={onProfileAdded}
      />

      <style>{`
        .es-job-cat-pill:hover {
          background: rgba(15, 93, 78, 0.06) !important;
          border-color: var(--es-emerald) !important;
          color: var(--es-emerald) !important;
        }
        .es-add-profile-btn-hero:hover {
          background: var(--es-emerald-soft) !important;
        }
      `}</style>
    </>
  );
};

export default PageTop;
