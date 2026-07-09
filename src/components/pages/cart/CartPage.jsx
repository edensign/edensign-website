/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { removeFromCart, updateCartQty, clearCart } from '../../../redux/actions/CartAction';
import API from '../../../apis';
import { api } from '../../../apis/config/axiosConfig';
import { loadRazorpayScript } from '../../utils/razorpay';


/* ── Empty cart state ── */
const EmptyCart = ({ onShop }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    style={{ textAlign: 'center', padding: '100px 24px' }}
  >
    <div style={{
      width: 100, height: 100, borderRadius: '28px',
      background: 'linear-gradient(135deg, rgba(199,149,108,0.12), rgba(199,149,108,0.06))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: '0 auto 24px',
      boxShadow: '0 8px 32px rgba(199,149,108,0.15)',
    }}>
      <ShoppingBagOutlinedIcon sx={{ fontSize: 44, color: '#c7956c' }} />
    </div>
    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#1a0f08', margin: '0 0 10px' }}>
      Your Cart is Empty
    </h2>
    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#9a8070', margin: '0 0 32px', lineHeight: 1.6 }}>
      Looks like you haven't added any products yet.<br />Let's find something for you!
    </p>
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onShop}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '14px 32px', borderRadius: '100px',
        background: 'linear-gradient(135deg, #1a0a00, #3d1e0a)',
        color: '#fff', border: 'none', cursor: 'pointer',
        fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600,
        letterSpacing: '0.05em',
        boxShadow: '0 4px 20px rgba(26,10,0,0.2)',
      }}
    >
      <ShoppingBagOutlinedIcon sx={{ fontSize: 18 }} /> Browse Products
    </motion.button>
  </motion.div>
);

/* ── Individual cart row ── */
const CartRow = ({ item, onRemove, onQty }) => {
  const price = Number(item.discounted_price || item.price || 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '20px',
        padding: '16px 20px', background: '#ffffff',
        borderRadius: '12px', border: '1px solid rgba(213, 195, 184, 0.5)',
        boxShadow: '0 8px 30px rgba(127, 85, 50, 0.04)',
        marginBottom: '14px',
      }}
    >
      {/* Product image */}
      <div style={{
        width: 80, height: 80, borderRadius: '8px',
        background: '#ffffff', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        border: '1px solid rgba(213, 195, 184, 0.4)',
      }}>
        {item.productImg
          ? <img src={item.productImg} alt={item.name} style={{ maxWidth: '70px', maxHeight: '70px', objectFit: 'contain' }} />
          : <ShoppingBagOutlinedIcon sx={{ fontSize: 28, color: 'var(--es-primary)' }} />
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span className="font-label-caps" style={{
          fontSize: '9px', color: 'var(--es-primary)',
        }}>
          {item.brand}
        </span>
        <h4 style={{
          fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 600,
          color: 'var(--es-espresso)', margin: 0, lineHeight: 1.3,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {item.name}
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 700, color: 'var(--es-espresso)' }}>
            ₹{price.toLocaleString('en-IN')}
          </span>
          {item.price && Number(item.price) !== price && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--es-on-surface-variant)', opacity: 0.6, textDecoration: 'line-through' }}>
              ₹{Number(item.price).toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>

      {/* Qty controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '2px',
        background: 'var(--es-surface-container)', borderRadius: '4px',
        padding: '4px',
        flexShrink: 0,
      }}>
        <button
          onClick={() => onQty(item.id, item.qty - 1)}
          style={{
            width: 30, height: 30, borderRadius: '4px', border: 'none',
            background: item.qty === 1 ? 'rgba(213,195,184,0.1)' : 'rgba(213,195,184,0.3)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--es-espresso)', transition: 'background 0.2s',
          }}
          aria-label="Decrease"
        >
          <RemoveIcon sx={{ fontSize: 14 }} />
        </button>
        <span style={{
          minWidth: 32, textAlign: 'center',
          fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700, color: 'var(--es-espresso)',
        }}>
          {item.qty}
        </span>
        <button
          onClick={() => onQty(item.id, item.qty + 1)}
          style={{
            width: 30, height: 30, borderRadius: '4px', border: 'none',
            background: 'rgba(213,195,184,0.3)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--es-espresso)', transition: 'background 0.2s',
          }}
          aria-label="Increase"
        >
          <AddIcon sx={{ fontSize: 14 }} />
        </button>
      </div>

      {/* Subtotal */}
      <div style={{
        minWidth: 80, textAlign: 'right', flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--es-primary)',
          display: 'block',
        }}>
          ₹{(price * item.qty).toLocaleString('en-IN')}
        </span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--es-on-surface-variant)', opacity: 0.6 }}>
          subtotal
        </span>
      </div>

      {/* Remove */}
      <motion.button
        whileHover={{ scale: 1.1, color: '#ef4444' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onRemove(item.id)}
        style={{
          width: 36, height: 36, borderRadius: '10px', border: 'none',
          background: 'rgba(239,68,68,0.07)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#ef4444', transition: 'background 0.2s', flexShrink: 0,
        }}
        aria-label="Remove item"
      >
        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
      </motion.button>
    </motion.div>
  );
};

