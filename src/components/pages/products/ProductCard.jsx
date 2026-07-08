/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Pagination from '@mui/material/Pagination';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

import API from '../../../apis';
import { setProducts } from '../../../redux/actions/ProductAction';
import { addToCart } from '../../../redux/actions/CartAction';
import Toast from '../../common/Toast';
import Loader from '../../common/Loader';

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


/* ── Skeleton card ── */
const ProductCardSkeleton = () => (
  <div style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(26,10,0,0.05)', border: '1px solid rgba(199,149,108,0.08)' }}>
    <div style={{ height: '240px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite' }} />
    <div style={{ padding: '20px' }}>
      <div style={{ height: '16px', borderRadius: '5px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite', marginBottom: '10px', width: '70%' }} />
      <div style={{ height: '13px', borderRadius: '5px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite', width: '45%' }} />
    </div>
  </div>
);

/* ── Empty state ── */
const EmptyState = ({ isFiltered, onReset }) => (
  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 24px' }}>
    <div style={{ width: 80, height: 80, borderRadius: '24px', background: 'rgba(199,149,108,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
      <StorefrontOutlinedIcon sx={{ fontSize: 36, color: '#c7956c' }} />
    </div>
    {isFiltered ? (
      <>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: '#1a0f08', margin: '0 0 8px' }}>No Matching Products</h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#9a8070', margin: '0 0 24px' }}>No products match your current filters. Try adjusting or clearing them.</p>
        <button
          onClick={onReset}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #c7956c, #a8724d)',
            border: 'none',
            borderRadius: '100px',
            padding: '12px 28px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            color: '#fff',
            cursor: 'pointer',
            letterSpacing: '0.06em',
            boxShadow: '0 6px 20px rgba(199,149,108,0.35)',
            transition: 'all 0.2s',
          }}
        >
          Reset Filters
        </button>
      </>
    ) : (
      <>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: '#1a0f08', margin: '0 0 8px' }}>No Products Yet</h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#9a8070', margin: 0 }}>Check back soon for our curated product collection.</p>
      </>
    )}
  </div>
);

