/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useRef, useCallback } from 'react';
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

const PAGE_SIZE = 9; // salons per batch

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

/* ── Single salon card — entire card is a Link ── */
const SalonCard = React.memo(({ salon, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hovered, setHovered] = React.useState(false);

  // Derive tags visually based on properties or type to look like the stitch template
  const tags = salon.type === 'Male' ? ['HAIR', 'BARBER'] : salon.type === 'Female' ? ['HAIR', 'SPA'] : ['HAIR', 'SALON'];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: 'easeOut' }}
    >
      <Link
        to={`/salon/detail/${salon.salon_code}`}
        style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: hovered
              ? '0 20px 45px rgba(127, 85, 50, 0.12)'
              : '0 8px 30px rgba(127, 85, 50, 0.04)',
            transition: 'all 0.35s ease',
            transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
            border: '1px solid rgba(213, 195, 184, 0.5)',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
            <img
              src={salon.front_image || salon.banner_image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
              alt={salon.name}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transform: hovered ? 'scale(1.08)' : 'scale(1)',
                display: 'block',
              }}
            />
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(31, 27, 24, 0.4) 0%, transparent 60%)',
            }} />

            {/* Rating badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255,255,255,0.92)',
              borderRadius: '100px',
              padding: '4px 10px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 12px rgba(31,27,24,0.08)',
            }}>
              <StarIcon sx={{ fontSize: 13, color: '#F59E0B' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, color: 'var(--es-espresso)' }}>
                {salon.rating ? parseFloat(salon.rating).toFixed(1) : '4.5'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '20px',
              fontWeight: 600,
              color: 'var(--es-espresso)',
              margin: 0,
              lineHeight: 1.25,
              textTransform: 'capitalize',
            }}>
              {salon.name}
            </h3>

            {(salon.landmark || salon.street || salon.distance !== undefined) && (
              <p style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '6px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: 'var(--es-on-surface-variant)',
                margin: 0,
                lineHeight: 1.5,
              }}>
                <LocationOnOutlinedIcon sx={{ fontSize: 15, color: 'var(--es-primary)', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ opacity: 0.85 }}>
                  {salon.landmark} {salon.street}
                  {salon.distance !== null && salon.distance !== undefined && (
                    <strong style={{ color: 'var(--es-primary)', marginLeft: '8px' }}>
                      ({parseFloat(salon.distance).toFixed(1)} km away)
                    </strong>
                  )}
                </span>
              </p>
            )}

            {/* Tag Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
              {tags.map(tag => (
                <span 
                  key={tag}
                  className="font-label-caps"
                  style={{
                    fontSize: '9px',
                    color: 'var(--es-on-surface-variant)',
                    background: 'var(--es-surface-container)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    letterSpacing: '0.08em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View Details Button matching stitch design */}
            <div style={{ marginTop: '12px', borderTop: '1px solid rgba(213, 195, 184, 0.4)', paddingTop: '16px', textAlign: 'center' }}>
              <span
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 24px',
                  borderRadius: '4px',
                  border: '1px solid var(--es-outline)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  background: hovered ? 'var(--es-espresso)' : 'transparent',
                  color: hovered ? '#ffffff' : 'var(--es-espresso)',
                  transition: 'all 0.3s ease',
                }}
              >
                View Details
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

