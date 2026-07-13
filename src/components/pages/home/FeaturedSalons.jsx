/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import API from '../../../apis';

const staticSalons = [
  {
    name: "Aurelia Studio",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=640&auto=format&fit=crop",
    location: "Manhattan, NY",
    tag: "Hair & Scalp Therapy",
    rating: "4.9",
    price: "from $180",
    salon_code: "aurelia-studio"
  },
  {
    name: "The Rosewood Lounge",
    img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=640&auto=format&fit=crop",
    location: "London, UK",
    tag: "Holistic Skin Wellness",
    rating: "5.0",
    price: "from £220",
    salon_code: "rosewood-lounge"
  },
  {
    name: "Lumière Collective",
    img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=640&auto=format&fit=crop",
    location: "Paris, FR",
    tag: "Editorial Hair Styling",
    rating: "4.8",
    price: "from €160",
    salon_code: "lumiere-collective"
  },
];

const FeaturedSalons = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const navigate = useNavigate();
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    API.SalonAPI.getSalonList(['Featured'])
      .then(res => {
        if (isMounted) {
          if (res.status === 'Success' && Array.isArray(res.data) && res.data.length > 0) {
            const mapped = res.data.map(s => ({
              name: s.name,
              img: s.front_image || s.banner_image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=640&auto=format&fit=crop",
              location: s.landmark ? `${s.landmark}, ${s.street || ''}` : s.area || "Nearby",
              tag: s.type === 'Male' ? "Hair & Barber" : s.type === 'Female' ? "Hair & Spa" : "Hair & Scalp Therapy",
              rating: s.rating ? parseFloat(s.rating).toFixed(1) : "4.5",
              price: s.booking_fee ? `Booking Fee ₹${s.booking_fee}` : "from ₹100",
              salon_code: s.salon_code
            }));
            
            let combined = [...mapped];
            if (combined.length < 3) {
              const needed = 3 - combined.length;
              combined = [...combined, ...staticSalons.slice(0, needed)];
            }
            setSalons(combined.slice(0, 3));
          } else {
            setSalons(staticSalons);
          }
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Failed to fetch featured salons:", err);
        if (isMounted) {
          setSalons(staticSalons);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <section ref={ref} className="es-featured-salons-section" id="salons">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Row */}
        <motion.div
          className="es-ecosystem-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className="es-ecosystem-header-inner">
            <span className="es-eyebrow">Curated Destinations</span>
            <h2 className="es-section-title" style={{ marginBottom: 0 }}>
              The finest salons, <em>vetted for you.</em>
            </h2>
          </div>
          <button
            onClick={() => navigate('/salons')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--es-charcoal)',
              borderBottom: '1px solid rgba(26, 21, 18, 0.2)',
              paddingBottom: '4px',
              transition: 'color 0.25s, border-color 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--es-emerald)';
              e.currentTarget.style.borderColor = 'var(--es-emerald)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--es-charcoal)';
              e.currentTarget.style.borderColor = 'rgba(26, 21, 18, 0.2)';
            }}
          >
            View all salons <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </button>
        </motion.div>

        {/* Salons Grid */}
        <div className="es-salons-grid">
          {salons.map((s, i) => (
            <motion.article
              key={s.name}
              className="es-salon-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.15, ease: 'easeOut' }}
            >
              <div className="es-salon-img-wrap" style={{ cursor: 'pointer' }} onClick={() => navigate(`/salon/detail/${s.salon_code}`)}>
                <img src={s.img} alt={s.name} className="es-salon-img" loading="lazy" />
                <span className="es-salon-badge">Verified</span>
              </div>
              <div className="es-salon-content">
                <div className="es-salon-header-row">
                  <h3 className="es-salon-name" style={{ cursor: 'pointer' }} onClick={() => navigate(`/salon/detail/${s.salon_code}`)}>
                    {s.name}
                  </h3>
                  <span className="es-salon-rating">
                    <StarIcon sx={{ fontSize: 13 }} /> {s.rating}
                  </span>
                </div>
                <p className="es-salon-meta">
                  {s.location} · {s.tag}
                </p>
                <div className="es-salon-footer">
                  <span className="es-salon-price">{s.price}</span>
                  <button
                    onClick={() => navigate(`/salon/detail/${s.salon_code}`)}
                    className="es-book-btn"
                  >
                    Book Experience
                  </button>                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSalons;