/* ── Single product card ── */
const ProductCard_Item = React.memo(({ product, i, onEyeClick, onAddToCart, isInCart }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const productImg = product.product_image?.[0]?.image_src
    ? (product.product_image[0].image_src.startsWith('http')
      ? product.product_image[0].image_src
      : `${SAS_URL}/${PRODUCT_FOLDER}/${product.product_image[0].image_src}`)
    : productImages[product.name];

  const isOutOfStock = product.stock_quantity !== undefined && product.stock_quantity !== null && Number(product.stock_quantity) <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, productImg);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const added = justAdded || isInCart;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 20px 56px rgba(26,10,0,0.12)' : '0 4px 20px rgba(26,10,0,0.05)',
        border: added ? '1.5px solid rgba(34,197,94,0.45)' : '1px solid rgba(199,149,108,0.1)',
        transition: 'box-shadow 0.35s ease, transform 0.35s ease, border 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Bestseller badge */}
      {product.is_bestseller && (
        <div style={{
          position: 'absolute', top: 14, left: 14, zIndex: 2,
          background: 'linear-gradient(135deg, #c7956c, #a8724d)',
          color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '9px',
          fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '4px 10px', borderRadius: '100px',
        }}>Bestseller</div>
      )}

      {/* Discount badge */}
      {product.discount_percent > 0 && (
        <div style={{
          position: 'absolute', top: 14, right: 14, zIndex: 2,
          background: 'rgba(34,197,94,0.9)', color: '#fff',
          fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
          padding: '4px 10px', borderRadius: '100px',
        }}>
          {product.discount_percent.toFixed(0)}% OFF
        </div>
      )}

      {/* In-cart ribbon */}
      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
              zIndex: 5, background: 'rgba(34,197,94,0.95)', color: '#fff',
              fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.1em', padding: '4px 12px', borderRadius: '100px',
              display: 'flex', alignItems: 'center', gap: '4px',
              boxShadow: '0 4px 14px rgba(34,197,94,0.35)',
            }}
          >
            <CheckIcon sx={{ fontSize: 12 }} /> In Cart
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image container */}
      <div style={{
        position: 'relative', height: '240px', background: '#faf6f1',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <img
          src={productImg}
          alt={product.name}
          loading="lazy"
          decoding="async"
          style={{
            maxHeight: '200px', maxWidth: '80%', objectFit: 'contain',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />

        {/* Hover action buttons */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end',
          justifyContent: 'center', gap: '8px', padding: '16px',
          background: hovered ? 'rgba(26,10,0,0.08)' : 'transparent',
          transition: 'background 0.3s',
        }}>
          <motion.div
            style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => onEyeClick(product, productImg)}
              style={{
                width: 38, height: 38, borderRadius: '12px', background: '#fff',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', boxShadow: '0 4px 12px rgba(26,10,0,0.15)',
                transition: 'transform 0.2s', color: '#3d1e0a',
              }}
              title="Quick view"
            >
              <RemoveRedEyeOutlinedIcon sx={{ fontSize: 17 }} />
            </button>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              style={{
                width: 38, height: 38, borderRadius: '12px', background: '#fff',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', boxShadow: '0 4px 12px rgba(26,10,0,0.15)',
                color: wishlisted ? '#ef4444' : '#3d1e0a',
              }}
              title="Add to wishlist"
            >
              {wishlisted
                ? <FavoriteIcon sx={{ fontSize: 17, color: '#ef4444' }} />
                : <FavoriteBorderOutlinedIcon sx={{ fontSize: 17 }} />
              }
            </button>
          </motion.div>
        </div>
      </div>

      {/* Product info */}
      <div style={{ padding: '20px 20px 0', flex: 1 }}>
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600,
          letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c7956c',
          display: 'block', marginBottom: '4px',
        }}>
          {product.brand}
        </span>
        <h3
          onClick={() => onEyeClick(product, productImg)}
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 600,
            color: '#1a0f08', margin: '0 0 6px 0', lineHeight: 1.3,
            cursor: 'pointer'
          }}
        >
          {product.name}
        </h3>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9a8070',
          margin: '0 0 12px 0', lineHeight: 1.6,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {product.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <StarIcon key={s} sx={{ fontSize: 12, color: s <= 3.5 ? '#F59E0B' : '#e8e0d8' }} />
          ))}
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#9a8070', marginLeft: '4px' }}>(3.5)</span>
        </div>

        {/* Stock status */}


        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 700, color: '#1a0f08' }}>
            ₹{product.discounted_price}
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9a8070', textDecoration: 'line-through' }}>
            ₹{product.price}
          </span>
        </div>
      </div>

      {/* Add to cart button */}
      <div style={{ padding: '0 20px 20px' }}>
        <motion.button
          id={`add-to-cart-${product.id}`}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          whileTap={isOutOfStock ? {} : { scale: 0.96 }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px',
            background: isOutOfStock
              ? '#cbd5e1'
              : added
                ? 'linear-gradient(135deg, #16a34a, #22c55e)'
                : hovered
                  ? 'linear-gradient(135deg, #1a0a00, #3d1e0a)'
                  : 'rgba(199,149,108,0.1)',
            border: `1.5px solid ${isOutOfStock ? 'transparent' : added ? 'transparent' : hovered ? 'transparent' : 'rgba(199,149,108,0.3)'}`,
            borderRadius: '12px',
            color: isOutOfStock ? '#64748b' : added ? '#fff' : hovered ? '#fff' : '#a8724d',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: isOutOfStock ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          <AnimatePresence mode="wait">
            {isOutOfStock ? (
              <motion.span
                key="outofstock"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                Out of Stock
              </motion.span>
            ) : added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <CheckIcon sx={{ fontSize: 15 }} /> Added to Cart
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ShoppingBagOutlinedIcon sx={{ fontSize: 16 }} /> Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
});