/* ── Main component ── */
const SalonListCards = ({ 
  selectedCategory, 
  selectedGender, 
  selectedCity, 
  selectedRating, 
  latitude, 
  longitude, 
  onCityDetected 
}) => {
  const dispatch = useDispatch();
  const { listData } = useSelector(state => state.allSalons);
  const [allSalonsRaw, setAllSalonsRaw] = React.useState([]);
  const [allSalons, setAllSalons] = React.useState([]);
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);

  // IntersectionObserver sentinel ref for infinite scroll
  const sentinelRef = useRef(null);

  const getSalons = () => {
    setLoading(true);
    setVisibleCount(PAGE_SIZE);
    API.SalonAPI.getSalonList(
      selectedCategory, 
      selectedGender, 
      selectedCity, 
      selectedRating, 
      latitude, 
      longitude
    )
      .then(res => {
        if (res.status === 'Success') {
          const rawData = Array.isArray(res.data) ? res.data : [];
          setAllSalonsRaw(rawData);

          // Client-side strict gender filter: Male→only male, Female→only female, All→all (incl. unisex)
          const filtered = selectedGender
            ? rawData.filter(s => s.type === selectedGender)
            : rawData;

          dispatch(setSalons({ listData: filtered, loading: false }));
          setAllSalons(filtered);

          // Auto-detect city from first result when no city manually selected
          if (!selectedCity && latitude && longitude && filtered.length > 0) {
            const firstSalon = filtered[0];
            if (firstSalon.city_id && firstSalon.city_name) {
              onCityDetected && onCityDetected({ id: firstSalon.city_id, name: firstSalon.city_name });
            }
          }
        } else {
          dispatch(setSalons({ listData: [], loading: false }));
          setAllSalonsRaw([]);
          setAllSalons([]);
        }
        setLoading(false);
      })
      .catch(error => {
        dispatch(setSalons({ listData: [], loading: false }));
        setAllSalonsRaw([]);
        setAllSalons([]);
        setLoading(false);
        throw error;
      });
  };

  // Re-apply client-side gender filter whenever selectedGender changes without re-fetching
  React.useEffect(() => {
    if (allSalonsRaw.length > 0) {
      const filtered = selectedGender
        ? allSalonsRaw.filter(s => s.type === selectedGender)
        : allSalonsRaw;
      setAllSalons(filtered);
      setVisibleCount(PAGE_SIZE);
    }
  }, [selectedGender]);

  React.useEffect(() => {
    getSalons();
  }, [selectedCategory, selectedCity, selectedRating, latitude, longitude]);

  // Infinite scroll observer
  const handleSentinel = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !loadingMore && !loading) {
      if (visibleCount < allSalons.length) {
        setLoadingMore(true);
        // Simulate a small delay for a smooth loader appearance
        setTimeout(() => {
          setVisibleCount(prev => Math.min(prev + PAGE_SIZE, allSalons.length));
          setLoadingMore(false);
        }, 600);
      }
    }
  }, [loadingMore, loading, visibleCount, allSalons.length]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(handleSentinel, { threshold: 0.1 });
    const el = sentinelRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [handleSentinel]);

  const visibleSalons = allSalons.slice(0, visibleCount);
  const hasMore = visibleCount < allSalons.length;

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 900px) { .es-salon-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 580px) { .es-salon-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <section style={{ padding: '72px 5% 100px', background: 'var(--es-background)' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}
        >
          <div>
            <span className="font-label-caps" style={{
              fontSize: '11px',
              color: 'var(--es-primary)',
              display: 'block',
              marginBottom: '8px',
            }}>
              Browse All
            </span>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 600,
              color: 'var(--es-espresso)',
              margin: 0,
              lineHeight: 1.15,
            }}>
              Featured <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Salons</span>
            </h2>
          </div>
          {!loading && allSalons.length > 0 && (
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--es-on-surface-variant)',
              background: '#ffffff',
              border: '1px solid var(--es-outline-variant)',
              padding: '8px 20px',
              borderRadius: '100px',
              boxShadow: '0 4px 12px rgba(127, 85, 50, 0.04)',
            }}>
              {visibleCount < allSalons.length
                ? `Showing ${visibleCount} of ${allSalons.length} salons`
                : `${allSalons.length} salons found`}
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
            : visibleSalons.length > 0
              ? visibleSalons.map((salon, index) => (
                <SalonCard key={salon.salon_code || index} salon={salon} index={index} />
              ))
              : <EmptyState />
          }

          {/* Inline skeleton batch loader when loading more */}
          {loadingMore && Array.from({ length: 3 }, (_, i) => (
            <SalonCardSkeleton key={`more-${i}`} />
          ))}
        </div>

        {/* Sentinel element — triggers infinite scroll */}
        {!loading && hasMore && (
          <div ref={sentinelRef} style={{ height: '80px', marginTop: '24px' }} />
        )}

        {/* End of list indicator */}
        {!loading && !hasMore && allSalons.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              textAlign: 'center',
              marginTop: '48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div style={{ width: '48px', height: '2px', background: 'linear-gradient(90deg, transparent, #c7956c, transparent)' }} />
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#9a8070',
              margin: 0,
            }}>
              You've seen all {allSalons.length} salons
            </p>
          </motion.div>
        )}
      </section>
    </>
  );
};

export default SalonListCards;
