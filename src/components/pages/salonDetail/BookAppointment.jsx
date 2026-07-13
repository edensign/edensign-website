/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import {
  Box, Button, Checkbox, FormControl, InputLabel, Select, MenuItem,
  Alert, CircularProgress, Switch, Typography
} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ContentCutIcon from '@mui/icons-material/ContentCut';

import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";

import API from "../../../apis";
import { api } from "../../../apis/config/axiosConfig";
import { loadRazorpayScript } from "../../utils/razorpay";
import appointmentImg from "../../assets/appointment.jpg";

/* ── shared MUI overrides ── */
const inputSx = {
  '& .MuiFilledInput-root': {
    background: 'rgba(15,93,78,0.06)',
    borderRadius: '10px',
    border: '1px solid rgba(15,93,78,0.25)',
    transition: 'border-color 0.2s',
    '&:hover': { background: 'rgba(15,93,78,0.10)', borderColor: 'rgba(15,93,78,0.4)' },
    '&.Mui-focused': { background: 'rgba(15,93,78,0.08)', borderColor: 'var(--es-emerald)' },
    '&::before, &::after': { display: 'none' },
  },
  '& .MuiInputLabel-filled': {
    color: '#78716c',
    fontSize: '13px',
    letterSpacing: '0.04em',
  },
  '& .MuiInputLabel-filled.Mui-focused': { color: 'var(--es-emerald-soft)' },
};

const MenuProps = {
  disableScrollLock: false,
  PaperProps: {
    style: {
      maxHeight: 220,
      overscrollBehavior: 'contain',
    },
  },
};