/* ── Main CartPage ── */
function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQty, totalPrice } = useSelector(state => state.cart);

  const [promoCode, setPromoCode] = React.useState('');
  const [promoApplied, setPromoApplied] = React.useState(false);
  const [discount, setDiscount] = React.useState(0);
  const [orderError, setOrderError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const shipping = 99; // flat rate for now
  const grandTotal = totalPrice - discount + (totalPrice > 0 ? shipping : 0);

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === 'EDEN10') {
      setDiscount(Math.floor(totalPrice * 0.10));
      setPromoApplied(true);
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
            address: 'Default Address',
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
                  theme: { color: '#c7956c' },
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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--es-background)', paddingTop: '96px' }}>
      <style>{`
        @media (max-width: 900px) {
          .cart-layout { flex-direction: column !important; }
          .cart-summary { width: 100% !important; }
        }
        @media (max-width: 600px) {
          .cart-row-inner { flex-wrap: wrap; gap: 12px !important; }
          .cart-row-qty { order: 3; }
          .cart-row-subtotal { order: 4; min-width: 60px !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
          <motion.button
            whileHover={{ x: -3 }}
            onClick={() => navigate('/products')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              color: 'var(--es-on-surface-variant)', padding: '6px 0', transition: 'color 0.2s',
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to Products
          </motion.button>
          <div style={{ width: 1, height: 20, background: 'rgba(213,195,184,0.5)' }} />
          <div>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '32px', fontWeight: 600, color: 'var(--es-espresso)',
              margin: 0, lineHeight: 1.15,
            }}>
              Your Shopping Bag
            </h1>
            {items.length > 0 && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--es-on-surface-variant)', opacity: 0.8, margin: '4px 0 0' }}>
                {totalQty} item{totalQty !== 1 ? 's' : ''} in your bag
              </p>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyCart onShop={() => navigate('/products')} />
        ) : (
          <div className="cart-layout" style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>

            {/* ── Left: items list ── */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <span className="font-label-caps" style={{ fontSize: '11px', color: 'var(--es-primary)' }}>
                  Your Items
                </span>
                <button
                  onClick={() => dispatch(clearCart())}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#ef4444',
                    fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '4px 8px', borderRadius: '8px',
                    transition: 'background 0.2s',
                  }}
                  className="cart-clear-btn"
                >
                  <DeleteOutlineIcon sx={{ fontSize: 15 }} /> Clear All
                </button>
              </div>

              <AnimatePresence>
                {items.map(item => (
                  <CartRow
                    key={item.id}
                    item={item}
                    onRemove={id => dispatch(removeFromCart(id))}
                    onQty={(id, qty) => dispatch(updateCartQty(id, qty))}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* ── Right: order summary ── */}
            <div className="cart-summary" style={{ width: '360px', flexShrink: 0 }}>
              <div style={{
                background: '#ffffff', borderRadius: '16px',
                border: '1px solid rgba(213, 195, 184, 0.5)',
                boxShadow: '0 15px 40px rgba(127,85,50,0.04)',
                overflow: 'hidden',
              }}>
                {/* Summary header */}
                <div style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid rgba(213,195,184,0.4)',
                  background: 'var(--es-surface-container)',
                }}>
                  <h2 style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '14px',
                    fontWeight: 700, color: 'var(--es-espresso)', margin: 0,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>
                    Order Summary
                  </h2>
                </div>

                <div style={{ padding: '24px' }}>
                  {/* Line items */}
                  {[
                    { label: `Subtotal (${totalQty} items)`, value: `₹${totalPrice.toLocaleString('en-IN')}` },
                    ...(discount > 0 ? [{ label: 'Promo Discount (10%)', value: `−₹${discount.toLocaleString('en-IN')}`, green: true }] : []),
                    { label: 'Shipping', value: shipping === 0 ? 'FREE' : `₹${shipping}`, green: shipping === 0 },
                  ].map(({ label, value, green }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-on-surface-variant)', opacity: 0.9 }}>{label}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: green ? '#16a34a' : 'var(--es-espresso)' }}>
                        {value}
                      </span>
                    </div>
                  ))}

                  {/* Free shipping nudge */}
                  {shipping > 0 && (
                    <div style={{
                      background: 'var(--es-surface-container)',
                      borderRadius: '8px', padding: '10px 14px',
                      marginBottom: '18px',
                      fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--es-primary)',
                      border: '1px solid rgba(213, 195, 184, 0.4)',
                    }}>
                      Add ₹{(999 - totalPrice + 1).toLocaleString('en-IN')} more for <strong>free shipping</strong>!
                    </div>
                  )}

                  {/* Promo code */}
                  <div style={{ marginBottom: '20px' }}>
                    <label className="font-label-caps" style={{ fontSize: '10px', color: 'var(--es-on-surface-variant)', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                      <LocalOfferOutlinedIcon sx={{ fontSize: 14 }} /> Promo Code
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        placeholder="EDEN10"
                        disabled={promoApplied}
                        style={{
                          flex: 1, padding: '10px 14px', borderRadius: '4px',
                          border: `1.5px solid ${promoApplied ? 'rgba(34,197,94,0.5)' : 'var(--es-outline-variant)'}`,
                          fontFamily: 'Inter, sans-serif', fontSize: '13px',
                          color: 'var(--es-espresso)', outline: 'none',
                          background: promoApplied ? 'rgba(34,197,94,0.05)' : '#ffffff',
                        }}
                      />
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePromo}
                        disabled={promoApplied}
                        style={{
                          padding: '10px 16px', borderRadius: '4px', border: 'none',
                          background: promoApplied
                            ? 'linear-gradient(135deg, #16a34a, #22c55e)'
                            : 'linear-gradient(135deg, #c7956c 0%, #7f5532 100%)',
                          color: '#fff', cursor: promoApplied ? 'default' : 'pointer',
                          fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
                          letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                        }}
                      >
                        {promoApplied ? '✓ Applied' : 'Apply'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ borderTop: '1px solid rgba(213, 195, 184, 0.4)', marginBottom: '18px' }} />

                  {/* Grand total */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: 'var(--es-espresso)' }}>
                      Total
                    </span>
                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 600, color: 'var(--es-primary)' }}>
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {orderError && (
                    <div style={{
                      background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)',
                      borderRadius: '4px', padding: '12px 16px', marginBottom: '16px',
                      fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#b91c1c', lineHeight: 1.5
                    }}>
                      ⚠️ {orderError}
                    </div>
                  )}

                  {/* Checkout CTA */}
                  <motion.button
                    id="checkout-btn"
                    disabled={isProcessing}
                    whileHover={{ scale: isProcessing ? 1 : 0.98 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.96 }}
                    onClick={handlePayNow}
                    style={{
                      width: '100%', padding: '16px',
                      background: 'linear-gradient(135deg, #c7956c 0%, #7f5532 100%)',
                      color: '#fff', border: 'none', borderRadius: '100px',
                      cursor: isProcessing ? 'wait' : 'pointer', opacity: isProcessing ? 0.8 : 1,
                      fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      display: 'flex', alignItems: 'center', justifyWarehouse: 'center', justifyContent: 'center', gap: '8px',
                      boxShadow: '0 4px 20px rgba(127, 85, 50, 0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {isProcessing ? 'Processing...' : 'Pay Now'} <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  </motion.button>

                  {/* Trust badges */}
                  <div style={{
                    marginTop: '20px', display: 'flex', justifyContent: 'center',
                    gap: '16px', flexWrap: 'wrap',
                  }}>
                    {['🔒 Secure Payment', '🚚 Fast Delivery', '↩️ Easy Returns'].map(t => (
                      <span key={t} style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'var(--es-on-surface-variant)', opacity: 0.6, fontWeight: 600, letterSpacing: '0.05em' }}>
                        {t.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
