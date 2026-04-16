/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import { clearCart } from '../../../redux/actions/CartAction';

/* ── helpers ── */
const inputStyle = (focus) => ({
  width: '100%',
  padding: '13px 16px',
  borderRadius: '12px',
  border: `1.5px solid ${focus ? '#c7956c' : 'rgba(199,149,108,0.28)'}`,
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  color: '#1a0f08',
  outline: 'none',
  background: '#fff',
  boxSizing: 'border-box',
  transition: 'border 0.2s',
});

const labelStyle = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 600,
  color: '#6b5749',
  display: 'block',
  marginBottom: '7px',
  letterSpacing: '0.04em',
};

/* ── Step indicator ── */
const StepBar = ({ step }) => {
  const steps = [
    { icon: LocalShippingOutlinedIcon, label: 'Delivery' },
    { icon: PaymentOutlinedIcon, label: 'Payment' },
    { icon: VerifiedOutlinedIcon, label: 'Confirm' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px', gap: 0 }}>
      {steps.map(({ icon: Icon, label }, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <React.Fragment key={label}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <motion.div
                animate={{
                  background: done ? '#16a34a' : active ? 'linear-gradient(135deg, #c7956c, #a8724d)' : '#e8e0d8',
                  scale: active ? 1.12 : 1,
                }}
                transition={{ duration: 0.25 }}
                style={{
                  width: 42, height: 42, borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: done ? '#16a34a' : active ? 'linear-gradient(135deg, #c7956c, #a8724d)' : '#e8e0d8',
                  boxShadow: active ? '0 4px 16px rgba(199,149,108,0.4)' : 'none',
                  transition: 'all 0.3s',
                }}
              >
                {done
                  ? <CheckCircleIcon sx={{ fontSize: 22, color: '#fff' }} />
                  : <Icon sx={{ fontSize: 20, color: active ? '#fff' : '#9a8070' }} />
                }
              </motion.div>
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: '11px',
                fontWeight: active ? 700 : 500,
                color: active ? '#c7956c' : done ? '#16a34a' : '#9a8070',
              }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                flex: 1, height: 2, maxWidth: 80, margin: '0 8px',
                marginBottom: 24,
                background: done ? '#16a34a' : 'rgba(199,149,108,0.18)',
                transition: 'background 0.4s',
                borderRadius: '2px',
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* ── FocusInput ── */
const FocusInput = ({ label, ...props }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={inputStyle(focus)}
      />
    </div>
  );
};

/* ── Step 1: Delivery ── */
const DeliveryStep = ({ form, setForm, onNext }) => {
  const valid = form.name && form.email && form.phone && form.address && form.city && form.pincode;

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#1a0f08', margin: '0 0 24px' }}>
        Delivery Information
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <FocusInput label="Full Name *" placeholder="Mohsin Ali" value={form.name} onChange={set('name')} />
        <FocusInput label="Email Address *" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
        <FocusInput label="Phone Number *" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
        <FocusInput label="Pincode *" placeholder="400001" value={form.pincode} onChange={set('pincode')} />
      </div>

      <div style={{ marginTop: '16px' }}>
        <FocusInput label="Street Address *" placeholder="House No., Street, Area" value={form.address} onChange={set('address')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
        <FocusInput label="City *" placeholder="Mumbai" value={form.city} onChange={set('city')} />
        <FocusInput label="State" placeholder="Maharashtra" value={form.state} onChange={set('state')} />
      </div>

      <motion.button
        whileHover={{ scale: valid ? 1.02 : 1 }}
        whileTap={{ scale: valid ? 0.97 : 1 }}
        onClick={onNext}
        disabled={!valid}
        style={{
          marginTop: '28px', width: '100%', padding: '16px',
          borderRadius: '14px', border: 'none', cursor: valid ? 'pointer' : 'not-allowed',
          background: valid ? 'linear-gradient(135deg, #1a0a00, #3d1e0a)' : 'rgba(199,149,108,0.2)',
          color: valid ? '#fff' : '#9a8070',
          fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 700,
          letterSpacing: '0.04em',
          boxShadow: valid ? '0 4px 20px rgba(26,10,0,0.18)' : 'none',
          transition: 'all 0.3s',
        }}
      >
        Continue to Payment →
      </motion.button>
    </motion.div>
  );
};

/* ── Step 2: Payment ── */
const PaymentStep = ({ payMethod, setPayMethod, cardForm, setCardForm, onBack, onNext }) => {
  const methods = [
    { id: 'card', label: 'Credit / Debit Card', icons: ['💳'] },
    { id: 'upi', label: 'UPI / GPay / PhonePe', icons: ['📱'] },
    { id: 'cod', label: 'Cash on Delivery', icons: ['💵'] },
  ];

  const setCard = (k) => (e) => setCardForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#1a0f08', margin: '0 0 24px' }}>
        Payment Method
      </h2>

      {/* Method selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {methods.map(m => (
          <motion.div
            key={m.id}
            whileHover={{ scale: 1.01 }}
            onClick={() => setPayMethod(m.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '16px 20px', borderRadius: '14px', cursor: 'pointer',
              border: `1.5px solid ${payMethod === m.id ? '#c7956c' : 'rgba(199,149,108,0.22)'}`,
              background: payMethod === m.id ? 'rgba(199,149,108,0.06)' : '#fff',
              transition: 'all 0.2s',
            }}
          >
            {payMethod === m.id
              ? <RadioButtonCheckedIcon sx={{ fontSize: 20, color: '#c7956c' }} />
              : <RadioButtonUncheckedIcon sx={{ fontSize: 20, color: '#c7d0d8' }} />
            }
            <span style={{ fontSize: '18px' }}>{m.icons[0]}</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#1a0f08' }}>
              {m.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Card details */}
      <AnimatePresence>
        {payMethod === 'card' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginBottom: '8px' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #1a0a00 0%, #3d1e0a 100%)',
              borderRadius: '18px', padding: '24px', marginBottom: '16px',
              color: '#fff', position: 'relative', overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(26,10,0,0.25)',
            }}>
              <div style={{
                position: 'absolute', top: -30, right: -30, width: 120, height: 120,
                borderRadius: '50%', background: 'rgba(199,149,108,0.2)',
              }} />
              <div style={{
                position: 'absolute', bottom: -40, right: 40, width: 100, height: 100,
                borderRadius: '50%', background: 'rgba(199,149,108,0.15)',
              }} />
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', opacity: 0.6, letterSpacing: '0.15em', marginBottom: '24px' }}>
                VIRTUAL CARD
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px', letterSpacing: '0.25em', marginBottom: '20px' }}>
                {(cardForm.number || '•••• •••• •••• ••••').replace(/(\d{4})/g, '$1 ').trim()}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ opacity: 0.5, fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }}>CARD HOLDER</div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{cardForm.name || 'YOUR NAME'}</div>
                </div>
                <div>
                  <div style={{ opacity: 0.5, fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }}>EXPIRES</div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{cardForm.expiry || 'MM/YY'}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <FocusInput label="Cardholder Name" placeholder="Mohsin Ali" value={cardForm.name} onChange={setCard('name')} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <FocusInput
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={cardForm.number}
                  onChange={e => setCardForm(f => ({ ...f, number: e.target.value.replace(/\D/g, '').slice(0, 16) }))}
                  maxLength={16}
                />
              </div>
              <FocusInput label="Expiry (MM/YY)" placeholder="08/27" value={cardForm.expiry} onChange={setCard('expiry')} />
              <FocusInput label="CVV" placeholder="•••" type="password" maxLength={4} value={cardForm.cvv} onChange={setCard('cvv')} />
            </div>
          </motion.div>
        )}

        {payMethod === 'upi' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginBottom: '8px' }}
          >
            <FocusInput label="UPI ID" placeholder="yourname@paytm / @gpay" value={cardForm.upi} onChange={setCard('upi')} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
        <button
          onClick={onBack}
          style={{
            flex: '0 0 auto', padding: '14px 22px', borderRadius: '12px',
            border: '1.5px solid rgba(199,149,108,0.3)',
            background: '#fff', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#6b5749',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 17 }} /> Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          style={{
            flex: 1, padding: '14px',
            borderRadius: '14px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #1a0a00, #3d1e0a)',
            color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '15px',
            fontWeight: 700, letterSpacing: '0.04em',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: '0 4px 20px rgba(26,10,0,0.18)',
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 17 }} /> Review & Place Order →
        </motion.button>
      </div>
    </motion.div>
  );
};

