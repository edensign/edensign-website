/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/actions/CartAction';
import Toast from '../../common/Toast';


import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

const ENV = import.meta.env;

function ProductDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { product, productImg } = state?.details || {};

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(productImg);
  const [addedToCart, setAddedToCart] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  
  const dispatch = useDispatch();


  const unitPrice = product?.discounted_price ?? 0;
  const totalPrice = unitPrice * quantity;

  const toggleWishlist = () => setIsInWishlist(!isInWishlist);
  const handleIncreaseQuantity = () => setQuantity(quantity + 1);
  const handleDecreaseQuantity = () => { if (quantity > 1) setQuantity(quantity - 1); };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, productImg, quantity }));
    setAddedToCart(true);
    setAlert(true);
    setMessage(`${product.name} added to cart!`);
    setTimeout(() => {
      setAddedToCart(false);
      setAlert(false);
      setQuantity(1);
    }, 2200);
  };

  const guarantees = [
    { Icon: LocalShippingOutlinedIcon, text: 'Free shipping on orders ₹499+' },
    { Icon: VerifiedOutlinedIcon, text: '100% authentic products' },
    { Icon: RefreshOutlinedIcon, text: '7-day easy returns' },
  ];

  return (
    <>
      <style>{`
        .es-qty-btn:hover { background: rgba(199,149,108,0.12) !important; border-color: #c7956c !important; }
        .es-social-share:hover { color: #c7956c !important; transform: translateY(-2px); }
        .es-thumbnail:hover { border-color: #c7956c !important; opacity: 1 !important; }
        @media (max-width: 768px) {
          .es-detail-layout { flex-direction: column !important; }
          .es-detail-image { width: 100% !important; }
          .es-detail-info { width: 100% !important; padding: 24px !important; }
        }
      `}</style>

      <Toast alerting={alert} severity="success" message={message} />

      <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '88px' }}>
        {/* Back button */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 32px 0' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#9a8070',
              padding: '8px 0',
              transition: 'color 0.2s',
            }}
            className="es-back-btn"
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Back to Products
          </button>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 32px 80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              gap: '48px',
              background: '#fff',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(26,10,0,0.07)',
              border: '1px solid rgba(199,149,108,0.1)',
            }}
            className="es-detail-layout"
          >
            {/* ── Image Column ── */}
            <div style={{ width: '50%', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px', padding: '32px 0 32px 32px' }} className="es-detail-image">
              {/* Main image */}
              <div style={{
                background: '#faf6f1',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt={product?.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  decoding="async"
                  style={{
                    maxWidth: '80%',
                    maxHeight: '80%',
                    objectFit: 'contain',
                  }}
                />

                {/* Wishlist overlay button */}
                <button
                  onClick={toggleWishlist}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    background: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(26,10,0,0.1)',
                    color: isInWishlist ? '#ef4444' : '#9a8070',
                    transition: 'transform 0.2s',
                  }}
                >
                  {isInWishlist ? <FavoriteIcon sx={{ fontSize: 18 }} /> : <FavoriteBorderOutlinedIcon sx={{ fontSize: 18 }} />}
                </button>

                {/* Discount badge */}
                {product?.discount_percent > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(34,197,94,0.9)',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '100px',
                  }}>
                    {product.discount_percent?.toFixed(0)}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail strip (placeholder — single image shown) */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {[selectedImage].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className="es-thumbnail"
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: '12px',
                      border: `2px solid ${selectedImage === img ? '#c7956c' : 'rgba(199,149,108,0.2)'}`,
                      background: '#faf6f1',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      padding: 4,
                      opacity: selectedImage === img ? 1 : 0.7,
                      transition: 'all 0.2s',
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Info Column ── */}
            <div style={{ flex: 1, padding: '40px 40px 40px 16px', display: 'flex', flexDirection: 'column' }} className="es-detail-info">
              {/* Brand + Category */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#c7956c',
                  background: 'rgba(199,149,108,0.1)',
                  border: '1px solid rgba(199,149,108,0.2)',
                  padding: '4px 12px',
                  borderRadius: '100px',
                }}>
                  {product?.brand}
                </span>
              </div>

              {/* Product name */}
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 700,
                color: '#1a0f08',
                margin: '0 0 12px 0',
                lineHeight: 1.15,
              }}>
                {product?.name}
              </h1>

              {/* Description */}
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#6b5749',
                margin: '0 0 20px 0',
                lineHeight: 1.8,
              }}>
                {product?.description}
              </p>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
                {[1,2,3,4,5].map(s => (
                  <StarIcon key={s} sx={{ fontSize: 16, color: s <= 3.5 ? '#F59E0B' : '#e8e0d8' }} />
                ))}
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9a8070', marginLeft: '4px' }}>3.5 (128 reviews)</span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '32px', fontWeight: 800, color: '#1a0f08' }}>
                  ₹{totalPrice.toFixed(2)}
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#9a8070', textDecoration: 'line-through' }}>
                  ₹{product?.price ?? 0}
                </span>
                {product?.discount_percent > 0 && (
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#22c55e' }}>
                    Save ₹{((product.price - product.discounted_price) * quantity).toFixed(0)}
                  </span>
                )}
              </div>
              {product?.capacity && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9a8070', margin: '0 0 24px' }}>
                  Capacity: {product.capacity}
                </p>
              )}

              <div style={{ height: '1px', background: 'rgba(199,149,108,0.12)', marginBottom: '24px' }} />

              {/* Quantity selector */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a8070', display: 'block', marginBottom: '10px' }}>
                  Quantity
                </label>
                <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid rgba(199,149,108,0.25)', borderRadius: '12px', overflow: 'hidden' }}>
                  <button
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                    className="es-qty-btn"
                    style={{
                      width: 44,
                      height: 44,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '20px',
                      color: quantity <= 1 ? '#ccc' : '#3d1e0a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    −
                  </button>
                  <span style={{ minWidth: '48px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 700, color: '#1a0f08' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQuantity}
                    className="es-qty-btn"
                    style={{
                      width: 44,
                      height: 44,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '20px',
                      color: '#3d1e0a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    minWidth: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '16px 24px',
                    background: addedToCart
                      ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                      : 'linear-gradient(135deg, #1a0a00, #3d1e0a)',
                    border: 'none',
                    borderRadius: '14px',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(26,10,0,0.25)',
                    transition: 'background 0.3s',
                  }}
                >
                  <ShoppingBagOutlinedIcon sx={{ fontSize: 18 }} />
                  {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                </motion.button>

                <button
                  onClick={toggleWishlist}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '14px',
                    border: `1.5px solid ${isInWishlist ? '#ef4444' : 'rgba(199,149,108,0.3)'}`,
                    background: isInWishlist ? 'rgba(239,68,68,0.08)' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isInWishlist ? '#ef4444' : '#9a8070',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                >
                  {isInWishlist ? <FavoriteIcon sx={{ fontSize: 20 }} /> : <FavoriteBorderOutlinedIcon sx={{ fontSize: 20 }} />}
                </button>
              </div>

              {/* Guarantees */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', padding: '16px', background: '#faf6f1', borderRadius: '12px' }}>
                {guarantees.map(({ Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon sx={{ fontSize: 16, color: '#c7956c', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', color: '#6b5749' }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9a8070', margin: 0 }}>
                  <strong style={{ color: '#3d1e0a' }}>Brand:</strong> {product?.brand}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9a8070', margin: 0 }}>
                  <strong style={{ color: '#3d1e0a' }}>Tags:</strong>{' '}
                  {['Airbrush', 'Matte', 'Skin'].map(tag => (
                    <span key={tag} style={{
                      display: 'inline-block',
                      marginRight: '6px',
                      padding: '2px 10px',
                      borderRadius: '100px',
                      background: 'rgba(199,149,108,0.1)',
                      border: '1px solid rgba(199,149,108,0.2)',
                      fontSize: '11px',
                      color: '#a8724d',
                    }}>{tag}</span>
                  ))}
                </p>
              </div>

              {/* Share */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9a8070' }}>Share:</span>
                {[
                  { Icon: FacebookOutlinedIcon, color: '#1877f2' },
                  { Icon: TwitterIcon, color: '#1da1f2' },
                  { Icon: InstagramIcon, color: '#e1306c' },
                  { Icon: WhatsAppIcon, color: '#25d366' },
                ].map(({ Icon, color }) => (
                  <button
                    key={color}
                    className="es-social-share"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9a8070',
                      display: 'flex',
                      padding: '4px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon sx={{ fontSize: 20 }} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;