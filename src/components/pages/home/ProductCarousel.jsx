/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import React from 'react';
import { Box, Rating, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Custom styles
import './product-carousel.css';

// Image Imports
import botanicsImg from "../../assets/products/botanics.jpg"
import cleanserImg from "../../assets/products/cleanser.jpg"
import creamImg from "../../assets/products/cream.jpg"
import foundationImg from "../../assets/products/foundation.jpg"
import lorealImg from "../../assets/products/loreal.jpg"
import lotionImg from "../../assets/products/lotion.jpg"
import moisturiserImg from "../../assets/products/moisturiser.jpg"
import perfumeImg from "../../assets/products/perfume.jpg"

const products = [
  { 
    id: 1, 
    name: "Bonjour Nudista", 
    category: "L'Oreal Paris", 
    image: lorealImg, 
    rating: 4.5, 
    featured: true,
    discounted_price: 1299,
    original_price: 1899,
    discount_percent: 31,
    description: "L'Oreal Paris Bonjour Nudista skin tint hydrates and illuminates skin for a fresh, natural glow.",
    specification: "Volume: 30ml, Skin Type: Normal, Texture: Tinted Cream",
    stock_quantity: 10
  },
  { 
    id: 2, 
    name: "Rance 1795 perfume", 
    category: "Fragrance", 
    image: perfumeImg, 
    rating: 4.5, 
    featured: true,
    discounted_price: 6499,
    original_price: 8500,
    discount_percent: 23,
    description: "Rance 1795 perfume is a luxurious, highly refined classic fragrance with notes of jasmine, patchouli, and vanilla.",
    specification: "Volume: 100ml, Fragrance Type: Eau de Parfum, Origin: Italy",
    stock_quantity: 10
  },
  { 
    id: 3, 
    name: "Brown Sugar", 
    category: "Farmasi", 
    image: lotionImg, 
    rating: 4.5, 
    featured: false,
    discounted_price: 799,
    original_price: 1199,
    discount_percent: 33,
    description: "Farmasi Brown Sugar lotion deeply nourishes and leaves a comforting warm fragrance on your skin.",
    specification: "Volume: 200ml, Formulation: Body Lotion, Brand: Farmasi",
    stock_quantity: 10
  },
  { 
    id: 4, 
    name: "All Bright", 
    category: "Botanics", 
    image: botanicsImg, 
    rating: 4, 
    featured: true,
    discounted_price: 999,
    original_price: 1499,
    discount_percent: 33,
    description: "Botanics All Bright cleanser gently exfoliates to reveal a brighter, smoother, and radiant skin complexion.",
    specification: "Volume: 150ml, Ingredients: Hibiscus Extract, Cruelty Free: Yes",
    stock_quantity: 10
  },
  { 
    id: 5, 
    name: "Hydrating Cream", 
    category: "Skincare", 
    image: creamImg, 
    rating: 4, 
    featured: false,
    discounted_price: 1599,
    original_price: 2199,
    discount_percent: 27,
    description: "An intensive hydrating cream that locks in moisture for 24 hours, perfect for dry or sensitive skin.",
    specification: "Volume: 50ml, Skin Concern: Dryness, Category: Skincare Cream",
    stock_quantity: 10
  },
  { 
    id: 6, 
    name: "Skin Cleanser", 
    category: "Holy Grail", 
    image: cleanserImg, 
    rating: 4.5, 
    featured: true,
    discounted_price: 1199,
    original_price: 1699,
    discount_percent: 29,
    description: "Holy Grail Skin Cleanser removes makeup, dirt, and excess oil without stripping your natural moisture barrier.",
    specification: "Volume: 250ml, pH Balanced: Yes, Form: Foaming Wash",
    stock_quantity: 10
  },
  { 
    id: 7, 
    name: "Misolo Cosmetics", 
    category: "Moisturiser", 
    image: moisturiserImg, 
    rating: 4, 
    featured: false,
    discounted_price: 1899,
    original_price: 2499,
    discount_percent: 24,
    description: "Misolo Cosmetics Premium Moisturiser restores firmness and minimizes fine lines with advanced hyaluronic acid.",
    specification: "Volume: 60ml, Active Ingredients: Hyaluronic Acid, Brand: Misolo",
    stock_quantity: 10
  },
  { 
    id: 8, 
    name: "Foundation", 
    category: "Cosmetics", 
    image: foundationImg, 
    rating: 4.5, 
    featured: true,
    discounted_price: 2499,
    original_price: 3299,
    discount_percent: 24,
    description: "A flawless, full-coverage matte foundation that blends seamlessly and lasts all day without creasing.",
    specification: "Shade: Natural Beige, Coverage: Full, Finish: Matte",
    stock_quantity: 10
  }
];

const ProductCarousel = () => {
  const navigate = useNavigate();
  return (
    <Box component="section" className="product-section">
      <Box className="product-container">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="overline" 
              sx={{ color: 'var(--es-emerald)', letterSpacing: '0.3em', fontWeight: 600 }}
            >
              Our Collection
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontFamily: 'Playfair Display, serif', 
                fontSize: { xs: '32px', md: '48px' }, 
                color: '#1a1a1a',
                mt: 1
              }}
            >
              Premium Beauty Essentials
            </Typography>
          </motion.div>
        </Box>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={false}
          loop={true}
          speed={800}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            prevEl: '.product-prev',
            nextEl: '.product-next',
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className="product-swiper"
        >
          {products.map((product, index) => (
            <SwiperSlide key={product.id}>
              <motion.div
                className="product-card-wrapper"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="product-card">
                  <div className="product-image-container">
                    {product.featured && <span className="product-badge">Featured</span>}
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-image" 
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="quick-view-overlay">
                      <button 
                        className="btn-minimal"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/product/detail', { state: { details: { product, productImg: product.image } } });
                        }}
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                  
                  <div className="product-content">
                    <div className="product-header">
                      <p className="product-category">{product.category}</p>
                      <h3 className="product-title">{product.name}</h3>
                    </div>
                    
                    <div className="product-info">
                      <Rating 
                        name="product-rating" 
                        value={product.rating} 
                        precision={0.5} 
                        readOnly 
                        size="small"
                        sx={{ color: '#c7956c' }}
                      />
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="product-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/product/detail', { state: { details: { product, productImg: product.image } } });
                        }}
                        style={{ 
                          color: '#c7956c', 
                          fontSize: '12px', 
                          fontWeight: 600, 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.1em',
                          cursor: 'pointer'
                        }}
                      >
                        Explore Details
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="product-nav-btn product-prev">
          <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
        </div>
        <div className="product-nav-btn product-next">
          <ArrowForwardIosIcon sx={{ fontSize: 20, ml: 0.5 }} />
        </div>
      </Box>
    </Box>
  );
};

export default React.memo(ProductCarousel);
