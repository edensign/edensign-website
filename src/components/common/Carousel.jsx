import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './carousel.css';

const slides = [
  {
    label: 'Appointments',
    headingLight: 'Book Your',
    headingBold: 'Experience',
    subtext: 'Discover top-tier salon services tailored to your style and comfort.',
    cta: { text: 'Book Now', href: '/salons' },
    cta2: { text: 'Explore Salons', href: '/salons' },
    img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo1.jpg',
  },
  {
    label: 'Careers',
    headingLight: 'Grow',
    headingBold: 'With Us',
    subtext: 'Connect with leading salons and unlock new career opportunities.',
    cta: { text: 'Find Jobs', href: '/job-seeker' },
    cta2: { text: 'Learn More', href: '/about' },
    img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo2.jpg',
  },
  {
    label: 'Products',
    headingLight: 'Shop',
    headingBold: 'Premium Care',
    subtext: 'Explore professional-grade salon products for exceptional results.',
    cta: { text: 'Shop Now', href: '/products' },
    cta2: { text: 'View All', href: '/products' },
    img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo3.jpg',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const SlideContent = ({ slide }) => (
  <div className="es-slide-content">
    <div className="es-glass-card">
      <motion.span
        className="es-slide-label"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        key={slide.label + '-label'}
      >
        <span className="es-label-dot" /> {slide.label}
      </motion.span>

      <motion.h1
        className="es-slide-heading"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        key={slide.label + '-heading'}
      >
        <span className="es-heading-light">{slide.headingLight}</span>
        <span className="es-heading-bold">{slide.headingBold}</span>
      </motion.h1>

      <motion.p
        className="es-slide-subtext"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        key={slide.label + '-sub'}
      >
        {slide.subtext}
      </motion.p>

      <motion.div
        className="es-slide-ctas"
        custom={3}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        key={slide.label + '-ctas'}
      >
        <a href={slide.cta.href} className="es-btn-solid">
          {slide.cta.text}
        </a>
        <a href={slide.cta2.href} className="es-btn-outline">
          {slide.cta2.text}
        </a>
      </motion.div>
    </div>
  </div>
);

const Carousel = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="es-hero-wrapper">
      {/* Decorative Floating Geometric Elements */}
      <div className="es-hero-decor es-hero-ring-1" />
      <div className="es-hero-decor es-hero-ring-2" />

      <Swiper
        modules={[EffectFade, Autoplay, Pagination, Parallax]}
        effect="fade"
        parallax={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}"><span class="es-bullet-inner"></span></span>`,
        }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="es-hero-swiper"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="es-slide" data-swiper-parallax-opacity="0.5">
              <div className="es-slide-overlay-gradient" />
              <img
                src={slide.img}
                className="es-slide-img"
                alt={slide.label}
                data-swiper-parallax="20%"
                loading={idx === 0 ? "eager" : "lazy"}
                {...(idx === 0 ? { fetchpriority: "high" } : {})}
                decoding={idx === 0 ? "sync" : "async"}
              />
              {activeIndex === idx && <SlideContent slide={slide} />}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
