/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import InfiniteScroll from 'react-infinite-scroll-component';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

import API from '../../../apis';
import { setProducts } from '../../../redux/actions/ProductAction';
import { addToCart } from '../../../redux/actions/CartAction';
import Toast from '../../common/Toast';

import botanicsImg from '../../assets/products/botanics.jpg';
import cleanserImg from '../../assets/products/cleanser.jpg';
import creamImg from '../../assets/products/cream.jpg';
import lorealImg from '../../assets/products/loreal.jpg';
import lotionImg from '../../assets/products/lotion.jpg';
import perfumeImg from '../../assets/products/perfume.jpg';

const productImages = {
  'All Bright': botanicsImg,
  'Skin Cleanser': cleanserImg,
  'Hydrating Cream': creamImg,
  'Bonjour Nudista': lorealImg,
  'Rance 1795 Perfume': perfumeImg,
  'Brown Sugar Body Lotion': lotionImg,
};

const SAS_URL = import.meta.env.VITE_SAS_URL || 'https://oaqyonnkveufkkamswzv.supabase.co/storage/v1/object/public/photos';
const PRODUCT_FOLDER = 'product';

/* ── Luxury Card Skeleton ── */
const ProductCardSkeleton = () => (
  <div style={{
    background: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(15, 93, 78, 0.15)',
    boxShadow: '0 8px 30px rgba(15, 93, 78, 0.02)',
  }}>
    <div style={{ 
      aspectRatio: '4/5',
      background: 'linear-gradient(90deg, #faf5f2 25%, #f2eae4 50%, #faf5f2 75%)', 
      backgroundSize: '200% 100%', 
      animation: 'shimmer 1.6s infinite' 
    }} />
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ height: '10px', width: '30%', borderRadius: '4px', background: 'linear-gradient(90deg, #faf5f2 25%, #f2eae4 50%, #faf5f2 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite' }} />
      <div style={{ height: '18px', width: '70%', borderRadius: '4px', background: 'linear-gradient(90deg, #faf5f2 25%, #f2eae4 50%, #faf5f2 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite' }} />
      <div style={{ height: '14px', width: '40%', borderRadius: '4px', background: 'linear-gradient(90deg, #faf5f2 25%, #f2eae4 50%, #faf5f2 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite' }} />
    </div>
  </div>
);

/* ── Empty State ── */
const EmptyState = ({ isFiltered, onReset }) => (
  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 24px' }}>
    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(15, 93, 78, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
      <StorefrontOutlinedIcon sx={{ fontSize: 32, color: 'var(--es-emerald)' }} />
    </div>
    {isFiltered ? (
      <>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 600, color: 'var(--es-charcoal)', margin: '0 0 8px', fontStyle: 'italic' }}>No Products Found</h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-charcoal-60)', margin: '0 0 24px' }}>No products match your active search or filters.</p>
        <button
          onClick={onReset}
          style={{
            background: 'linear-gradient(135deg, var(--es-emerald), var(--es-emerald-soft))',
            border: 'none',
            borderRadius: '100px',
            padding: '12px 32px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            color: '#fff',
            cursor: 'pointer',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            boxShadow: '0 6px 20px rgba(15,93,78,0.2)',
          }}
        >
          Reset Filters
        </button>
      </>
    ) : (
      <>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 600, color: 'var(--es-charcoal)', margin: '0 0 8px', fontStyle: 'italic' }}>Boutique is Empty</h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-charcoal-60)', margin: 0 }}>Check back later for curated beauty collections.</p>
      </>
    )}
  </div>
);

