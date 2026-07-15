/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { addToCart, removeFromCart, updateCartQty, clearCart } from '../../../redux/actions/CartAction';
import API from '../../../apis';
import { api } from '../../../apis/config/axiosConfig';
import { loadRazorpayScript } from '../../utils/razorpay';

// ---------- data ----------
const SAS_URL = import.meta.env.VITE_SAS_URL || 'https://oaqyonnkveufkkamswzv.supabase.co/storage/v1/object/public/photos';
const PRODUCT_FOLDER = 'product';

const PROMO_CODES = {
  EDEN10: 0.1,
  SANCTUARY: 0.15,
};

/* ── Empty cart state ── */
const EmptyCart = ({ onShop }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    style={{ textAlign: 'center', padding: '100px 24px' }}
  >
    <div style={{
      width: 100, height: 100, borderRadius: '28px',
      background: 'linear-gradient(135deg, rgba(15, 93, 78, 0.12), rgba(15, 93, 78, 0.06))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: '0 auto 24px',
      boxShadow: '0 8px 32px rgba(15, 93, 78, 0.15)',
    }}>
      <ShoppingBagOutlinedIcon sx={{ fontSize: 44, color: 'var(--es-emerald)' }} />
    </div>
    <p style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '11px', color: 'var(--es-emerald)', fontWeight: 700, marginBottom: '12px' }}>
      A quiet bag
    </p>
    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', color: 'var(--es-charcoal)', margin: '0 0 10px' }}>
      Your sanctuary awaits
    </h2>
    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--es-charcoal-60)', margin: '0 0 32px', lineHeight: 1.6 }}>
      Nothing selected yet. Wander the marketplace and let something exquisite find you.
    </p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onShop}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '14px 32px', borderRadius: '100px',
          background: 'var(--es-charcoal)',
          color: 'var(--es-cream)', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600,
          letterSpacing: '0.24em', textTransform: 'uppercase',
          boxShadow: '0 4px 20px rgba(26,21,18,0.15)',
        }}
      >
        Browse Marketplace
      </motion.button>
      <Link
        to="/"
        style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '14px 32px', borderRadius: '100px',
          border: '1px solid var(--es-charcoal)', background: 'transparent',
          color: 'var(--es-charcoal)', textDecoration: 'none',
          fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600,
          letterSpacing: '0.24em', textTransform: 'uppercase',
        }}
      >
        Back to Home
      </Link>
    </div>
  </motion.div>
);

