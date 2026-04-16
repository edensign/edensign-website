/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const testimonials = [
  {
    name: 'John Doe',
    role: 'Regular Client',
    rating: 5,
    text: "I absolutely love this platform! Booking salon appointments has never been easier. The user-friendly interface and seamless process save me so much time. Plus, the variety of salons and services available is amazing. Highly recommend it to anyone who values convenience and quality!",
    img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo1.jpg',
  },
  {
    name: 'Esra Bilgic',
    role: 'Beauty Enthusiast',
    rating: 5,
    text: "This platform is a game-changer for both customers and salon professionals. I booked my appointment in just a few clicks, and everything went perfectly. The added features like job opportunities and access to professional products make it stand out. Truly an all-in-one solution!",
    img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo2.jpg',
  },
  {
    name: 'Davis Morey',
    role: 'Salon Owner',
    rating: 5,
    text: "This platform has completely transformed how I manage my salon's bookings. It's so easy for clients to find us, check availability, and book instantly. The experience is smooth, reliable, and stress-free. I couldn't ask for a better way to run my business!",
    img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo3.jpg',
  },
  {
    name: 'Sofia Ramirez',
    role: 'Stylist',
    rating: 5,
    text: "As a stylist, Eden Sign has helped me reach more clients than ever. The platform is beautifully designed and incredibly easy to use. My bookings have increased significantly since joining, and clients always come in happy and prepared.",
    img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo1.jpg',
  },
];

const Testimonials = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="es-testimonials-section">
      <motion.div
        className="es-section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="es-eyebrow">Happy Clients</span>
        <h2 className="es-section-title">What People <em>Say</em></h2>
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
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          loop
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 24 },
            768: { slidesPerView: 2, spaceBetween: 32 },
            1200: { slidesPerView: 2, spaceBetween: 40 },
          }}
          className="es-testimonials-swiper"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="es-testimonial-card">
                <FormatQuoteIcon className="es-quote-icon" />
                <div className="es-testimonial-stars">
                  {[...Array(t.rating)].map((_, si) => (
                    <StarIcon key={si} sx={{ fontSize: 16, color: '#c7956c' }} />
                  ))}
                </div>
                <p className="es-testimonial-text">{t.text}</p>
                <div className="es-testimonial-author">
                  <img src={t.img} alt={t.name} className="es-testimonial-avatar" />
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