/* ── Main component ── */
function ProductCard({
  searchQuery = '',
  activeCategory = '',
  priceRange = [10, 500],
  activeCapacities = [],
  activeBrands = [],
  sortBy = 'menu order',
  onResetFilters = null,
}) {
  const isFiltered = searchQuery !== '' || activeCategory !== '' || activeCapacities.length > 0 || activeBrands.length > 0 || sortBy !== 'menu order';
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { listData, loading } = useSelector(state => state.allProducts);
  const cartItems = useSelector(state => state.cart.items);

  const itemsPerPage = 9;

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

  // Reset pagination to page 1 whenever any filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, priceRange, activeCapacities, activeBrands, sortBy]);

  // Optimized client-side filtering and sorting pipeline
  const filteredProducts = React.useMemo(() => {
    if (!listData) return [];

    return listData.filter(product => {
      // 1. Search query (matches name or brand)
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        const name = (product.name || '').toLowerCase();
        const brand = (product.brand || '').toLowerCase();
        if (!name.includes(query) && !brand.includes(query)) {
          return false;
        }
      }

      // 2. Category
      if (activeCategory) {
        const category = (product.category || '').toLowerCase();
        if (category !== activeCategory.toLowerCase()) {
          return false;
        }
      }

      // 3. Price Range (uses discounted_price if available, else price)
      if (priceRange && priceRange.length === 2) {
        const minPrice = priceRange[0];
        const maxPrice = priceRange[1];
        const price = product.discounted_price !== undefined ? product.discounted_price : product.price;
        if (price < minPrice || price > maxPrice) {
          return false;
        }
      }

      // 4. Capacity
      if (activeCapacities && activeCapacities.length > 0) {
        const capacity = (product.capacity || '').trim();
        if (!activeCapacities.includes(capacity)) {
          return false;
        }
      }

      // 5. Brand
      if (activeBrands && activeBrands.length > 0) {
        const brand = (product.brand || '').toLowerCase().trim();
        const brandMatch = activeBrands.some(b => b.toLowerCase().trim() === brand);
        if (!brandMatch) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // 6. Sorting
      const priceA = a.discounted_price !== undefined ? a.discounted_price : a.price;
      const priceB = b.discounted_price !== undefined ? b.discounted_price : b.price;

      if (sortBy === 'price') {
        return priceA - priceB;
      } else if (sortBy === 'price-desc') {
        return priceB - priceA;
      } else if (sortBy === 'rating') {
        return (b.rating || 3.5) - (a.rating || 3.5);
      } else if (sortBy === 'popularity') {
        const scoreA = (a.is_bestseller ? 2 : 0) + (a.discount_percent ? a.discount_percent / 100 : 0);
        const scoreB = (b.is_bestseller ? 2 : 0) + (b.discount_percent ? b.discount_percent / 100 : 0);
        return scoreB - scoreA;
      } else if (sortBy === 'date') {
        return (b.id || 0) - (a.id || 0);
      }
      return 0; // Default sorting (menu order)
    });
  }, [listData, searchQuery, activeCategory, priceRange, activeCapacities, activeBrands, sortBy]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo(0, 300);
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
        @media (max-width:900px) { .es-product-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width:550px) { .es-product-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <Toast alerting={alert} severity={severity} message={message} />

      <div
        className="es-product-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}
      >
        {loading
          ? Array.from({ length: 6 }, (_, i) => <ProductCardSkeleton key={i} />)
          : currentProducts?.length > 0
            ? currentProducts.map((product, i) => (
              <ProductCard_Item
                key={product.id || i}
                product={product}
                i={i}
                onEyeClick={handleEyeClick}
                onAddToCart={handleAddToCart}
                isInCart={cartItems.some(c => c.id === product.id)}
              />
            ))
            : <EmptyState isFiltered={isFiltered} onReset={onResetFilters} />
        }
      </div>

      {/* Pagination */}
      {filteredProducts?.length > itemsPerPage && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
          <Pagination
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              '& .MuiPaginationItem-root': {
                fontFamily: 'Inter, sans-serif', fontSize: '13px', borderRadius: '10px',
              },
              '& .Mui-selected': {
                background: 'linear-gradient(135deg, #c7956c, #a8724d) !important',
                color: '#fff !important',
              },
            }}
          />
        </div>
      )}
    </>
  );
}

export default ProductCard;