/* ── Step 3: Confirmation ── */
const ConfirmStep = ({ form, payMethod, items, grandTotal, shipping, discount, onBack, onPlace }) => (
  <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#1a0f08', margin: '0 0 24px' }}>
      Review Your Order
    </h2>

    {/* Delivery summary */}
    <SummaryBlock title="📦 Delivery To">
      <p style={summaryText}>{form.name} &bull; {form.phone}</p>
      <p style={summaryText}>{form.address}, {form.city} – {form.pincode}</p>
      <p style={summaryText}>{form.email}</p>
    </SummaryBlock>

    {/* Payment summary */}
    <SummaryBlock title="💳 Payment">
      <p style={summaryText}>
        {payMethod === 'card' ? 'Credit / Debit Card' : payMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}
      </p>
    </SummaryBlock>

    {/* Items */}
    <SummaryBlock title="🛍 Items">
      {items.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {item.productImg && (
              <div style={{ width: 44, height: 44, borderRadius: '10px', background: '#faf6f1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                <img src={item.productImg} alt={item.name} style={{ maxWidth: 40, maxHeight: 40, objectFit: 'contain' }} />
              </div>
            )}
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1a0f08' }}>{item.name}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#9a8070' }}>Qty: {item.qty}</div>
            </div>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700, color: '#1a0f08' }}>
            ₹{(Number(item.discounted_price || item.price) * item.qty).toLocaleString('en-IN')}
          </span>
        </div>
      ))}
    </SummaryBlock>

    {/* Totals */}
    <div style={{ background: 'rgba(199,149,108,0.05)', borderRadius: '14px', padding: '16px 20px', marginBottom: '24px' }}>
      {discount > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={summaryText}>Promo Discount</span>
          <span style={{ ...summaryText, color: '#16a34a', fontWeight: 700 }}>−₹{discount.toLocaleString('en-IN')}</span>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={summaryText}>Shipping</span>
        <span style={{ ...summaryText, color: shipping === 0 ? '#16a34a' : '#1a0f08', fontWeight: 700 }}>
          {shipping === 0 ? 'FREE' : `₹${shipping}`}
        </span>
      </div>
      <div style={{ borderTop: '1px solid rgba(199,149,108,0.15)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 700, color: '#1a0f08' }}>Grand Total</span>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#1a0f08' }}>
          ₹{grandTotal.toLocaleString('en-IN')}
        </span>
      </div>
    </div>

    <div style={{ display: 'flex', gap: '12px' }}>
      <button
        onClick={onBack}
        style={{
          flex: '0 0 auto', padding: '14px 22px', borderRadius: '12px',
          border: '1.5px solid rgba(199,149,108,0.3)',
          background: '#fff', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#6b5749',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 17 }} /> Back
      </button>
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(34,197,94,0.3)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onPlace}
        style={{
          flex: 1, padding: '16px', borderRadius: '14px', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #16a34a, #22c55e)',
          color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 700,
          letterSpacing: '0.04em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          boxShadow: '0 4px 20px rgba(34,197,94,0.25)',
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 17 }} /> Place Order Now ✓
      </motion.button>
    </div>
  </motion.div>
);

/* ── small helpers ── */
const summaryText = { fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b5749', margin: '3px 0', lineHeight: 1.5 };
const SummaryBlock = ({ title, children }) => (
  <div style={{
    background: '#fff', borderRadius: '14px',
    border: '1px solid rgba(199,149,108,0.12)',
    padding: '16px 20px', marginBottom: '14px',
    boxShadow: '0 2px 10px rgba(26,10,0,0.04)',
  }}>
    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: '#1a0f08', marginBottom: '8px' }}>
      {title}
    </div>
    {children}
  </div>
);

/* ── Success screen ── */
const SuccessScreen = ({ orderId, onGoHome }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    style={{ textAlign: 'center', padding: '60px 24px' }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      style={{
        width: 100, height: 100, borderRadius: '50%',
        background: 'linear-gradient(135deg, #16a34a, #22c55e)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px', boxShadow: '0 12px 40px rgba(34,197,94,0.35)',
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 52, color: '#fff' }} />
    </motion.div>

    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', color: '#1a0f08', margin: '0 0 10px' }}>
      Order Placed! 🎉
    </h2>
    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#9a8070', margin: '0 0 6px', lineHeight: 1.6 }}>
      Thank you for shopping with EdenSign!
    </p>
    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#c7956c', margin: '0 0 32px', fontWeight: 600 }}>
      Order ID: #{orderId}
    </p>

    <div style={{
      display: 'inline-flex', flexDirection: 'column', gap: '10px',
      background: 'rgba(199,149,108,0.07)', borderRadius: '16px', padding: '20px 32px',
      border: '1px solid rgba(199,149,108,0.15)', marginBottom: '32px',
    }}>
      {[
        '📧 Confirmation email sent',
        '🚚 Estimated delivery: 3–5 business days',
        '↩️ Free returns within 7 days',
      ].map(t => (
        <span key={t} style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b5749', textAlign: 'left' }}>{t}</span>
      ))}
    </div>

    <br />
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onGoHome}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '14px 32px', borderRadius: '100px',
        background: 'linear-gradient(135deg, #1a0a00, #3d1e0a)',
        color: '#fff', border: 'none', cursor: 'pointer',
        fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700,
        letterSpacing: '0.05em',
        boxShadow: '0 4px 20px rgba(26,10,0,0.2)',
      }}
    >
      <ShoppingBagOutlinedIcon sx={{ fontSize: 18 }} /> Continue Shopping
    </motion.button>
  </motion.div>
);