/* ── Individual cart row ── */
const CartRow = ({ item, onRemove, onQty }) => {
  const price = Number(item.discounted_price || item.price || 0);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      className="cart-item-card"
      style={{
        display: 'block',
        padding: '20px', background: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--es-radius)', border: '1px solid var(--es-charcoal-10)',
        marginBottom: '14px',
      }}
    >
      <div className="cart-row-inner" style={{ display: 'flex', gap: '20px' }}>
        {/* Product image */}
        <div style={{
          width: '112px', height: '112px', borderRadius: '16px',
          background: '#ffffff', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', position: 'relative',
          border: '1px solid var(--es-charcoal-5)',
        }}>
          {item.productImg
            ? <img src={item.productImg} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <ShoppingBagOutlinedIcon sx={{ fontSize: 28, color: 'var(--es-primary)' }} />
          }
          <span style={{
            position: 'absolute', left: '8px', top: '8px',
            background: 'rgba(255, 255, 255, 0.85)',
            padding: '4px 8px', borderRadius: '100px',
            fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--es-emerald)',
          }}>
            {item.brand || 'Eden Sign'}
          </span>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontSize: '19px', fontWeight: 600,
                  color: 'var(--es-charcoal)', margin: 0, lineHeight: 1.25,
                }}>
                  {item.name}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--es-charcoal-60)', marginTop: '4px' }}>
                  {item.variant || 'Signature Edition'}
                </p>
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', fontWeight: 600, color: 'var(--es-charcoal)' }}>
                ₹{(price * item.qty).toLocaleString('en-IN')}
              </span>
            </div>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontStyle: 'italic', color: 'var(--es-charcoal-60)', marginTop: '8px' }}>
              <span className="es-pulse-dot" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--es-emerald)' }} />
              {item.ritual || 'Curated beauty ritual · apply gently'}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: '12px' }}>
            {/* Qty */}
            <div style={{
              display: 'flex', alignItems: 'center',
              background: '#ffffff', borderRadius: '100px',
              border: '1px solid var(--es-charcoal-10)',
              padding: '2px',
            }}>
              <button
                onClick={() => onQty(item.id, item.qty - 1)}
                style={{
                  width: 32, height: 32, borderRadius: '50%', border: 'none',
                  background: 'transparent',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--es-charcoal-60)', transition: 'all 0.2s',
                }}
                className="qty-btn"
                aria-label="Decrease"
              >
                −
              </button>
              <span style={{
                minWidth: 28, textAlign: 'center',
                fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--es-charcoal)',
              }}>
                {item.qty}
              </span>
              <button
                onClick={() => onQty(item.id, item.qty + 1)}
                style={{
                  width: 32, height: 32, borderRadius: '50%', border: 'none',
                  background: 'transparent',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--es-charcoal-60)', transition: 'all 0.2s',
                }}
                className="qty-btn"
                aria-label="Increase"
              >
                +
              </button>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.22em', fontWeight: 600 }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--es-charcoal-60)', cursor: 'pointer', transition: 'color 0.2s' }} className="action-txt-btn">
                Save for later
              </button>
              <button
                onClick={() => onRemove(item.id)}
                style={{ background: 'none', border: 'none', color: 'var(--es-blush-deep)', cursor: 'pointer', transition: 'color 0.2s' }}
                className="action-txt-btn-delete"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

