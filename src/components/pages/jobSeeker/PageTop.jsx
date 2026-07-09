/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TuneIcon from '@mui/icons-material/Tune';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
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
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--es-background)',
        color: 'var(--es-espresso)',
        padding: '80px 24px 40px 24px',
      }}>
        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0',
          maxWidth: '760px',
          width: '100%',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-label-caps"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--es-primary)',
              marginBottom: '16px',
              letterSpacing: '0.15em',
            }}
          >
            <WorkOutlineOutlinedIcon sx={{ fontSize: 14, color: 'var(--es-primary)' }} />
            <span>Salon Career Platform</span>
          </motion.div>

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
            The <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Talent Directory</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              color: 'var(--es-on-surface-variant)',
              margin: '0 0 32px 0',
              lineHeight: 1.7,
              opacity: 0.85,
            }}
          >
            Connect with top salons across India. Browse professional artisan profiles or showcase your portfolio to take the next step in your career.
          </motion.p>

          {/* Add Profile CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '32px',
            }}
          >
            <button
              onClick={() => setModalOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #c7956c 0%, #7f5532 100%)',
                border: 'none',
                borderRadius: '100px',
                padding: '12px 32px',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 14px rgba(127, 85, 50, 0.2)',
              }}
              className="es-add-profile-btn"
            >
              Add Your Profile
            </button>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              border: '1px solid rgba(213, 195, 184, 0.5)',
              borderRadius: '100px',
              padding: '6px 8px 6px 24px',
              maxWidth: '520px',
              margin: '0 auto 40px',
              boxShadow: '0 15px 40px rgba(127, 85, 50, 0.05)',
            }}
          >
            <SearchIcon sx={{ color: 'var(--es-primary)', fontSize: 20, mr: 1 }} />
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearch && onSearch(searchValue.trim());
                }
              }}
              placeholder="Search by skill, role, or location..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: 'var(--es-espresso)',
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
                  color: 'var(--es-on-surface-variant)',
                  opacity: 0.6,
                  cursor: 'pointer',
                  fontSize: '18px',
                  lineHeight: 1,
                  padding: '0 8px 0 0',
                }}
                aria-label="Clear search"
              >✕</button>
            )}
            <button
              onClick={() => onSearch && onSearch(searchValue.trim())}
              style={{
                background: 'linear-gradient(135deg, #c7956c 0%, #7f5532 100%)',
                border: 'none',
                borderRadius: '100px',
                padding: '12px 28px',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}
            >
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
                onClick={() => {
                  setSearchValue(cat);
                  onSearch && onSearch(cat);
                }}
                style={{
                  background: searchValue === cat ? 'var(--es-surface-container)' : '#ffffff',
                  border: searchValue === cat ? '1px solid var(--es-primary)' : '1px solid rgba(213, 195, 184, 0.6)',
                  borderRadius: '100px',
                  padding: '8px 18px',
                  color: searchValue === cat ? 'var(--es-primary)' : 'var(--es-espresso)',
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
          background: var(--es-surface-container) !important;
          border-color: var(--es-primary) !important;
          color: var(--es-primary) !important;
        }
        .es-add-profile-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(127, 85, 50, 0.3) !important;
        }
      `}</style>
    </>
  );
};

export default PageTop;