/* ── High-End Bento Product Card Item ── */
const ProductCard_Item = React.memo(({ product, i, onEyeClick, onAddToCart, isInCart }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const productImg = product.product_image?.[0]?.image_src
    ? (product.product_image[0].image_src.startsWith('http')
      ? product.product_image[0].image_src
      : `${SAS_URL}/${PRODUCT_FOLDER}/${product.product_image[0].image_src}`)
    : productImages[product.name];

  const isOutOfStock = product.stock_quantity !== undefined && product.stock_quantity !== null && Number(product.stock_quantity) <= 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    onAddToCart(product, productImg);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onEyeClick(product, productImg)}
      className="es-product-card"
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 20px 40px rgba(15, 93, 78, 0.08)' : '0 8px 30px rgba(15, 93, 78, 0.02)',
        border: '1px solid rgba(15, 93, 78, 0.15)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* Badges */}
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {product.is_bestseller && (
          <span style={{
            background: 'linear-gradient(135deg, var(--es-emerald), var(--es-emerald-soft))',
            color: '#fff',
            fontFamily: "'Inter', sans-serif",
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '100px',
            boxShadow: '0 4px 10px rgba(15, 93, 78, 0.15)',
          }}>Bestseller</span>
        )}
        {product.discount_percent > 0 && (
          <span style={{
            background: '#22c55e',
            color: '#fff',
            fontFamily: "'Inter', sans-serif",
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '100px',
            width: 'fit-content',
          }}>{product.discount_percent.toFixed(0)}% OFF</span>
        )}
      </div>

      {/* Wishlist Button on top right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setWishlisted(!wishlisted);
        }}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: '#ffffff',
          border: '1px solid rgba(15, 93, 78, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: wishlisted ? '#ef4444' : 'var(--es-charcoal)',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(15, 93, 78, 0.05)',
          transition: 'all 0.2s',
        }}
      >
        {wishlisted ? <FavoriteIcon sx={{ fontSize: 16, color: '#ef4444' }} /> : <FavoriteBorderOutlinedIcon sx={{ fontSize: 16 }} />}
      </button>

      {/* Image Wrap */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/5',
        overflow: 'hidden',
        background: '#faf7f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Product image with zooming */}
        <img
          src={productImg}
          alt={product.name}
          loading="lazy"
          style={{
            width: '80%',
            height: '80%',
            objectFit: 'contain',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* Ethereal Blur Overlay on Hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(31, 27, 24, 0.05)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
          pointerEvents: 'none',
        }} />

        {/* Quick Add To Cart overlay banner */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          zIndex: 15,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            style={{
              width: '100%',
              background: isOutOfStock
                ? '#94a3b8'
                : justAdded
                  ? '#22c55e'
                  : 'var(--es-charcoal)',
              backdropFilter: 'blur(10px)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '100px',
              padding: '12px 20px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              transition: 'background-color 0.3s',
            }}
          >
            {isOutOfStock ? (
              <span>Out of Stock</span>
            ) : justAdded ? (
              <>
                <CheckIcon sx={{ fontSize: 14 }} />
                <span>Added</span>
              </>
            ) : (
              <>
                <AddShoppingCartOutlinedIcon sx={{ fontSize: 14 }} />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Content */}
      <div style={{
        padding: '24px 20px',
        textAlign: 'center',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
      }}>
        <div>
          {/* Brand/Subtitle */}
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--es-emerald)',
            display: 'block',
            marginBottom: '4px',
          }}>{product.brand}</span>

          {/* Product Title */}
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '19px',
            fontWeight: 600,
            color: 'var(--es-charcoal)',
            margin: '0 0 6px 0',
            lineHeight: 1.3,
          }}>{product.name}</h3>

          {/* Stars rating below title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', marginBottom: '8px' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <StarIcon key={s} sx={{ fontSize: 13, color: s <= 4 ? '#E2A154' : '#e8dcd3' }} />
            ))}
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              color: 'var(--es-charcoal-60)',
              marginLeft: '4px',
              fontWeight: 500,
            }}>(42)</span>
          </div>
        </div>

        {/* Pricing */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--es-charcoal)',
          }}>
            ₹{product.discounted_price || product.price}
          </span>
          {product.discounted_price && product.discounted_price !== product.price && (
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              color: 'var(--es-charcoal-60)',
              textDecoration: 'line-through',
              opacity: 0.6,
            }}>
              ₹{product.price}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

