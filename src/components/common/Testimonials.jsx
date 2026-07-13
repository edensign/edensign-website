/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import StarIcon from '@mui/icons-material/Star';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import API from '../../apis';

const Testimonials = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [dbReviews, setDbReviews] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const loadDynamicReviews = async () => {
      try {
        const response = await API.ReviewAPI.getWebsiteReviews();
        if (!isMounted) return;
        if (response.status === 'Success' && response.data && Array.isArray(response.data.rows)) {
          setDbReviews(response.data.rows);
        }
      } catch (err) {
        console.error('Failed to load dynamic website reviews:', err);
      }
    };

    loadDynamicReviews();
    return () => { isMounted = false; };
  }, []);

  // Map database reviews to carousel card objects
  const carouselItems = dbReviews.map(review => {
    const scores = [
      review.ease_of_use,
      review.design_aesthetics,
      review.speed_performance,
      review.booking_process,
      review.overall_experience,
    ].filter(val => val !== undefined && val !== null && val > 0);

    const avgRating = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 5;

    return {
      id: review.id,
      name: review.customer?.username || 'Verified Client',
      role: 'User',
      rating: avgRating,
      text: review.comments || review.reason || 'Excellent service and experience!',
    };
  });

  // Default fallback
  const displayCarouselItems = carouselItems.length > 0 ? carouselItems : [
    {
      id: 0,
      name: 'Eden Sign Guest',
      role: 'Website Experience',
      rating: 5,
      text: 'We are currently gathering experience reviews to improve our booking portal. Submit your website feedback below to see it featured here dynamically!',
    },
  ];

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    if (parts[0].length >= 2) return parts[0].substring(0, 2).toUpperCase();
    return parts[0].substring(0, 1).toUpperCase();
  };

  return (
    <section ref={ref} className="es-testimonials-section">
      <motion.div
        className="es-section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="es-eyebrow">The Circle Speaks</span>
        <h2 className="es-section-title">
          Trusted by owners, artisans,{' '}
          <em>and the people they serve.</em>
        </h2>
        <div className="es-title-divider" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="es-testimonials-swiper-wrapper"
      >
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          loop={displayCarouselItems.length > 1}
          breakpoints={{
            0:    { slidesPerView: 1, spaceBetween: 24 },
            768:  { slidesPerView: 2, spaceBetween: 32 },
            1200: { slidesPerView: 2, spaceBetween: 40 },
          }}
          className="es-testimonials-swiper"
        >
          {displayCarouselItems.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="es-testimonial-card">
                {/* Sparkle accent */}
                <AutoAwesomeIcon
                  sx={{ fontSize: 22, color: 'var(--es-rose-gold)', opacity: 0.7, mb: '4px' }}
                />

                {/* Stars */}
                <div className="es-testimonial-stars">
                  {[...Array(t.rating)].map((_, si) => (
                    <StarIcon key={si} sx={{ fontSize: 16, color: '#c7956c' }} />
                  ))}
                </div>

                {/* Quote text */}
                <p className="es-testimonial-text">"{t.text}"</p>

                {/* Author */}
                <div className="es-testimonial-author">
                  <div
                    className="es-testimonial-avatar"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #1a0a00, #3d1e0a)',
                      color: '#c7956c',
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '17px',
                      fontWeight: 700,
                    }}
                  >
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <span className="es-testimonial-name">{t.name}</span>
                    <span className="es-testimonial-role">{t.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default Testimonials;