/* ── Main CheckoutPage ── */
function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { items } = useSelector(state => state.cart);
  const { discount = 0, shipping = 99, grandTotal = 0 } = location.state || {};

  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
  });
  const [payMethod, setPayMethod] = useState('card');
  const [cardForm, setCardForm] = useState({ name: '', number: '', expiry: '', cvv: '', upi: '' });

  const placeOrder = () => {
    setPlaced(true);
    dispatch(clearCart());
  };

  if (items.length === 0 && !placed) {
    navigate('/cart');
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f4f0', paddingTop: '96px' }}>
      <style>{`
        @media (max-width: 900px) {
          .checkout-layout { flex-direction: column !important; }
          .checkout-sidebar { width: 100% !important; }
          .checkout-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
          {!placed && (
            <motion.button
              whileHover={{ x: -3 }}
              onClick={() => step === 0 ? navigate('/cart') : setStep(s => s - 1)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9a8070', padding: '6px 0',
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 18 }} /> {step === 0 ? 'Back to Cart' : 'Back'}
            </motion.button>
          )}
          <div style={{ width: 1, height: 20, background: 'rgba(199,149,108,0.25)' }} />
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '30px', fontWeight: 700, color: '#1a0f08', margin: 0 }}>
            Checkout
          </h1>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a' }}>
            <LockOutlinedIcon sx={{ fontSize: 16 }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600 }}>Secure Checkout</span>
          </div>
        </div>

        {placed ? (
          <SuccessScreen orderId={orderId} onGoHome={() => navigate('/products')} />
        ) : (
          <>
            <StepBar step={step} />

            <div className="checkout-layout" style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>

              {/* ── Main form area ── */}
              <div style={{
                flex: 1, minWidth: 0,
                background: '#fff', borderRadius: '22px',
                border: '1px solid rgba(199,149,108,0.12)',
                boxShadow: '0 8px 32px rgba(26,10,0,0.07)',
                padding: '32px',
              }}>
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <DeliveryStep
                      key="delivery"
                      form={form}
                      setForm={setForm}
                      onNext={() => setStep(1)}
                    />
                  )}
                  {step === 1 && (
                    <PaymentStep
                      key="payment"
                      payMethod={payMethod}
                      setPayMethod={setPayMethod}
                      cardForm={cardForm}
                      setCardForm={setCardForm}
                      onBack={() => setStep(0)}
                      onNext={() => setStep(2)}
                    />
                  )}
                  {step === 2 && (
                    <ConfirmStep
                      key="confirm"
                      form={form}
                      payMethod={payMethod}
                      items={items}
                      grandTotal={grandTotal}
                      shipping={shipping}
                      discount={discount}
                      onBack={() => setStep(1)}
                      onPlace={placeOrder}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* ── Sidebar: mini order summary ── */}
              <div className="checkout-sidebar" style={{ width: '320px', flexShrink: 0 }}>
                <div style={{
                  background: '#fff', borderRadius: '22px',
                  border: '1px solid rgba(199,149,108,0.12)',
                  boxShadow: '0 8px 32px rgba(26,10,0,0.07)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    padding: '18px 22px',
                    borderBottom: '1px solid rgba(199,149,108,0.1)',
                    background: 'linear-gradient(135deg, rgba(199,149,108,0.06), rgba(199,149,108,0.02))',
                  }}>
                    <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700, color: '#1a0f08', margin: 0 }}>
                      Order Summary
                    </h3>
                  </div>

                  <div style={{ padding: '18px 22px' }}>
                    {items.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                          {item.productImg && (
                            <div style={{ width: 38, height: 38, flexShrink: 0, borderRadius: '9px', background: '#faf6f1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                              <img src={item.productImg} alt={item.name} style={{ maxWidth: 34, maxHeight: 34, objectFit: 'contain' }} />
                            </div>
                          )}
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#1a0f08', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.name}
                            </div>
                            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#9a8070' }}>×{item.qty}</div>
                          </div>
                        </div>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: '#1a0f08', flexShrink: 0 }}>
                          ₹{(Number(item.discounted_price || item.price) * item.qty).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}

                    <div style={{ borderTop: '1px solid rgba(199,149,108,0.12)', paddingTop: '14px', marginTop: '4px' }}>
                      {discount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#6b5749' }}>Discount</span>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>−₹{discount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#6b5749' }}>Shipping</span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: shipping === 0 ? '#16a34a' : '#1a0f08', fontWeight: 700 }}>
                          {shipping === 0 ? 'FREE' : `₹${shipping}`}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: '#1a0f08' }}>Total</span>
                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700, color: '#1a0f08' }}>
                          ₹{grandTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div style={{
                  marginTop: '16px', background: '#fff',
                  borderRadius: '16px', border: '1px solid rgba(199,149,108,0.12)',
                  padding: '16px 20px',
                }}>
                  {['🔒 SSL Encrypted Payment', '📦 Discreet Packaging', '↩️ 7-Day Easy Returns', '🇮🇳 Made for India'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#6b5749' }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
