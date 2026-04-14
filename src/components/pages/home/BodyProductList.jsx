/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import DiamondIcon from '@mui/icons-material/Diamond';
import ProductCarousel from './ProductCarousel';

const ProductList = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="es-products-section">
      <motion.div
        className="es-section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="es-eyebrow">Handpicked For You</span>
        <h2 className="es-section-title">Top Branded <em>Products</em></h2>
        <div className="es-title-divider" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ProductCarousel />
      </motion.div>
    </section>
  );
};

export default ProductList;
