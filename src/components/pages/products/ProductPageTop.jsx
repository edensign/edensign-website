/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import productimage from '../../assets/productbg.webp';

const cities = ['Agra', 'Aligarh', 'Ayodhya', 'Amroha', 'Akbarpur'];

function ProductPageTop() {
  const [inputValue, setInputValue] = useState(null);

  const handleChange = (event, value) => {
    setInputValue(value);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '72vh',
      minHeight: '480px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <img
        src={productimage}
        alt="Shop"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: 'scale(1.04)',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,4,2,0.6) 0%, rgba(26,10,0,0.8) 60%, rgba(26,10,0,0.95) 100%)',
      }} />

      {/* Decorative rings */}
      {[480, 320].map((size, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          border: `1px solid rgba(199,149,108,${i === 0 ? 0.1 : 0.06})`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />
      ))}

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '700px',
        width: '100%',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(199,149,108,0.12)',
            border: '1px solid rgba(199,149,108,0.3)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '20px',
          }}
        >
          <StorefrontOutlinedIcon sx={{ fontSize: 13, color: '#c7956c' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c7956c' }}>
            Professional Beauty Products
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 14px',
            lineHeight: 1.1,
          }}
        >
          Shop <em style={{ fontStyle: 'italic', color: '#c7956c' }}>With Us</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            color: 'rgba(255,255,255,0.65)',
            margin: '0 0 36px',
            lineHeight: 1.7,
          }}
        >
          Curated salon-grade beauty products. Trusted by professionals, loved by clients.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.96)',
            borderRadius: '100px',
            padding: '6px 8px 6px 20px',
            maxWidth: '480px',
            margin: '0 auto',
            boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
          }}
        >
          <SearchIcon sx={{ color: '#c7956c', fontSize: 18, mr: 1 }} />
          <Autocomplete
            onChange={handleChange}
            options={cities}
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiInputBase-root': {
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#1a0f08',
                padding: '4px 0 !important',
              },
              '& .MuiInputLabel-root': { display: 'none' },
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Search products, brands..." variant="outlined" label="" />
            )}
          />
          <button style={{
            background: 'linear-gradient(135deg, #c7956c, #a8724d)',
            border: 'none',
            borderRadius: '100px',
            padding: '12px 24px',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            letterSpacing: '0.04em',
          }}>
            Search
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductPageTop;