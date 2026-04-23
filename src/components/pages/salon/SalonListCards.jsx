/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';

import API from '../../../apis';
import { setSalons } from '../../../redux/actions/SalonAction';

/* ── Skeleton card ── */
const SalonCardSkeleton = () => (
  <div style={{
    background: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(26,10,0,0.06)',
  }}>
    <div style={{ height: '280px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite' }} />
    <div style={{ padding: '24px' }}>
      <div style={{ height: '20px', borderRadius: '8px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite', marginBottom: '12px', width: '70%' }} />
      <div style={{ height: '14px', borderRadius: '6px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite', width: '45%' }} />
    </div>
  </div>
);

/* ── Empty state ── */
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      gridColumn: '1 / -1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px',
      textAlign: 'center',
    }}
  >
    <div style={{
      width: 80,
      height: 80,
      borderRadius: '24px',
      background: 'rgba(199,149,108,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
    }}>
      <ContentCutOutlinedIcon sx={{ fontSize: 36, color: '#c7956c' }} />
    </div>
    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#1a0f08', margin: '0 0 8px 0' }}>
      No Salons Found
    </h3>
    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#9a8070', margin: 0, maxWidth: '300px', lineHeight: 1.7 }}>
      Try adjusting your filters to discover more salons near you.
    </p>
  </motion.div>
);

/* ── Single salon card ── */
const SalonCard = React.memo(({ salon, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 20px 60px rgba(26,10,0,0.14)'
          : '0 4px 20px rgba(26,10,0,0.06)',
        transition: 'box-shadow 0.35s ease, transform 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        border: '1px solid rgba(199,149,108,0.1)',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
        <img
          src={salon.banner_image}
          alt={salon.name}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            display: 'block',
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(26,10,0,0.6) 0%, transparent 50%)',
        }} />

        {/* Type badge */}
        {salon.type && (
          <span style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'rgba(199,149,108,0.92)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '5px 12px',
            borderRadius: '100px',
          }}>
            {salon.type}
          </span>
        )}

        {/* Rating badge */}
        <div style={{
          position: 'absolute',
          bottom: '14px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '100px',
          padding: '4px 10px',
          backdropFilter: 'blur(10px)',
        }}>
          <StarIcon sx={{ fontSize: 13, color: '#F59E0B' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, color: '#1a0f08' }}>5.0</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px 24px' }}>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '20px',
          fontWeight: 600,
          color: '#1a0f08',
          margin: '0 0 8px 0',
          lineHeight: 1.2,
          textTransform: 'capitalize',
        }}>
          {salon.name}
        </h3>

        {(salon.landmark || salon.street) && (
          <p style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '6px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: '#9a8070',
            margin: '0 0 20px 0',
            lineHeight: 1.5,
          }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 15, color: '#c7956c', marginTop: '2px', flexShrink: 0 }} />
            {salon.landmark} {salon.street}
          </p>
        )}

        <Link
          to={`/salon/detail/${salon.salon_code}`}
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            color: '#c7956c',
            letterSpacing: '0.04em',
            padding: '10px 0',
            borderBottom: '1.5px solid rgba(199,149,108,0.3)',
            transition: 'gap 0.2s, border-color 0.2s',
          }}
          className="es-salon-cta"
        >
          View Salon
          <ArrowForwardIcon sx={{ fontSize: 15, transition: 'transform 0.2s' }} className="es-salon-cta-arrow" />
        </Link>
      </div>
    </motion.div>
  );
});

/* ── Main component ── */
const SalonListCards = ({ selectedCategory, selectedGender }) => {
  const dispatch = useDispatch();
  const { listData } = useSelector(state => state.allSalons);
  const [loading, setLoading] = React.useState(true);

  const getSalons = () => {
    setLoading(true);
    API.SalonAPI.getSalonList(selectedCategory, selectedGender)
      .then(res => {
        if (res.status === 'Success') {
          dispatch(setSalons({ listData: res.data, loading: false }));
        } else {
          dispatch(setSalons({ listData: [], loading: false }));
        }
        setLoading(false);
      })
      .catch(error => {
        dispatch(setSalons({ listData: [], loading: false }));
        setLoading(false);
        throw error;
      });
  };

  React.useEffect(() => {
    getSalons();
  }, [selectedCategory, selectedGender]);

  return (
    <>
      <style>{`
        .es-salon-cta:hover { gap: 14px !important; border-color: #c7956c !important; }
        .es-salon-cta:hover .es-salon-cta-arrow { transform: translateX(4px); }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 900px) { .es-salon-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 580px) { .es-salon-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <section style={{ padding: '72px 5% 100px', background: '#f8fafc' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}
        >
          <div>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#c7956c',
              display: 'block',
              marginBottom: '8px',
            }}>
              Browse All
            </span>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: '#1a0f08',
              margin: 0,
              lineHeight: 1.15,
            }}>
              Featured <em style={{ fontStyle: 'italic', color: '#c7956c' }}>Salons</em>
            </h2>
          </div>
          {!loading && listData?.length > 0 && (
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#9a8070',
              background: '#fff',
              border: '1px solid rgba(199,149,108,0.2)',
              padding: '8px 20px',
              borderRadius: '100px',
            }}>
              {listData.length} salons found
            </span>
          )}
        </motion.div>

        {/* Grid */}
        <div
          className="es-salon-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
          }}
        >
          {loading
            ? Array.from({ length: 6 }, (_, i) => <SalonCardSkeleton key={i} />)
            : listData?.length > 0
              ? listData.map((salon, index) => (
                <SalonCard key={index} salon={salon} index={index} />
              ))
              : <EmptyState />
          }
        </div>
      </section>
    </>
  );
};

export default SalonListCards;