/* ── Main CartPage Component ── */
function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQty, totalPrice } = useSelector(state => state.cart);

  const [promoCode, setPromoCode] = React.useState('');
  const [promoApplied, setPromoApplied] = React.useState(null);
  const [discount, setDiscount] = React.useState(0);
  const [shippingType, setShippingType] = React.useState('standard');
  const [giftWrap, setGiftWrap] = React.useState(false);
  const [giftNote, setGiftNote] = React.useState('');
  const [orderError, setOrderError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Dynamic suggested products
  const [suggestedProducts, setSuggestedProducts] = React.useState([]);

  const cartIdsString = items.map(i => i.id).join(',');

  React.useEffect(() => {
    API.ProductAPI.getProductList()
      .then(res => {
        if (res.status === 'Success' && Array.isArray(res.data)) {
          const cartIds = new Set(items.map(item => item.id));
          const available = res.data.filter(prod => !cartIds.has(prod.id));
          const shuffled = [...available].sort(() => 0.5 - Math.random());
          setSuggestedProducts(shuffled.slice(0, 3));
        }
      })
      .catch(err => console.error("Error fetching recommended products:", err));
  }, [cartIdsString]);

  const resolveProductImg = (product) => {
    if (product.product_image?.[0]?.image_src) {
      const src = product.product_image[0].image_src;
      return src.startsWith('http') ? src : `${SAS_URL}/${PRODUCT_FOLDER}/${src}`;
    }
    return 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=400&q=80';
  };

  const handleAddToCart = (product) => {
    const img = resolveProductImg(product);
    dispatch(addToCart({ ...product, productImg: img }));
  };

  const shippingCost = shippingType === 'standard'
    ? (totalPrice >= 1500 ? 0 : 99)
    : shippingType === 'express' ? 249 : 499;

  const giftWrapCost = giftWrap ? 640 : 0;
  const tax = Math.floor((totalPrice - discount) * 0.08);
  const grandTotal = totalPrice - discount + shippingCost + giftWrapCost + tax;

  const handlePromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      const rate = PROMO_CODES[code];
      setDiscount(Math.floor(totalPrice * rate));
      setPromoApplied({ code, rate });
    } else {
      setPromoApplied(null);
      setDiscount(0);
    }
  };


  const handlePayNow = async () => {
    setOrderError('');

    if (!API.CustomerAPI.isLoggedIn()) {
      setOrderError('Please login to place an order. Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    setIsProcessing(true);
    try {
      await loadRazorpayScript();
      const customerToken = API.CustomerAPI.getToken();
      const customer = API.CustomerAPI.getCustomer() || {};

      const orderPayload = {
        total_amount: grandTotal,
        payment_method: 'card',
        useWallet: false,
        items: items.map(item => ({
            product_id: item.id,
            quantity: item.qty,
            price: Number(item.discounted_price || item.price || 0)
        })),
        shipping_address: {
            name: customer.username || 'Customer',
            email: customer.email || '',
            phone: customer.phone || '',
            address: giftWrap ? `GIFT WRAPPED. Note: ${giftNote.substring(0, 140)}` : 'Default Address',
            city: 'Default City',
            pincode: '000000'
        }
      };

      const response = await api.post('/orders', orderPayload, {
        headers: { Authorization: `Bearer ${customerToken}` }
      });

      const responseOk = (response.data && response.data.status === 'Success') || response.status === 200;

      if (responseOk) {
          const data = response.data?.data || response.data;

          if (data?.payment?.status === 'payment_pending') {
              const rpOrder = data.payment.razorpay_order;

              if (!window.Razorpay) {
                  setOrderError('Razorpay SDK failed to load.');
                  setIsProcessing(false);
                  return;
              }

              const options = {
                  description: 'Order Payment - Eden Sign',
                  image: 'https://i.imgur.com/3g7nmJC.png',
                  currency: 'INR',
                  key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_xxxxxx',
                  amount: rpOrder.amount,
                  name: 'Eden Sign',
                  order_id: rpOrder.id,
                  prefill: {
                    name: customer.username || '',
                    email: customer.email || '',
                    contact: customer.phone || ''
                  },
                  notes: { orderId: data.order?.id },
                  theme: { color: '#0f5d4e' },
                  config: {
                    display: {
                      blocks: {
                        upi: {
                          name: 'Pay via UPI',
                          instruments: [{ method: 'upi' }]
                        },
                        other: {
                          name: 'Other Payment Modes',
                          instruments: [{ method: 'card' }, { method: 'netbanking' }, { method: 'wallet' }]
                        }
                      },
                      sequence: ['block.upi', 'block.other'],
                      preferences: { show_default_blocks: true }
                    }
                  },
                  handler: async function (rpData) {
                    try {
                        await api.post('/wallet/verify-payment', {
                            razorpay_order_id: rpData.razorpay_order_id,
                            razorpay_payment_id: rpData.razorpay_payment_id,
                            razorpay_signature: rpData.razorpay_signature,
                            type: 'order',
                            reference_id: data.order?.id
                        }, { headers: { Authorization: `Bearer ${customerToken}` } });

                        dispatch(clearCart());
                        navigate('/dashboard');
                    } catch (err) {
                        setOrderError('Payment was received but verification failed. Please contact support.');
                        setIsProcessing(false);
                    }
                  },
                  modal: {
                    ondismiss: function () {
                      setOrderError('Payment was cancelled. Your cart is saved.');
                      setIsProcessing(false);
                    }
                  }
              };

              const paymentObject = new window.Razorpay(options);
              paymentObject.open();
          } else {
              dispatch(clearCart());
              navigate('/dashboard');
          }
      } else {
        setOrderError(response.data?.data || 'Failed to place order.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Order error:', error);
      setOrderError(error.response?.data?.data || 'Failed to process order.');
      setIsProcessing(false);
    }
  };

  const isEmpty = items.length === 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--es-background)', paddingTop: '72px' }}>
      <style>{`
        .cart-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .qty-btn:hover {
          background: rgba(15, 93, 78, 0.08) !important;
          color: var(--es-emerald) !important;
        }
        .action-txt-btn:hover {
          color: var(--es-emerald) !important;
        }
        .action-txt-btn-delete:hover {
          color: #ef4444 !important;
        }
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: var(--es-white);
          border: 1px solid var(--es-charcoal-10);
          transition: .3s;
          border-radius: 24px;
        }
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 3px;
          background-color: var(--es-cream-deep);
          transition: .3s;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(26,21,18,0.1);
        }
        .toggle-switch input:checked + .toggle-slider {
          background-color: var(--es-emerald);
          border-color: var(--es-emerald);
        }
        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(22px);
          background-color: var(--es-cream);
        }
        .shipping-radio {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid var(--es-charcoal-10);
          background: var(--es-white);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .shipping-radio.selected {
          border-color: var(--es-emerald);
          background: rgba(15, 93, 78, 0.04);
        }
        .shipping-radio:hover:not(.selected) {
          border-color: var(--es-blush-deep);
        }
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 20px;
          text-align: center;
        }
        .trust-card {
          border-radius: 16px;
          border: 1px solid var(--es-charcoal-10);
          background: rgba(255, 255, 255, 0.6);
          padding: 12px 8px;
        }
        .rec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 24px;
        }
        .rec-card-add-btn:hover {
          background: var(--es-charcoal) !important;
          color: var(--es-cream) !important;
        }
        @media (max-width: 1024px) {
          .cart-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .rec-grid { grid-template-columns: 1fr; }
          .cart-row-inner { flex-direction: column !important; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--es-charcoal-10)' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1, opacity: 0.6 }}>
          <div style={{ position: 'absolute', left: '-100px', top: '20px', height: '300px', width: '300px', borderRadius: '50%', background: 'var(--es-blush-soft)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', right: '-80px', bottom: '0', height: '320px', width: '320px', borderRadius: '50%', background: 'var(--es-cream-deep)', filter: 'blur(80px)' }} />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 40px' }}>
          <Link
            to="/products"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.24em',
              color: 'var(--es-charcoal-60)', textDecoration: 'none', transition: 'color 0.2s'
            }}
          >
            <span>←</span> Back to marketplace
          </Link>
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'space-between' }} className="hero-flex-layout">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '11px', color: 'var(--es-emerald)', fontWeight: 700, margin: 0 }}>
                Chapter · Checkout
              </p>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '48px', color: 'var(--es-charcoal)', fontWeight: 500, margin: 0, lineHeight: 1.05 }}>
                Your <em style={{ fontStyle: 'italic', color: 'var(--es-emerald)' }}>shopping</em> bag
              </h1>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', color: 'var(--es-charcoal-60)', margin: '8px 0 0', maxWidth: '600px', lineHeight: 1.6 }}>
                A quiet moment before checkout. Every essence is packed by hand at our atelier partners and shipped with a written note from the maker.
              </p>
            </div>
            
            {/* Steps progress */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '11px', fontWeight: 600, color: 'var(--es-charcoal-60)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-flex', height: '28px', width: '28px', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'var(--es-emerald)', color: 'var(--es-cream)', fontSize: '10px' }}>01</span>
                <span style={{ color: 'var(--es-charcoal)' }}>Bag</span>
              </div>
              <span style={{ height: '1px', width: '32px', background: 'var(--es-charcoal-10)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-flex', height: '28px', width: '28px', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid var(--es-charcoal-40)', fontSize: '10px' }}>02</span>
                <span>Details</span>
              </div>
              <span style={{ height: '1px', width: '32px', background: 'var(--es-charcoal-10)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-flex', height: '28px', width: '28px', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid var(--es-charcoal-40)', fontSize: '10px' }}>03</span>
                <span>Ritual</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 24px 80px' }}>
        {isEmpty ? (
          <EmptyCart onShop={() => navigate('/products')} />
        ) : (
          <div className="cart-grid">
            {/* LEFT COLUMN: CURATED SELECTION */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 500, margin: 0, color: 'var(--es-charcoal)' }}>
                  Curated selection
                </h2>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.24em', color: 'var(--es-charcoal-60)' }}>
                  {items.length} {items.length === 1 ? 'essence' : 'essences'}
                </span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {items.map(item => (
                  <CartRow
                    key={item.id}
                    item={item}
                    onRemove={id => dispatch(removeFromCart(id))}
                    onQty={(id, qty) => dispatch(updateCartQty(id, qty))}
                  />
                ))}
              </ul>

              {/* Signature Gifting section */}
              <div style={{
                marginTop: '32px', borderRadius: 'var(--es-radius)',
                border: '1.5px dashed var(--es-blush)',
                background: 'rgba(244, 201, 196, 0.08)',
                padding: '24px',
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ textTransform: 'uppercase', letterSpacing: '0.28em', fontSize: '10px', color: 'var(--es-emerald)', fontWeight: 700, margin: 0 }}>
                      Signature gifting
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', margin: '8px 0 4px', color: 'var(--es-charcoal)' }}>
                      Wrap in linen with a handwritten note
                    </h3>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--es-charcoal-60)', margin: 0 }}>
                      Presented in a Fraunces-printed keepsake box, tied in silk ribbon. +₹640
                    </p>
                  </div>
                  <label style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', gap: '12px', userSelect: 'none' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.22em', fontWeight: 600 }}>Add wrap</span>
                    <span className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={giftWrap}
                        onChange={(e) => setGiftWrap(e.target.checked)}
                      />
                      <span className="toggle-slider" />
                    </span>
                  </label>
                </div>
                {giftWrap && (
                  <textarea
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Write your note — up to 140 characters, hand-lettered by our atelier."
                    maxLength={140}
                    rows={2}
                    style={{
                      marginTop: '16px', width: '100%', resize: 'none',
                      borderRadius: '16px', border: '1px solid var(--es-charcoal-10)',
                      background: 'rgba(255, 255, 255, 0.8)',
                      padding: '12px 16px', fontFamily: 'var(--font-sans)', fontSize: '13.5px',
                      color: 'var(--es-charcoal)', outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--es-emerald)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--es-charcoal-10)'}
                  />
                )}
              </div>

              {/* Suggested Pairs Beautifully section */}
              {suggestedProducts.length > 0 && (
                <div style={{ marginTop: '56px' }}>
                  <div>
                    <p style={{ textTransform: 'uppercase', letterSpacing: '0.28em', fontSize: '10px', color: 'var(--es-emerald)', fontWeight: 700, margin: 0 }}>
                      Pairs beautifully
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', margin: '6px 0 0', color: 'var(--es-charcoal)' }}>
                      To complete your ritual
                    </h3>
                  </div>
                  <div className="rec-grid">
                    {suggestedProducts.map(prod => {
                      const img = resolveProductImg(prod);
                      return (
                        <div
                          key={prod.id}
                          style={{
                            overflow: 'hidden', borderRadius: '24px',
                            border: '1px solid var(--es-charcoal-10)',
                            background: 'rgba(255,255,255,0.6)',
                            display: 'flex', flexDirection: 'column',
                          }}
                        >
                          <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden' }}>
                            <img
                              src={img}
                              alt={prod.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            />
                          </div>
                          <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                              <p style={{ textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '9px', color: 'var(--es-charcoal-60)', margin: 0 }}>
                                {prod.brand || 'Atelier'}
                              </p>
                              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', margin: '4px 0 12px', lineHeight: 1.25, color: 'var(--es-charcoal)' }}>
                                {prod.name}
                              </h4>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 600, color: 'var(--es-charcoal)' }}>
                                ₹{Number(prod.discounted_price || prod.price).toLocaleString('en-IN')}
                              </span>
                              <button
                                onClick={() => handleAddToCart(prod)}
                                style={{
                                  borderRadius: '100px', border: '1px solid var(--es-charcoal)',
                                  background: 'transparent', color: 'var(--es-charcoal)',
                                  padding: '6px 16px', fontSize: '9px', fontWeight: 600,
                                  textTransform: 'uppercase', letterSpacing: '0.22em',
                                  cursor: 'pointer', transition: 'all 0.25s ease',
                                }}
                                className="rec-card-add-btn"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY */}
            <aside style={{ position: 'sticky', top: '96px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)',
                borderRadius: 'var(--es-radius)', border: '1px solid var(--es-charcoal-10)',
                overflow: 'hidden',
              }}>
                {/* Summary banner */}
                <div style={{
                  padding: '20px 24px',
                  background: 'var(--es-emerald)',
                  color: 'var(--es-cream)',
                }}>
                  <p style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '9px', opacity: 0.8, margin: 0 }}>
                    Order summary
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', margin: '4px 0 0', fontWeight: 500 }}>
                    A moment of ceremony
                  </h3>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Prices */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px' }}>
                    <span style={{ color: 'var(--es-charcoal-60)' }}>Subtotal</span>
                    <span style={{ fontWeight: 600, color: 'var(--es-charcoal)' }}>
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {promoApplied && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px' }}>
                      <span style={{ color: 'var(--es-emerald)' }}>Promo · {promoApplied.code}</span>
                      <span style={{ fontWeight: 600, color: 'var(--es-emerald)' }}>
                        −₹{discount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px' }}>
                    <span style={{ color: 'var(--es-charcoal-60)' }}>
                      {shippingType === 'standard' ? 'Standard delivery' : shippingType === 'express' ? 'Express delivery' : 'Concierge white-glove'}
                    </span>
                    <span style={{ fontWeight: 600, color: 'var(--es-charcoal)' }}>
                      {shippingCost === 0 ? 'Complimentary' : `₹${shippingCost}`}
                    </span>
                  </div>

                  {giftWrap && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px' }}>
                      <span style={{ color: 'var(--es-charcoal-60)' }}>Linen gift wrap</span>
                      <span style={{ fontWeight: 600, color: 'var(--es-charcoal)' }}>
                        ₹{giftWrapCost}
                      </span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px' }}>
                    <span style={{ color: 'var(--es-charcoal-60)' }}>Estimated tax (8%)</span>
                    <span style={{ fontWeight: 600, color: 'var(--es-charcoal)' }}>
                      ₹{tax}
                    </span>
                  </div>

                  {/* Divider */}
                  <div style={{ borderTop: '1px solid var(--es-charcoal-10)', paddingBottom: '4px' }} />

                  {/* Grand total */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ textTransform: 'uppercase', letterSpacing: '0.28em', fontSize: '10px', color: 'var(--es-charcoal-60)', fontWeight: 600 }}>
                        Total
                      </span>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--es-emerald)', fontWeight: 500 }}>
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--es-charcoal-60)', margin: '4px 0 0' }}>
                      Or 4 payments of ₹{(grandTotal / 4).toFixed(0)} with Atelier Pay.
                    </p>
                  </div>

                  {/* Delivery Selection */}
                  <div style={{ marginTop: '8px' }}>
                    <p style={{ textTransform: 'uppercase', letterSpacing: '0.28em', fontSize: '9px', color: 'var(--es-charcoal-60)', fontWeight: 700, marginBottom: '12px' }}>
                      Delivery option
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { k: 'standard', title: 'Standard', sub: '3–5 days · free over ₹1500' },
                        { k: 'express', title: 'Express', sub: '1–2 days · ₹249' },
                        { k: 'concierge', title: 'Concierge', sub: 'Same-day white-glove · ₹499' }
                      ].map(opt => (
                        <div
                          key={opt.k}
                          onClick={() => setShippingType(opt.k)}
                          className={`shipping-radio ${shippingType === opt.k ? 'selected' : ''}`}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{
                              display: 'inline-block', height: '14px', width: '14px', borderRadius: '50%',
                              border: `1px solid ${shippingType === opt.k ? 'var(--es-emerald)' : 'var(--es-charcoal-40)'}`,
                              background: shippingType === opt.k ? 'var(--es-emerald)' : 'transparent',
                              boxShadow: shippingType === opt.k ? 'inset 0 0 0 2px var(--es-white)' : 'none',
                            }} />
                            <div>
                              <span style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--es-charcoal)' }}>{opt.title}</span>
                              <span style={{ display: 'block', fontSize: '11px', color: 'var(--es-charcoal-60)' }}>{opt.sub}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div style={{ marginTop: '8px' }}>
                    <p style={{ textTransform: 'uppercase', letterSpacing: '0.28em', fontSize: '9px', color: 'var(--es-charcoal-60)', fontWeight: 700, marginBottom: '12px' }}>
                      Promo code
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        placeholder="Try EDEN10"
                        style={{
                          flex: 1, padding: '10px 16px', borderRadius: '100px',
                          border: `1px solid ${promoApplied ? 'rgba(34,197,94,0.5)' : 'var(--es-charcoal-10)'}`,
                          fontFamily: 'var(--font-sans)', fontSize: '13px',
                          color: 'var(--es-charcoal)', outline: 'none',
                          background: promoApplied ? 'rgba(34,197,94,0.05)' : '#ffffff',
                          transition: 'border-color 0.2s',
                        }}
                      />
                      <button
                        onClick={handlePromo}
                        style={{
                          padding: '10px 20px', borderRadius: '100px', border: 'none',
                          background: 'var(--es-charcoal)',
                          color: 'var(--es-cream)', cursor: 'pointer',
                          fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
                          letterSpacing: '0.22em', textTransform: 'uppercase',
                        }}
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && (
                      <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--es-emerald)', margin: '8px 0 0' }}>
                        {(promoApplied.rate * 100).toFixed(0)}% off applied. A little gift from Eden.
                      </p>
                    )}
                  </div>

                  {orderError && (
                    <div style={{
                      background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)',
                      borderRadius: '8px', padding: '12px 16px',
                      fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#b91c1c', lineHeight: 1.5
                    }}>
                      ⚠️ {orderError}
                    </div>
                  )}

                  {/* Checkout button */}
                  <motion.button
                    id="checkout-btn"
                    disabled={isProcessing}
                    whileHover={{ scale: isProcessing ? 1 : 0.98 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.96 }}
                    onClick={handlePayNow}
                    style={{
                      width: '100%', padding: '16px',
                      background: 'var(--es-charcoal)',
                      color: 'var(--es-cream)', border: 'none', borderRadius: '100px',
                      cursor: isProcessing ? 'wait' : 'pointer', opacity: isProcessing ? 0.8 : 1,
                      fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600,
                      letterSpacing: '0.28em', textTransform: 'uppercase',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      boxShadow: '0 4px 16px rgba(26,21,18,0.15)',
                      transition: 'all 0.3s ease',
                      marginTop: '8px',
                    }}
                    onMouseEnter={(e) => { if (!isProcessing) e.target.style.background = 'var(--es-emerald)'; }}
                    onMouseLeave={(e) => { if (!isProcessing) e.target.style.background = 'var(--es-charcoal)'; }}
                  >
                    {isProcessing ? 'Processing...' : 'Proceed to checkout'} <ArrowForwardIcon sx={{ fontSize: 16 }} />
                  </motion.button>

                  <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--es-charcoal-60)', margin: '4px 0 0' }}>
                    Secure checkout · encrypted with 256-bit SSL
                  </p>
                </div>
              </div>

              {/* Trust strip */}
              <div className="trust-grid">
                <div className="trust-card">
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: 600, color: 'var(--es-charcoal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Free returns</p>
                  <p style={{ margin: '4px 0 0', fontSize: '9px', color: 'var(--es-charcoal-60)' }}>within 30 days</p>
                </div>
                <div className="trust-card">
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: 600, color: 'var(--es-charcoal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ethically sourced</p>
                  <p style={{ margin: '4px 0 0', fontSize: '9px', color: 'var(--es-charcoal-60)' }}>atelier partners</p>
                </div>
                <div className="trust-card">
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: 600, color: 'var(--es-charcoal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Carbon neutral</p>
                  <p style={{ margin: '4px 0 0', fontSize: '9px', color: 'var(--es-charcoal-60)' }}>shipping</p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}

export default CartPage;
