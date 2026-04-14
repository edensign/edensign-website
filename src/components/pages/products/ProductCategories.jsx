/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider, Checkbox } from '@mui/material';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';

import ProductCard from './ProductCard';

const categories = [
  { name: 'Fragrance', sub: [] },
  { name: 'Makeup', sub: ['Eye Palettes', 'Hair Health', 'Lips Gloss'] },
  { name: 'Skincare', sub: [] },
  { name: 'Hair Care', sub: [] },
];

const colors = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'Brown', hex: '#8e5c36' },
  { name: 'Rose', hex: '#dd1c1c' },
];

const capacities = ['30mL', '40mL', '50mL', '100mL'];

const brands = ['Aerin', 'Fable & Mane', 'L\'Oréal', 'MAC', 'Schwarzkopf', 'Eden Signature'];

const FilterSection = ({ title, icon: Icon, children }) => (
  <div style={{ marginBottom: '28px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid rgba(199,149,108,0.12)' }}>
      <Icon sx={{ fontSize: 15, color: '#c7956c' }} />
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3d1e0a' }}>
        {title}
      </span>
    </div>
    {children}
  </div>
);

function ProductCategories() {
  const [value, setValue] = useState([10, 150]);
  const [activeCategory, setActiveCategory] = useState('');
  const [activeCapacities, setActiveCapacities] = useState([]);
  const [activeBrands, setActiveBrands] = useState([]);
  const minDistance = 1;

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const toggleCapacity = (cap) => {
    setActiveCapacities(prev =>
      prev.includes(cap) ? prev.filter(c => c !== cap) : [...prev, cap]
    );
  };

  return (
    <div style={{ display: 'flex', gap: '0', background: '#f8fafc', minHeight: '100vh' }}>
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '240px',
          flexShrink: 0,
          background: '#fff',
          padding: '32px 24px',
          borderRight: '1px solid rgba(199,149,108,0.1)',
          position: 'sticky',
          top: '72px',
          height: 'fit-content',
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto',
        }}
        className="es-product-sidebar"
      >
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '18px',
          fontWeight: 700,
          color: '#1a0f08',
          margin: '0 0 28px 0',
          paddingBottom: '16px',
          borderBottom: '2px solid rgba(199,149,108,0.2)',
        }}>
          Filter Products
        </h2>

        {/* Categories */}
        <FilterSection title="Category" icon={StorefrontOutlinedIcon}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {categories.map(({ name, sub }) => (
              <div key={name}>
                <button
                  onClick={() => setActiveCategory(activeCategory === name ? '' : name)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: activeCategory === name ? 'rgba(199,149,108,0.1)' : 'none',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: activeCategory === name ? 600 : 400,
                    color: activeCategory === name ? '#c7956c' : '#3d1e0a',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {name}
                </button>
                {sub.length > 0 && activeCategory === name && (
                  <div style={{ paddingLeft: '12px' }}>
                    {sub.map(s => (
                      <button key={s} style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        padding: '6px 12px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: '#9a8070',
                        cursor: 'pointer',
                      }}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Price */}
        <FilterSection title="Price Range" icon={LocalOfferOutlinedIcon}>
          <Slider
            max={500}
            disableSwap
            size="small"
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaLabel={() => 'Price range'}
            sx={{
              color: '#c7956c',
              '& .MuiSlider-thumb': { borderRadius: '6px', width: 14, height: 14 },
              '& .MuiSlider-track': { borderRadius: '6px' },
            }}
          />
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9a8070', margin: '8px 0 0' }}>
            ₹{value[0]} – ₹{value[1]}
          </p>
        </FilterSection>

        {/* Color */}
        <FilterSection title="Colour" icon={ColorLensOutlinedIcon}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {colors.map(({ name, hex }) => (
              <button key={name} title={name} style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: hex,
                border: '2px solid rgba(199,149,108,0.3)',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }} className="es-color-swatch" />
            ))}
          </div>
        </FilterSection>

        {/* Capacity */}
        <FilterSection title="Capacity" icon={StraightenOutlinedIcon}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {capacities.map(cap => (
              <button
                key={cap}
                onClick={() => toggleCapacity(cap)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: `1.5px solid ${activeCapacities.includes(cap) ? '#c7956c' : 'rgba(199,149,108,0.25)'}`,
                  background: activeCapacities.includes(cap) ? 'rgba(199,149,108,0.1)' : 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: activeCapacities.includes(cap) ? 600 : 400,
                  color: activeCapacities.includes(cap) ? '#c7956c' : '#6b5749',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cap}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Brand */}
        <FilterSection title="Brand" icon={StorefrontOutlinedIcon}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {brands.map(brand => (
              <label key={brand} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12.5px',
                color: '#3d1e0a',
                cursor: 'pointer',
                padding: '4px 0',
              }}>
                <Checkbox
                  size="small"
                  sx={{ padding: '2px', color: 'rgba(199,149,108,0.5)', '&.Mui-checked': { color: '#c7956c' } }}
                  checked={activeBrands.includes(brand)}
                  onChange={() => setActiveBrands(prev =>
                    prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                  )}
                />
                {brand}
              </label>
            ))}
          </div>
        </FilterSection>
      </motion.aside>

      {/* Products main area */}
      <main style={{ flex: 1, padding: '40px 32px 80px' }}>
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}
        >
          <div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c7956c', display: 'block', marginBottom: '4px' }}>
              Our Collection
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#1a0f08', margin: 0, lineHeight: 1.2 }}>
              All <em style={{ fontStyle: 'italic', color: '#c7956c' }}>Products</em>
            </h2>
          </div>

          {/* Sort */}
          <select style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: '#3d1e0a',
            border: '1.5px solid rgba(199,149,108,0.25)',
            borderRadius: '10px',
            padding: '10px 16px',
            background: '#fff',
            cursor: 'pointer',
            outline: 'none',
            appearance: 'none',
            paddingRight: '36px',
          }}>
            <option value="menu order">Default Sorting</option>
            <option value="popularity">Sort by Popularity</option>
            <option value="rating">Sort by Rating</option>
            <option value="date">Sort by Latest</option>
            <option value="price">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </motion.div>

        <ProductCard />
      </main>

      <style>{`
        .es-color-swatch:hover { transform: scale(1.15); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        @media (max-width: 768px) { .es-product-sidebar { display: none !important; } }
      `}</style>
    </div>
  );
}

export default ProductCategories;