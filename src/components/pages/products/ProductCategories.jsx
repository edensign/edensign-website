/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Slider, Checkbox } from '@mui/material';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

import ProductCard from './ProductCard';

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

function ProductCategories({ searchQuery }) {
  const { listData } = useSelector(state => state.allProducts);

  // ── Derive filter options dynamically from the DB data ──────────────
  const dynamicCategories = useMemo(() => {
    if (!listData || listData.length === 0) return [];
    const seen = new Set();
    return listData
      .map(p => (p.category || '').trim())
      .filter(c => c && !seen.has(c.toLowerCase()) && seen.add(c.toLowerCase()))
      .sort();
  }, [listData]);

  const dynamicCapacities = useMemo(() => {
    if (!listData || listData.length === 0) return [];
    const seen = new Set();
    return listData
      .map(p => (p.capacity || '').trim())
      .filter(c => c && !seen.has(c) && seen.add(c))
      .sort();
  }, [listData]);

  const dynamicBrands = useMemo(() => {
    if (!listData || listData.length === 0) return [];
    const seen = new Set();
    return listData
      .map(p => (p.brand || '').trim())
      .filter(b => b && !seen.has(b.toLowerCase()) && seen.add(b.toLowerCase()))
      .sort();
  }, [listData]);

  // Compute min and max price dynamically for the slider
  const priceRange = useMemo(() => {
    if (!listData || listData.length === 0) return [0, 500];
    const prices = listData.map(p =>
      p.discounted_price !== undefined ? p.discounted_price : (p.price || 0)
    );
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [listData]);

  // ── Filter state ────────────────────────────────────────────────────
  const [value, setValue] = useState([0, 9999]); // will be clamped by slider max
  const [activeCategory, setActiveCategory] = useState('');
  const [activeCapacities, setActiveCapacities] = useState([]);
  const [activeBrands, setActiveBrands] = useState([]);
  const [sortBy, setSortBy] = useState('menu order');
  const minDistance = 1;

  const isFiltered =
    activeCategory !== '' ||
    activeCapacities.length > 0 ||
    activeBrands.length > 0 ||
    sortBy !== 'menu order' ||
    value[0] > priceRange[0] ||
    value[1] < priceRange[1];

  const handleResetFilters = () => {
    setActiveCategory('');
    setActiveCapacities([]);
    setActiveBrands([]);
    setValue([priceRange[0], priceRange[1]]);
    setSortBy('menu order');
  };

  const handlePriceChange = (event, newValue, activeThumb) => {
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

  const effectivePriceRange = value[1] === 9999
    ? [priceRange[0], priceRange[1]]
    : value;

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
        {/* Header + Reset */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', paddingBottom: '16px', borderBottom: '2px solid rgba(199,149,108,0.2)' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '18px',
            fontWeight: 700,
            color: '#1a0f08',
            margin: 0,
          }}>
            Filter Products
          </h2>
          {isFiltered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleResetFilters}
              title="Reset all filters"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(199,149,108,0.1)',
                border: '1px solid rgba(199,149,108,0.3)',
                borderRadius: '20px',
                padding: '4px 10px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                color: '#c7956c',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}
            >
              <FilterListOffIcon sx={{ fontSize: 13 }} />
              Reset
            </motion.button>
          )}
        </div>

        {/* Categories — from DB */}
        {dynamicCategories.length > 0 && (
          <FilterSection title="Category" icon={StorefrontOutlinedIcon}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {dynamicCategories.map(name => (
                <button
                  key={name}
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
              ))}
            </div>
          </FilterSection>
        )}

        {/* Price Range */}
        <FilterSection title="Price Range" icon={LocalOfferOutlinedIcon}>
          <Slider
            min={priceRange[0]}
            max={priceRange[1]}
            disableSwap
            size="small"
            value={value[1] === 9999 ? [priceRange[0], priceRange[1]] : value}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            getAriaLabel={() => 'Price range'}
            sx={{
              color: '#c7956c',
              '& .MuiSlider-thumb': { borderRadius: '6px', width: 14, height: 14 },
              '& .MuiSlider-track': { borderRadius: '6px' },
            }}
          />
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9a8070', margin: '8px 0 0' }}>
            ₹{effectivePriceRange[0]} – ₹{effectivePriceRange[1]}
          </p>
        </FilterSection>

        {/* Capacity — from DB */}
        {dynamicCapacities.length > 0 && (
          <FilterSection title="Capacity" icon={StraightenOutlinedIcon}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {dynamicCapacities.map(cap => (
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
        )}

        {/* Brand — from DB */}
        {dynamicBrands.length > 0 && (
          <FilterSection title="Brand" icon={StorefrontOutlinedIcon}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {dynamicBrands.map(brand => (
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
        )}
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
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
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
            }}
          >
            <option value="menu order">Default Sorting</option>
            <option value="popularity">Sort by Popularity</option>
            <option value="rating">Sort by Rating</option>
            <option value="date">Sort by Latest</option>
            <option value="price">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </motion.div>

        <ProductCard
          searchQuery={searchQuery}
          activeCategory={activeCategory}
          priceRange={effectivePriceRange}
          activeCapacities={activeCapacities}
          activeBrands={activeBrands}
          sortBy={sortBy}
          onResetFilters={handleResetFilters}
        />
      </main>

      <style>{`
        @media (max-width: 768px) { .es-product-sidebar { display: none !important; } }
      `}</style>
    </div>
  );
}

export default ProductCategories;