/* ── Main Component ── */
function ProductCard({
  searchQuery = '',
  activeCategory = '',
  priceRange = [0, 9999],
  activeCapacities = [],
  activeBrands = [],
  sortBy = 'menu order',
  onResetFilters = null,
}) {
  const isFiltered = searchQuery !== '' || activeCategory !== '' || activeCapacities.length > 0 || activeBrands.length > 0 || sortBy !== 'menu order';
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { listData, loading } = useSelector(state => state.allProducts);
  const cartItems = useSelector(state => state.cart.items);

  const itemsPerPage = 8;

  const getProducts = () => {
    API.ProductAPI.getProductList()
      .then(res => {
        if (res.status === 'Success') {
          dispatch(setProducts({ listData: res.data, loading: false }));
        } else {
          dispatch(setProducts({ listData: [], loading: false }));
        }
      })
      .catch(error => { throw error; });
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  React.useEffect(() => {
    setVisibleCount(8);
  }, [searchQuery, activeCategory, priceRange, activeCapacities, activeBrands, sortBy]);

  // Client-side filtering & sorting pipeline
  const filteredProducts = React.useMemo(() => {
    if (!listData) return [];

    return listData.filter(product => {
      // 1. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        const name = (product.name || '').toLowerCase();
        const brand = (product.brand || '').toLowerCase();
        if (!name.includes(query) && !brand.includes(query)) return false;
      }

      // 2. Category
      if (activeCategory) {
        const category = (product.category || '').toLowerCase();
        if (category !== activeCategory.toLowerCase()) return false;
      }

      // 3. Price Range
      if (priceRange && priceRange.length === 2) {
        const price = product.discounted_price !== undefined ? product.discounted_price : product.price;
        if (price < priceRange[0] || price > priceRange[1]) return false;
      }

      // 4. Capacity
      if (activeCapacities && activeCapacities.length > 0) {
        const capacity = (product.capacity || '').trim();
        if (!activeCapacities.includes(capacity)) return false;
      }

      // 5. Brand
      if (activeBrands && activeBrands.length > 0) {
        const brand = (product.brand || '').toLowerCase().trim();
        const match = activeBrands.some(b => b.toLowerCase().trim() === brand);
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.discounted_price !== undefined ? a.discounted_price : a.price;
      const priceB = b.discounted_price !== undefined ? b.discounted_price : b.price;

      if (sortBy === 'price') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return (b.rating || 4) - (a.rating || 4);
      if (sortBy === 'popularity') {
        const scoreA = (a.is_bestseller ? 2 : 0) + (a.discount_percent ? a.discount_percent / 100 : 0);
        const scoreB = (b.is_bestseller ? 2 : 0) + (b.discount_percent ? b.discount_percent / 100 : 0);
        return scoreB - scoreA;
      }
      if (sortBy === 'date') return (b.id || 0) - (a.id || 0);
      return (b.id || 0) - (a.id || 0);
    });
  }, [listData, searchQuery, activeCategory, priceRange, activeCapacities, activeBrands, sortBy]);

  const currentProducts = filteredProducts?.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => prev + itemsPerPage);
  };

  const handleEyeClick = (product, productImg) => {
    navigateTo('/product/detail', { state: { details: { product, productImg } } });
  };

  const handleAddToCart = (product, productImg) => {
    dispatch(addToCart({ ...product, productImg }));
    setAlert(true);
    setSeverity('success');
    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setAlert(false), 2500);
  };

  return (
    <>
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .es-bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }
        @media (max-width: 1200px) { .es-bento-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 800px) { .es-bento-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px) { .es-bento-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <Toast alerting={alert} severity={severity} message={message} />

      {loading ? (
        <div className="es-bento-grid">
          {Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : filteredProducts?.length > 0 ? (
        <InfiniteScroll
          dataLength={currentProducts.length}
          next={loadMore}
          hasMore={currentProducts.length < filteredProducts.length}
          loader={
            <div className="es-bento-grid" style={{ marginTop: '28px' }}>
              {Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          }
          endMessage={
            <p style={{
              textAlign: 'center',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              color: 'var(--es-charcoal-60)',
              marginTop: '48px',
              fontSize: '15px'
            }}>
              — You have viewed all curated boutique items —
            </p>
          }
        >
          <div className="es-bento-grid">
            {currentProducts.map((product, i) => (
              <ProductCard_Item
                key={product.id || i}
                product={product}
                i={i}
                onEyeClick={handleEyeClick}
                onAddToCart={handleAddToCart}
                isInCart={cartItems.some(c => c.id === product.id)}
              />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <EmptyState isFiltered={isFiltered} onReset={onResetFilters} />
      )}
    </>
  );
}

export default ProductCard;
