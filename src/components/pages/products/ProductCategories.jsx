/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider, Checkbox, FormControlLabel, Box } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

import ProductCard from './ProductCard';

function ProductCategories({ searchQuery: parentSearchQuery }) {
  const { listData } = useSelector(state => state.allProducts);

  // ── Search State ───────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState(parentSearchQuery || '');

  // ── Filter State ───────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState('');
  const [activeCapacities, setActiveCapacities] = useState([]);
  const [activeBrands, setActiveBrands] = useState([]);
  const [sortBy, setSortBy] = useState('menu order');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

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

  const [priceValue, setPriceValue] = useState([0, 9999]);
  const minDistance = 1;

  const effectivePriceRange = priceValue[1] === 9999
    ? [priceRange[0], priceRange[1]]
    : priceValue;

  const isFiltered =
    activeCategory !== '' ||
    activeCapacities.length > 0 ||
    activeBrands.length > 0 ||
    sortBy !== 'menu order' ||
    searchQuery !== '' ||
    priceValue[0] > priceRange[0] ||
    priceValue[1] < priceRange[1];

  const handleResetFilters = () => {
    setActiveCategory('');
    setActiveCapacities([]);
    setActiveBrands([]);
    setPriceValue([priceRange[0], priceRange[1]]);
    setSortBy('menu order');
    setSearchQuery('');
  };

  const handlePriceChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    if (activeThumb === 0) {
      setPriceValue([Math.min(newValue[0], priceValue[1] - minDistance), priceValue[1]]);
    } else {
      setPriceValue([priceValue[0], Math.max(newValue[1], priceValue[0] + minDistance)]);
    }
  };

  const toggleCapacity = (cap) => {
    setActiveCapacities(prev =>
      prev.includes(cap) ? prev.filter(c => c !== cap) : [...prev, cap]
    );
  };

  return (
    <div style={{ background: 'var(--es-cream)', minHeight: '100vh', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Categories Pill Bar */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '12px', 
          marginBottom: '32px' 
        }}>
          <button
            onClick={() => setActiveCategory('')}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '10px 24px',
              borderRadius: '100px',
              border: activeCategory === '' ? 'none' : '1px solid rgba(15, 93, 78, 0.15)',
              background: activeCategory === '' ? 'linear-gradient(135deg, var(--es-emerald) 0%, var(--es-emerald-soft) 100%)' : '#ffffff',
              color: activeCategory === '' ? '#ffffff' : 'var(--es-charcoal)',
              cursor: 'pointer',
              boxShadow: activeCategory === '' ? '0 4px 14px rgba(15, 93, 78, 0.2)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            All Curation
          </button>
          {dynamicCategories.map(name => (
            <button
              key={name}
              onClick={() => setActiveCategory(name)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '10px 24px',
                borderRadius: '100px',
                border: activeCategory === name ? 'none' : '1px solid rgba(15, 93, 78, 0.15)',
                background: activeCategory === name ? 'linear-gradient(135deg, var(--es-emerald) 0%, var(--es-emerald-soft) 100%)' : '#ffffff',
                color: activeCategory === name ? '#ffffff' : 'var(--es-charcoal)',
                cursor: 'pointer',
                boxShadow: activeCategory === name ? '0 4px 14px rgba(15, 93, 78, 0.2)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Filters and Sorting Inline Bar */}
        <section style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderTop: '1px solid rgba(15, 93, 78, 0.15)',
          borderBottom: '1px solid rgba(15, 93, 78, 0.15)',
          padding: '24px 0',
          marginBottom: '40px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            width: '100%',
          }}>
            {/* Left side actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '12px 24px',
                  borderRadius: '100px',
                  border: '1px solid rgba(15, 93, 78, 0.15)',
                  background: showFiltersPanel ? 'var(--es-charcoal)' : '#ffffff',
                  color: showFiltersPanel ? '#ffffff' : 'var(--es-charcoal)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <TuneIcon sx={{ fontSize: 16 }} />
                <span>Filters {showFiltersPanel ? 'Close' : 'Open'}</span>
              </button>

              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '12px 24px',
                    borderRadius: '100px',
                    border: '1.5px dashed rgba(239, 68, 68, 0.4)',
                    background: 'rgba(239, 68, 68, 0.05)',
                    color: '#dc2626',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <FilterListOffIcon sx={{ fontSize: 15 }} />
                  Clear All
                </button>
              )}
            </div>

            {/* Right side search + sort */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              flexWrap: 'wrap',
              flex: '1 1 auto',
              justifyContent: 'flex-end',
            }}>
              {/* Search */}
              <div style={{
                position: 'relative',
                width: '280px',
              }}>
                <input
                  type="text"
                  placeholder="Search product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid rgba(15, 93, 78, 0.15)',
                    borderRadius: '100px',
                    padding: '12px 48px 12px 20px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'var(--es-charcoal)',
                    outline: 'none',
                    transition: 'all 0.3s',
                  }}
                />
                <SearchIcon sx={{
                  position: 'absolute',
                  right: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--es-emerald)',
                  fontSize: 18,
                }} />
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--es-charcoal)',
                  border: '1px solid rgba(15, 93, 78, 0.15)',
                  borderRadius: '100px',
                  padding: '12px 32px 12px 20px',
                  background: '#ffffff',
                  cursor: 'pointer',
                  outline: 'none',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%230f5d4e\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                }}
              >
                <option value="menu order">Default Sorting</option>
                <option value="popularity">Sort by Popularity</option>
                <option value="rating">Sort by Rating</option>
                <option value="date">Sort by Latest</option>
                <option value="price">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Expandable Filter Panel */}
          <AnimatePresence>
            {showFiltersPanel && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '32px',
                  padding: '24px 20px',
                  background: '#ffffff',
                  border: '1px solid rgba(15, 93, 78, 0.15)',
                  borderRadius: '16px',
                  marginTop: '16px',
                  boxShadow: '0 10px 30px rgba(15, 93, 78, 0.03)',
                }}>
                  {/* Price Slider */}
                  <div>
                    <h4 style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--es-emerald)',
                      marginBottom: '16px',
                      borderBottom: '1px solid rgba(15, 93, 78, 0.1)',
                      paddingBottom: '8px',
                    }}>Price Range</h4>
                    <Box sx={{ px: 1 }}>
                      <Slider
                        min={priceRange[0]}
                        max={priceRange[1]}
                        disableSwap
                        size="small"
                        value={priceValue[1] === 9999 ? [priceRange[0], priceRange[1]] : priceValue}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        sx={{
                          color: 'var(--es-emerald)',
                          '& .MuiSlider-thumb': { borderRadius: '6px', width: 14, height: 14 },
                          '& .MuiSlider-track': { borderRadius: '6px' },
                        }}
                      />
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--es-charcoal-60)', margin: '12px 0 0', fontWeight: 500 }}>
                        ₹{effectivePriceRange[0]} – ₹{effectivePriceRange[1]}
                      </p>
                    </Box>
                  </div>

                  {/* Brand Filter */}
                  {dynamicBrands.length > 0 && (
                    <div>
                      <h4 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--es-emerald)',
                        marginBottom: '16px',
                        borderBottom: '1px solid rgba(15, 93, 78, 0.1)',
                        paddingBottom: '8px',
                      }}>Brands</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '140px', overflowY: 'auto' }}>
                        {dynamicBrands.map(brand => (
                          <FormControlLabel
                            key={brand}
                            control={
                              <Checkbox
                                size="small"
                                checked={activeBrands.includes(brand)}
                                onChange={() => setActiveBrands(prev =>
                                  prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                                )}
                                sx={{ color: 'rgba(15, 93, 78, 0.3)', '&.Mui-checked': { color: 'var(--es-emerald)' } }}
                              />
                            }
                            label={brand}
                            sx={{
                              '& .MuiFormControlLabel-label': {
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '13px',
                                color: 'var(--es-charcoal)',
                              }
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Capacity Filter */}
                  {dynamicCapacities.length > 0 && (
                    <div>
                      <h4 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--es-emerald)',
                        marginBottom: '16px',
                        borderBottom: '1px solid rgba(15, 93, 78, 0.1)',
                        paddingBottom: '8px',
                      }}>Sizes / Capacities</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                        {dynamicCapacities.map(cap => {
                          const isSelected = activeCapacities.includes(cap);
                          return (
                            <button
                              key={cap}
                              onClick={() => toggleCapacity(cap)}
                              style={{
                                padding: '8px 16px',
                                borderRadius: '100px',
                                border: isSelected ? 'none' : '1px solid rgba(15, 93, 78, 0.15)',
                                background: isSelected ? 'var(--es-charcoal)' : '#ffffff',
                                color: isSelected ? '#ffffff' : 'var(--es-charcoal)',
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '11px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                              }}
                            >
                              {cap}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Product Grid */}
        <ProductCard
          searchQuery={searchQuery}
          activeCategory={activeCategory}
          priceRange={effectivePriceRange}
          activeCapacities={activeCapacities}
          activeBrands={activeBrands}
          sortBy={sortBy}
          onResetFilters={handleResetFilters}
        />
      </div>
    </div>
  );
}

export default ProductCategories;