const Booking = ({ appointmentRef, selectedService }) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = React.useState(dayjs(Date.now()));
  const [salonEmployee, setSalonEmployee] = React.useState([]);
  const [bookedSlots, setBookedSlots] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [bookingStatus, setBookingStatus] = React.useState({ type: '', message: '' });
  const [useWallet, setUseWallet] = React.useState(false);
  const [walletBalance, setWalletBalance] = React.useState(0);
  const { salon, images } = useSelector(state => state.salonDetail);
  const URLParams = useParams();

  const S3_BASE = import.meta.env.VITE_S3_BASE_URL || 'https://salon-s3.s3.us-east-1.amazonaws.com';
  const salonPhoto = salon?.front_image 
    ? (salon.front_image.startsWith('http') ? salon.front_image : `${S3_BASE}/eden-sign/salon/front/${salon.front_image}`)
    : (images && images.length > 0 && images[0]?.image_src
        ? `${S3_BASE}/eden-sign/salon/${images[0].type || 'front'}/${images[0].image_src}`
        : appointmentImg);

  const refId = React.useRef();
  const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };

  const isLoggedIn = API.CustomerAPI.isLoggedIn();
  const customerToken = API.CustomerAPI.getToken();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (customerToken) {
          const res = await api.get('/wallet/balance', {
            headers: { Authorization: `Bearer ${customerToken}` }
          });
          if (res.data?.data) setWalletBalance(res.data.data.balance || 0);
        }
      } catch (e) {}
    };
    fetchBalance();
  }, [customerToken]);

  const initialValues = {
    date: checkIn,
    services: "",
    stylist: "",
    slots: "",
    else: false,
    persons: ""
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {}
  });

  React.useImperativeHandle(refId, () => ({
    Submit: async () => { await formik.submitForm(); }
  }));

  /* Fetch employees on service change */
  useEffect(() => {
    if (formik.values.services) {
      API.SalonEmployeeAPI.getSalonEmployee({ ...URLParams, service_id: formik.values.services })
        .then(res => {
          res.status === "Success" ? setSalonEmployee(res.data) : setSalonEmployee([]);
        })
        .catch(() => setSalonEmployee([]));
    }
  }, [formik.values.services]);

  /* Fetch booked slots on stylist / date change */
  useEffect(() => {
    if (formik.values.stylist && checkIn) {
      const employee = salonEmployee.find(e => e.name.toLowerCase() === formik.values.stylist);
      if (employee) {
        API.AppointmentAPI.getBookedSlots({
          employee_id: employee.id,
          date: checkIn.format('YYYY-MM-DD')
        }).then(res => {
          res.status === "Success" ? setBookedSlots(res.data || []) : setBookedSlots([]);
        }).catch(() => setBookedSlots([]));
      }
    }
  }, [formik.values.stylist, checkIn, salonEmployee]);

  /* Sync selected service from carousel */
  useEffect(() => {
    formik.setFieldValue("services", selectedService);
  }, [selectedService]);

  /* ── Slot generation ── */
  const generateSlots = () => {
    let openHour = 10, closeHour = 18;
    if (salon?.opening_time) {
      const t = dayjs(salon.opening_time);
      if (t.isValid()) openHour = t.hour();
    }
    if (salon?.closing_time) {
      const t = dayjs(salon.closing_time);
      if (t.isValid()) closeHour = t.hour();
    }

    const slots = [];
    for (let h = openHour; h < closeHour; h++) {
      const s12 = h === 0 ? 12 : (h > 12 ? h - 12 : h);
      const sSfx = h < 12 ? 'AM' : 'PM';
      const e24 = h + 1;
      const e12 = e24 === 0 ? 12 : (e24 > 12 ? e24 - 12 : e24);
      const eSfx = e24 < 12 ? 'AM' : 'PM';
      const label = sSfx === eSfx
        ? `${s12}:00 - ${e12}:00 ${eSfx}`
        : `${s12}:00 ${sSfx} - ${e12}:00 ${eSfx}`;
      slots.push(label);
    }
    return slots.length > 0 ? slots : [
      "10:00 - 11:00 AM", "11:00 AM - 12:00 PM",
      "12:00 - 1:00 PM",  "1:00 - 2:00 PM",
      "2:00 - 3:00 PM",   "3:00 - 4:00 PM",
      "4:00 - 5:00 PM",   "5:00 - 6:00 PM"
    ];
  };

  const isToday = checkIn && dayjs().isSame(checkIn, 'day');
  const currentHour = dayjs().hour();
  const currentMinute = dayjs().minute();

  const isSlotPassed = (idx) => {
    if (!isToday) return false;
    let openHour = 10;
    if (salon?.opening_time) {
      const t = dayjs(salon.opening_time);
      if (t.isValid()) openHour = t.hour();
    }
    const slotHour = openHour + idx;
    if (slotHour < currentHour) return true;
    if (slotHour === currentHour && currentMinute > 0) return true;
    return false;
  };

  /* ── Booking handler ── */
  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setBookingStatus({ type: '', message: '' });

    if (!formik.values.services) return setBookingStatus({ type: 'error', message: 'Please select a service' });
    if (!formik.values.stylist)  return setBookingStatus({ type: 'error', message: 'Please select a stylist' });
    if (!formik.values.slots)    return setBookingStatus({ type: 'error', message: 'Please select a time slot' });

    const employee = salonEmployee.find(emp => emp.name.toLowerCase() === formik.values.stylist);
    if (!employee) return setBookingStatus({ type: 'error', message: 'Invalid stylist selected' });

    if (!isLoggedIn) {
      setBookingStatus({ type: 'warning', message: 'Please login to book an appointment' });
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    const appointmentPayload = {
      date: checkIn.format('YYYY-MM-DD'),
      time_slot: formik.values.slots,
      services: formik.values.services.toString(),
      salon_employee: employee.id,
      booked_for: formik.values.else ? formik.values.persons : 'self',
    };

    const bookingFee = salon?.booking_fee ? parseFloat(salon.booking_fee) : 100;
    setLoading(true);

    try {
      const initRes = await api.post('/wallet/initiate-appointment-payment', {
        amount: bookingFee, useWallet,
      }, { headers: { Authorization: `Bearer ${customerToken}` } });

      const initData = initRes.data?.data;
      if (!initData) { setBookingStatus({ type: 'error', message: 'Failed to initiate payment.' }); return; }

      if (initData.payment?.status === 'wallet_only') {
        const bookRes = await api.post('/wallet/verify-appointment', {
          ...appointmentPayload,
          walletDeduction: initData.payment.walletDeduction,
          razorpay_order_id: null, razorpay_payment_id: null, razorpay_signature: null,
        }, { headers: { Authorization: `Bearer ${customerToken}` } });

        if (bookRes.data?.status === 'Success' || bookRes.status === 200) {
          setBookingStatus({ type: 'success', message: 'Appointment booked successfully! Redirecting...' });
          setBookedSlots(prev => [...prev, formik.values.slots]);
          formik.setFieldValue('slots', '');
          setTimeout(() => navigate('/dashboard'), 1500);
        } else {
          setBookingStatus({ type: 'error', message: bookRes.data?.data || 'Failed to book appointment.' });
        }
        return;
      }

      if (initData.payment?.status === 'payment_pending') {
        const rpOrder = initData.payment.razorpay_order;
        const walletDeduction = initData.payment.walletDeduction || 0;
        const sdkLoaded = await loadRazorpayScript();
        if (!sdkLoaded) { setBookingStatus({ type: 'error', message: 'Razorpay SDK failed to load.' }); return; }

        const options = {
          description: 'Appointment Booking - Eden Sign',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_xxxxxx',
          amount: rpOrder.amount,
          name: 'Eden Sign',
          order_id: rpOrder.id,
          prefill: { name: '', email: '', contact: '' },
          theme: { color: 'var(--es-emerald)' },
          config: {
            display: {
              blocks: {
                upi:   { name: 'Pay via UPI',           instruments: [{ method: 'upi' }] },
                other: { name: 'Other Payment Modes',   instruments: [{ method: 'card' }, { method: 'netbanking' }, { method: 'wallet' }] }
              },
              sequence: ['block.upi', 'block.other'],
              preferences: { show_default_blocks: true }
            }
          },
          handler: async function (rpData) {
            try {
              const bookRes = await api.post('/wallet/verify-appointment', {
                ...appointmentPayload, walletDeduction,
                razorpay_order_id: rpData.razorpay_order_id,
                razorpay_payment_id: rpData.razorpay_payment_id,
                razorpay_signature: rpData.razorpay_signature,
              }, { headers: { Authorization: `Bearer ${customerToken}` } });

              if (bookRes.data?.status === 'Success' || bookRes.status === 200) {
                setBookingStatus({ type: 'success', message: 'Payment successful! Appointment booked. Redirecting...' });
                setBookedSlots(prev => [...prev, formik.values.slots]);
                formik.setFieldValue('slots', '');
                setTimeout(() => navigate('/dashboard'), 1500);
              } else {
                setBookingStatus({ type: 'error', message: 'Payment done but booking failed. Contact support.' });
              }
            } catch { setBookingStatus({ type: 'error', message: 'Payment done but booking failed. Contact support.' }); }
            finally { setLoading(false); }
          },
          modal: {
            ondismiss: function () {
              setBookingStatus({ type: 'warning', message: 'Payment cancelled. Appointment not booked.' });
              setLoading(false);
            }
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        return;
      }

      setBookingStatus({ type: 'error', message: 'Unexpected payment status. Try again.' });
    } catch (error) {
      const msg = error.response?.data?.data || 'Failed to book appointment. Please try again.';
      setBookingStatus({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  const slots = generateSlots();

  return (
    <section
      ref={appointmentRef}
      style={{
        background: 'linear-gradient(to bottom, var(--es-cream), var(--es-cream-deep))',
        padding: '96px 5%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative top rule */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 1, height: 64,
        background: 'linear-gradient(to bottom, transparent, var(--es-emerald))',
      }} />

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600,
          letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--es-emerald-soft)',
          marginBottom: '16px',
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--es-emerald)', display: 'inline-block' }} />
          Reserve Your Visit
        </span>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
          fontWeight: 400, lineHeight: 1.1,
          letterSpacing: '-0.02em', color: '#1c1917',
          margin: 0,
        }}>
          Book Your Appointment
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300, fontSize: '15px',
          lineHeight: 1.9, letterSpacing: '0.03em',
          color: '#78716c', margin: '16px auto 0',
          maxWidth: 520,
        }}>
          Choose your preferred service, expert stylist, and a time that works perfectly for you.
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'start',
      }}>

        {/* LEFT — Image panel */}
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(15,93,78,0.25)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.12)',
          aspectRatio: '3/4',
          maxHeight: '600px',
          display: 'flex',
        }}>
          <img
            src={salonPhoto}
            alt="Book your salon appointment"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Overlay card */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(15,15,30,0.88) 0%, transparent 100%)',
            padding: '48px 32px 36px',
            color: '#fff',
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '3px', textTransform: 'uppercase',
              color: 'var(--es-emerald)', marginBottom: '8px',
            }}>Premium Experience</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.6rem', fontWeight: 400,
              lineHeight: 1.2, margin: 0,
            }}>
              {salon?.name || 'Expert Styling Awaits'}
            </p>
          </div>
        </div>

        {/* RIGHT — Form panel */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid rgba(15,93,78,0.18)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
          padding: '40px 36px',
        }}>
          {/* Status alert */}
          {bookingStatus.message && (
            <Alert
              severity={bookingStatus.type}
              onClose={() => setBookingStatus({ type: '', message: '' })}
              sx={{ marginBottom: '24px', borderRadius: '10px' }}
            >
              {bookingStatus.message}
            </Alert>
          )}

          <Box component="form" ref={refId}>

            {/* Date */}
            <Box display="flex" flexDirection="column" marginBottom="24px">
              <Box display="flex" alignItems="center" gap="8px" marginBottom="10px">
                <CalendarTodayOutlinedIcon sx={{ fontSize: '16px', color: 'var(--es-emerald)' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#44403c' }}>
                  Select Date
                </span>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={['day', 'month', 'year']}
                  format="DD MMMM YYYY"
                  name="date"
                  value={checkIn}
                  onChange={newVal => {
                    setCheckIn(newVal);
                    formik.setFieldValue("slots", "");
                  }}
                  minDate={dayjs()}
                  slotProps={{
                    textField: {
                      variant: 'filled',
                      sx: {
                        ...inputSx,
                        width: '100%',
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Box>

            {/* Service */}
            <Box display="flex" flexDirection="column" marginBottom="24px">
              <Box display="flex" alignItems="center" gap="8px" marginBottom="10px">
                <ContentCutIcon sx={{ fontSize: '16px', color: 'var(--es-emerald)' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#44403c' }}>
                  Service
                </span>
              </Box>
              <FormControl variant="filled" sx={inputSx}>
                <InputLabel id="servicesField">Choose a service</InputLabel>
                <Select
                  labelId="servicesField"
                  name="services"
                  autoComplete="new-services"
                  onChange={formik.handleChange}
                  value={formik.values.services}
                  error={!!formik.touched.services && !!formik.errors.services}
                  MenuProps={MenuProps}
                >
                  {salon?.services?.map((service, index) => (
                    <MenuItem value={service.id} key={index}>{service.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Stylist */}
            <Box display="flex" flexDirection="column" marginBottom="24px">
              <Box display="flex" alignItems="center" gap="8px" marginBottom="10px">
                <PersonOutlineIcon sx={{ fontSize: '16px', color: 'var(--es-emerald)' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#44403c' }}>
                  Stylist
                </span>
              </Box>
              <FormControl variant="filled" sx={inputSx}>
                <InputLabel id="stylistField">Choose a stylist</InputLabel>
                <Select
                  labelId="stylistField"
                  name="stylist"
                  autoComplete="new-stylist"
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue("slots", "");
                  }}
                  value={formik.values.stylist}
                  error={!!formik.touched.stylist && !!formik.errors.stylist}
                  MenuProps={MenuProps}
                >
                  {salonEmployee?.map((emp, index) => (
                    <MenuItem value={emp.name.toLowerCase()} key={index}>{emp.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Time Slot Select */}
            <Box display="flex" flexDirection="column" marginBottom="24px">
              <Box display="flex" alignItems="center" gap="8px" marginBottom="10px">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--es-emerald)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#44403c' }}>
                  Time Slot
                </span>
              </Box>
              <FormControl variant="filled" sx={inputSx}>
                <InputLabel id="slotsField">Choose a time slot</InputLabel>
                <Select
                  labelId="slotsField"
                  name="slots"
                  onChange={formik.handleChange}
                  value={formik.values.slots}
                  error={!!formik.touched.slots && !!formik.errors.slots}
                  MenuProps={MenuProps}
                >
                  {slots.map((slot, idx) => {
                    const isBooked  = bookedSlots.includes(slot);
                    const isPassed  = isSlotPassed(idx);
                    const isDisabled = isBooked || isPassed;
                    
                    let statusText = '';
                    if (isBooked) statusText = ' (Booked)';
                    else if (isPassed) statusText = ' (Passed)';

                    return (
                      <MenuItem 
                        value={slot} 
                        key={idx} 
                        disabled={isDisabled}
                      >
                        {slot}{statusText}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            {/* Book for someone else */}
            <Box marginBottom="16px" display="flex" alignItems="center">
              <Checkbox
                {...checkboxLabel}
                size="small"
                name="else"
                checked={formik.values?.else}
                onChange={(_, value) => formik.setFieldValue("else", value)}
                value={formik.values.else}
                sx={{ color: 'var(--es-emerald)', '&.Mui-checked': { color: 'var(--es-emerald)' }, padding: '4px 8px 4px 0' }}
              />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px', fontWeight: 500,
                color: '#44403c', letterSpacing: '0.04em',
              }}>
                Book for someone else
              </span>
            </Box>

            {formik.values.else && (
              <Box display="flex" flexDirection="column" marginBottom="20px">
                <FormControl variant="filled" sx={inputSx}>
                  <InputLabel id="personsField">For whom?</InputLabel>
                  <Select
                    labelId="personsField"
                    name="persons"
                    autoComplete="new-persons"
                    onChange={formik.handleChange}
                    value={formik.values.persons}
                    error={!!formik.touched.persons && !!formik.errors.persons}
                  >
                    <MenuItem value="kid">Kid</MenuItem>
                    <MenuItem value="boy">Boy</MenuItem>
                    <MenuItem value="girl">Girl</MenuItem>
                    <MenuItem value="man">Man</MenuItem>
                    <MenuItem value="woman">Woman</MenuItem>
                    <MenuItem value="senior_citizen">Senior Citizen</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            {/* Wallet toggle */}
            {walletBalance > 0 && (
              <Box
                display="flex" alignItems="center"
                justifyContent="space-between"
                marginBottom="24px"
                sx={{
                  background: 'rgba(15,93,78,0.08)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(15,93,78,0.25)',
                }}
              >
                <Box display="flex" alignItems="center">
                  <AccountBalanceWalletIcon sx={{ color: 'var(--es-emerald)', mr: 1 }} />
                  <Box>
                    <Typography variant="body2" fontWeight="600" color="#1a0f08" fontSize="13px">
                      Use Wallet Balance
                    </Typography>
                    <Typography variant="caption" color="#78716c">
                      Available: ₹{walletBalance}
                    </Typography>
                  </Box>
                </Box>
                <Switch
                  checked={useWallet}
                  onChange={e => setUseWallet(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: 'var(--es-emerald)' },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'var(--es-emerald)' },
                  }}
                />
              </Box>
            )}

            {/* CTA */}
            <button
              type="button"
              id="availability-btn"
              onClick={handleBookAppointment}
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: loading ? 'var(--es-emerald-muted)' : 'linear-gradient(135deg, var(--es-emerald) 0%, var(--es-emerald-soft) 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 8px 28px rgba(15,93,78,0.35)',
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(15,93,78,0.45)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(15,93,78,0.35)';
              }}
            >
              {loading
                ? <><CircularProgress size={18} sx={{ color: '#fff' }} /> Processing...</>
                : 'Confirm Appointment'
              }
            </button>
          </Box>
        </div>
      </div>
    </section>
  );
};

export default Booking;
