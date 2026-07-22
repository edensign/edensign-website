/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * Customer Dashboard — Luxury Sidebar Layout.
 */

import React, { useState, useEffect } from "react";
import {
    Box, Typography, CircularProgress, Grid, Card, CardContent,
    Divider, Chip, IconButton, useMediaQuery, useTheme
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import API from "../../../apis";
import { api } from "../../../apis/config/axiosConfig";
import BRAND, { BRAND_NAME, BRAND_DASHBOARD, BRAND_PORTAL, BRAND_COPYRIGHT_YEAR, BRAND_LEGAL } from "../../../brand";
import PremiumOfferCard from "../../common/PremiumOfferCard";
import { loadRazorpayScript } from "../../utils/razorpay";
import { useToast } from "../../common/Toast";
import "./Dashboard.css";


const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [activeView, setActiveView] = useState("appointments");
    const [appointments, setAppointments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [cards, setCards] = useState([]);
    const [walletBalance, setWalletBalance] = useState(0);
    const [walletTransactions, setWalletTransactions] = useState([]);
    const [addAmount, setAddAmount] = useState("");
    const [processingPayment, setProcessingPayment] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

    const customer = API.CustomerAPI.getCustomer();
    const token = API.CustomerAPI.getToken();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [apptRes, cardRes, balanceRes, txRes, ordersRes] = await Promise.all([
                API.AppointmentAPI.getMyAppointments(token),
                API.DigitalOfferAPI.getMyCards(token),
                api.get('/wallet/balance', { headers: { Authorization: `Bearer ${token}` } }),
                api.get('/wallet/transactions', { headers: { Authorization: `Bearer ${token}` } }),
                api.get('/orders/my', { headers: { Authorization: `Bearer ${token}` } })
            ]);

            if (apptRes.status === "Success") {
                setAppointments(apptRes.data.rows || []);
            }
            if (cardRes.status === "Success") {
                setCards(cardRes.data.rows || []);
            }
            if (balanceRes.data?.data) {
                setWalletBalance(balanceRes.data.data.balance || 0);
            }
            if (txRes.data?.data?.rows) {
                setWalletTransactions(txRes.data.data.rows || []);
            }
            if (ordersRes.data?.data?.orders) {
                setOrders(ordersRes.data.data.orders || []);
            }
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchData();
    }, [token]);

    const { showToast } = useToast();

    const handleLogout = () => {
        API.CustomerAPI.logout();
        window.location.href = "/";
    };

    const handleAddMoney = async () => {
        const amount = parseFloat(addAmount);
        if (isNaN(amount) || amount <= 0) {
            showToast("Please enter a valid amount", "warning");
            return;
        }

        setProcessingPayment(true);
        try {
            const res = await loadRazorpayScript();
            if (!res) {
                showToast("Razorpay SDK failed to load.", "error");
                return;
            }

            const orderRes = await api.post('/wallet/add-money', { amount }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const orderData = orderRes.data?.data;

            if (!orderData || !orderData.id) {
                throw new Error("Failed to create order");
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_xxxxxx',
                amount: orderData.amount,
                currency: 'INR',
                name: BRAND_NAME,
                description: 'Add Money to Wallet',
                order_id: orderData.id,
                handler: async function (response) {
                    try {
                        await api.post('/wallet/verify-add-money', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        }, { headers: { Authorization: `Bearer ${token}` } });

                        showToast("Money added successfully!", "success");
                        setAddAmount("");
                        fetchData();
                    } catch (err) {
                        showToast("Payment verification failed.", "error");
                    }
                },
                prefill: {
                    name: customer?.username,
                    email: customer?.email,
                    contact: customer?.contact_no
                },
                theme: {
                    color: '#c9a84c'
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (err) {
            console.error(err);
            showToast("Failed to initiate payment.", "error");
        } finally {
            setProcessingPayment(false);
        }
    };

    const menuItems = [
        { id: "appointments", label: "Appointments", icon: <CalendarMonthIcon />, count: appointments.length },
        { id: "orders", label: "My Orders", icon: <ShoppingBagIcon />, count: orders.length },
        { id: "cards", label: "Offer Cards", icon: <ConfirmationNumberIcon />, count: cards.length },
        { id: "wallet", label: "My Wallet", icon: <AccountBalanceWalletIcon /> },
        { id: "profile", label: "My Profile", icon: <PersonIcon /> },
    ];

    if (!token) {
        return (
            <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <Typography variant="h5" color="#1a0f08">Please login to access your dashboard.</Typography>
            </Box>
        );
    }

    return (
        <Box className="dash-root">
            {/* --- Mobile Header --- */}
            {isMobile && (
                <Box className="dash-mobile-nav">
                    <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: 'var(--es-emerald)' }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography className="dash-mobile-title">{BRAND_DASHBOARD}</Typography>
                </Box>
            )}

            {/* --- Sidebar --- */}
            <AnimatePresence>
                {(sidebarOpen || !isMobile) && (
                    <motion.div
                        className="dash-sidebar"
                        initial={isMobile ? { x: -300 } : false}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                    >
                        {isMobile && (
                            <IconButton
                                onClick={() => setSidebarOpen(false)}
                                className="dash-sidebar-close"
                                sx={{ position: 'absolute', top: 10, right: 10, color: 'rgba(255,255,255,0.4)' }}
                            >
                                <CloseIcon />
                            </IconButton>
                        )}

                        <div className="dash-sidebar-header">
                            <div className="dash-avatar">
                                {customer?.username?.charAt(0).toUpperCase()}
                            </div>
                            <Typography className="dash-user-name">{customer?.username}</Typography>
                            <Typography className="dash-user-email">{customer?.email}</Typography>
                        </div>

                        <nav className="dash-nav">
                            {menuItems.map(item => (
                                <button
                                    key={item.id}
                                    className={`dash-nav-item ${activeView === item.id ? 'is-active' : ''}`}
                                    onClick={() => {
                                        setActiveView(item.id);
                                        if (isMobile) setSidebarOpen(false);
                                    }}
                                >
                                    <span className="dash-nav-icon">{item.icon}</span>
                                    <span className="dash-nav-label">{item.label}</span>
                                    {item.count !== undefined && <span className="dash-nav-badge">{item.count}</span>}
                                </button>
                            ))}
                        </nav>

                        <button className="dash-logout-btn" onClick={handleLogout}>
                            <LogoutIcon sx={{ fontSize: 18 }} />
                            <span>Logout</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Main Content --- */}
            <main className="dash-main">
                <Box className="dash-content-header">
                    <Typography className="dash-view-title">
                        {menuItems.find(m => m.id === activeView)?.label}
                    </Typography>
                    <div className="dash-header-ornament" />
                </Box>

                <Box className="dash-view-container">
                    {loading ? (
                        <Box className="dash-loading">
                            <CircularProgress sx={{ color: 'var(--es-emerald)' }} />
                        </Box>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeView}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeView === "appointments" && (
                                    <Grid container spacing={3}>
                                        {appointments.length > 0 ? appointments.map((appt) => (
                                            <Grid item xs={12} lg={6} key={appt.id}>
                                                <Card className="luxury-appt-card">
                                                    <CardContent>
                                                        <div className="appt-card-top">
                                                            <Typography className="appt-salon-name">
                                                                {appt.salon_employee?.salon?.name || "Premium Salon"}
                                                            </Typography>
                                                            <Chip
                                                                label={new Date(appt.date) < new Date() ? "Past" : "Confirmed"}
                                                                className={new Date(appt.date) < new Date() ? "luxury-chip-past" : "luxury-chip-active"}
                                                            />
                                                        </div>

                                                        <div className="appt-card-grid">
                                                            <div className="appt-card-item">
                                                                <CalendarMonthIcon className="appt-item-icon" />
                                                                <div>
                                                                    <Typography className="appt-item-val">{new Date(appt.date).toLocaleDateString()}</Typography>
                                                                    <Typography className="appt-item-lbl">Date</Typography>
                                                                </div>
                                                            </div>
                                                            <div className="appt-card-item">
                                                                <AccessTimeIcon className="appt-item-icon" />
                                                                <div>
                                                                    <Typography className="appt-item-val">{appt.time_slot}</Typography>
                                                                    <Typography className="appt-item-lbl">Time Slot</Typography>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <Divider className="luxury-divider" />

                                                        <div className="appt-card-footer">
                                                            <div className="appt-footer-item">
                                                                <Typography className="appt-footer-lbl">Stylist</Typography>
                                                                <Typography className="appt-footer-val">{appt.salon_employee?.name || "Any Expert"}</Typography>
                                                            </div>
                                                            <div className="appt-footer-item">
                                                                <Typography className="appt-footer-lbl">Services</Typography>
                                                                <Typography className="appt-footer-val">{appt.service_name || appt.services || "Selected Services"}</Typography>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        )) : (
                                            <Box className="dash-empty-state">
                                                <CalendarMonthIcon sx={{ fontSize: 60, color: 'var(--es-emerald)', opacity: 0.15, mb: 2 }} />
                                                <Typography variant="h6" color="var(--es-charcoal)">No appointments booked yet.</Typography>
                                                <Typography color="var(--es-charcoal-60)">Start your beauty journey today.</Typography>
                                            </Box>
                                        )}
                                    </Grid>
                                )}

                                {activeView === "orders" && (() => {
                                    const ORDER_PIPELINE = [
                                        { value: "paid", label: "Confirmed", icon: "✅" },
                                        { value: "processing", label: "Processing", icon: "⚙️" },
                                        { value: "dispatched", label: "Dispatched", icon: "📦" },
                                        { value: "on_the_way", label: "On The Way", icon: "🚚" },
                                        { value: "delivered", label: "Delivered", icon: "🎉" },
                                    ];
                                    const STATUS_CONFIG = {
                                        payment_pending: { label: "Payment Pending", color: "#d97706", bg: "rgba(217,119,6,0.1)" },
                                        paid: { label: "Confirmed", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
                                        processing: { label: "Processing", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
                                        dispatched: { label: "Dispatched", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
                                        on_the_way: { label: "On The Way", color: "#f97316", bg: "rgba(249,115,22,0.1)" },
                                        delivered: { label: "Delivered", color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
                                        cancelled: { label: "Cancelled", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
                                    };
                                    return (
                                        <Grid container spacing={3}>
                                            {orders.length > 0 ? orders.map((order) => {
                                                const cfg = STATUS_CONFIG[order.status] || { label: order.status, color: "#64748b", bg: "rgba(100,116,139,0.1)" };
                                                const pipelineIdx = ORDER_PIPELINE.findIndex(s => s.value === order.status);
                                                return (
                                                    <Grid item xs={12} key={order.id}>
                                                        <Card sx={{
                                                            background: '#fff',
                                                            border: '1px solid var(--es-charcoal-5)',
                                                            borderRadius: '20px',
                                                            boxShadow: 'var(--es-shadow)',
                                                            overflow: 'hidden',
                                                            '&:hover': { boxShadow: 'var(--es-shadow-md)', transform: 'translateY(-2px)', transition: 'all 0.3s' }
                                                        }}>
                                                            <CardContent sx={{ p: 3 }}>
                                                                {/* Header row */}
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                                                                    <Box>
                                                                        <Typography sx={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '16px', color: 'var(--es-charcoal)' }}>
                                                                            Order #{order.id}
                                                                        </Typography>
                                                                        <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--es-charcoal-60)', mt: 0.3 }}>
                                                                            {new Date(order.created_at || Date.now()).toLocaleString('en-IN')}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                        <Typography sx={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '18px', color: 'var(--es-emerald)' }}>
                                                                            ₹{Number(order.total_amount || 0).toLocaleString('en-IN')}
                                                                        </Typography>
                                                                        <Chip
                                                                            label={cfg.label}
                                                                            size="small"
                                                                            sx={{
                                                                                fontWeight: 700, fontSize: '11px',
                                                                                color: cfg.color, backgroundColor: cfg.bg,
                                                                                border: `1px solid ${cfg.color}33`,
                                                                                borderRadius: '8px', minWidth: 90
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                </Box>

                                                                {/* Pipeline bar (only for active pipeline statuses) */}
                                                                {pipelineIdx >= 0 && (
                                                                    <Box sx={{ mb: 2, p: 2, borderRadius: '14px', background: 'rgba(15,93,78,0.03)', border: '1px solid rgba(15,93,78,0.06)' }}>
                                                                        <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'var(--es-charcoal-60)', textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1.5 }}>
                                                                            Order Progress
                                                                        </Typography>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                            {ORDER_PIPELINE.map((step, idx) => {
                                                                                const done = idx <= pipelineIdx;
                                                                                return (
                                                                                    <React.Fragment key={step.value}>
                                                                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 52 }}>
                                                                                            <Box sx={{
                                                                                                width: 32, height: 32, borderRadius: '50%',
                                                                                                background: done ? 'var(--es-emerald)' : 'rgba(148,163,184,0.2)',
                                                                                                border: done ? 'none' : '2px solid rgba(148,163,184,0.3)',
                                                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                                                boxShadow: done ? '0 4px 12px rgba(15,93,78,0.2)' : 'none',
                                                                                                transition: 'all 0.4s',
                                                                                                fontSize: done ? '14px' : '10px'
                                                                                            }}>
                                                                                                {done ? step.icon : <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(148,163,184,0.4)' }} />}
                                                                                            </Box>
                                                                                            <Typography sx={{
                                                                                                fontSize: '9px', fontWeight: done ? 700 : 500,
                                                                                                color: done ? 'var(--es-emerald)' : 'var(--es-charcoal-60)',
                                                                                                mt: 0.7, textAlign: 'center', whiteSpace: 'nowrap'
                                                                                            }}>
                                                                                                {step.label}
                                                                                            </Typography>
                                                                                        </Box>
                                                                                        {idx < ORDER_PIPELINE.length - 1 && (
                                                                                            <Box sx={{
                                                                                                flex: 1, height: 2, mb: 2.5, mx: 0.5,
                                                                                                background: done && idx < pipelineIdx ? 'var(--es-emerald)' : 'rgba(148,163,184,0.2)',
                                                                                                transition: 'all 0.4s'
                                                                                            }} />
                                                                                        )}
                                                                                    </React.Fragment>
                                                                                );
                                                                            })}
                                                                        </Box>
                                                                    </Box>
                                                                )}

                                                                {/* Cancelled banner */}
                                                                {order.status === 'cancelled' && (
                                                                    <Box sx={{ mb: 2, p: 1.5, borderRadius: '10px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', textAlign: 'center' }}>
                                                                        <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#ef4444' }}>❌ This order has been cancelled.</Typography>
                                                                    </Box>
                                                                )}

                                                                <Divider sx={{ my: 2, borderColor: 'var(--es-charcoal-5)' }} />

                                                                {/* Ordered items */}
                                                                {order.order_item && order.order_item.length > 0 ? (
                                                                    <Box>
                                                                        <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--es-charcoal-60)', mb: 1.5 }}>
                                                                            Ordered Items
                                                                        </Typography>
                                                                        {order.order_item.map((item, idx) => (
                                                                            <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, p: 1, borderRadius: '8px', background: 'rgba(15,93,78,0.03)' }}>
                                                                                <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: 'var(--es-charcoal)' }}>
                                                                                    {item.product?.name || `Product #${item.product_id}`}
                                                                                    {item.product?.brand && <span style={{ fontWeight: 400, color: 'var(--es-charcoal-60)', fontSize: '12px' }}> · {item.product.brand}</span>}
                                                                                    <span style={{ color: 'var(--es-charcoal-60)', fontWeight: 400 }}> × {item.quantity}</span>
                                                                                </Typography>
                                                                                <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--es-emerald)' }}>
                                                                                    ₹{Number((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                                                                                </Typography>
                                                                            </Box>
                                                                        ))}
                                                                    </Box>
                                                                ) : (
                                                                    <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--es-charcoal-60)' }}>
                                                                        Total paid: ₹{Number(order.total_amount || 0).toLocaleString('en-IN')}
                                                                    </Typography>
                                                                )}
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                );
                                            }) : (
                                                <Box className="dash-empty-state">
                                                    <ShoppingBagIcon sx={{ fontSize: 60, color: 'var(--es-emerald)', opacity: 0.15, mb: 2 }} />
                                                    <Typography variant="h6" color="var(--es-charcoal)">No orders placed yet.</Typography>
                                                    <Typography color="var(--es-charcoal-60)">Explore our shop and place your first order!</Typography>
                                                </Box>
                                            )}
                                        </Grid>
                                    );
                                })()}

                                {activeView === "cards" && (
                                    <Box className="dash-cards-grid">
                                        {cards.length > 0 ? cards.map((card) => (
                                            <div className="dash-card-wrapper" key={card.id}>
                                                <PremiumOfferCard
                                                    offer={card.offer}
                                                    cardData={card}
                                                    showClaimButton={false}
                                                />
                                            </div>
                                        )) : (
                                            <Box className="dash-empty-state">
                                                <ConfirmationNumberIcon sx={{ fontSize: 60, color: 'var(--es-emerald)', opacity: 0.15, mb: 2 }} />
                                                <Typography variant="h6">No digital cards claimed.</Typography>
                                                <Typography color="var(--es-charcoal-60)">Exclusive offers are waiting for you.</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                )}

                                {activeView === "wallet" && (
                                    <Box sx={{ animation: 'fadeIn 0.5s ease' }}>
                                        {/* Wallet Balance Card */}
                                        <Card sx={{
                                            mb: 5,
                                            borderRadius: '24px',
                                            background: 'linear-gradient(135deg, var(--es-emerald) 0%, #083c32 100%)',
                                            boxShadow: '0 20px 40px rgba(15,93,78,0.15)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            border: '1px solid rgba(255,255,255,0.12)'
                                        }}>
                                            {/* Decorative Background Elements */}
                                            <Box sx={{
                                                position: 'absolute', top: -50, right: -50, width: 200, height: 200,
                                                background: 'radial-gradient(circle, rgba(244, 201, 196, 0.15) 0%, rgba(0,0,0,0) 70%)',
                                                borderRadius: '50%'
                                            }} />
                                            <Box sx={{
                                                position: 'absolute', bottom: -50, left: -50, width: 150, height: 150,
                                                background: 'radial-gradient(circle, rgba(244, 201, 196, 0.1) 0%, rgba(0,0,0,0) 70%)',
                                                borderRadius: '50%'
                                            }} />

                                            <CardContent sx={{ position: 'relative', zIndex: 1, p: { xs: 4, md: 6 }, textAlign: 'center' }}>
                                                <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--es-blush)', letterSpacing: '0.05em', textTransform: 'uppercase', mb: 1, fontWeight: 500 }}>
                                                    Available Balance
                                                </Typography>
                                                <Typography sx={{ fontFamily: 'var(--font-serif)', fontSize: { xs: '42px', md: '56px' }, fontWeight: 500, color: '#fff', mb: 4, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                                                    ₹{parseFloat(walletBalance).toFixed(2)}
                                                </Typography>

                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    flexDirection: { xs: 'column', sm: 'row' },
                                                    maxWidth: '500px',
                                                    mx: 'auto'
                                                }}>
                                                    <Box sx={{ position: 'relative', width: { xs: '100%', sm: 'auto' } }}>
                                                        <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--es-blush)', fontSize: '18px', fontWeight: 600 }}>₹</span>
                                                        <input
                                                            type="number"
                                                            placeholder="Amount to add"
                                                            value={addAmount}
                                                            onChange={(e) => setAddAmount(e.target.value)}
                                                            style={{
                                                                padding: '16px 20px 16px 40px',
                                                                borderRadius: '14px',
                                                                background: 'rgba(255,255,255,0.08)',
                                                                border: '1px solid rgba(255,255,255,0.15)',
                                                                color: '#fff',
                                                                fontFamily: 'var(--font-sans)',
                                                                fontSize: '16px',
                                                                outline: 'none',
                                                                width: '100%',
                                                                boxSizing: 'border-box',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.12)'}
                                                            onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
                                                        />
                                                    </Box>
                                                    <motion.button
                                                        whileHover={{ scale: processingPayment ? 1 : 1.05 }}
                                                        whileTap={{ scale: processingPayment ? 1 : 0.95 }}
                                                        onClick={handleAddMoney}
                                                        disabled={processingPayment}
                                                        style={{
                                                            background: 'linear-gradient(135deg, var(--es-blush-soft) 0%, var(--es-blush) 100%)',
                                                            color: 'var(--es-charcoal)',
                                                            border: 'none',
                                                            borderRadius: '14px',
                                                            padding: '16px 32px',
                                                            fontFamily: 'var(--font-sans)',
                                                            fontSize: '16px',
                                                            fontWeight: 600,
                                                            cursor: processingPayment ? 'not-allowed' : 'pointer',
                                                            opacity: processingPayment ? 0.7 : 1,
                                                            boxShadow: '0 8px 20px rgba(15, 93, 78, 0.15)',
                                                            width: '100%',
                                                            maxWidth: '200px'
                                                        }}
                                                    >
                                                        {processingPayment ? "Processing..." : "Add Money"}
                                                    </motion.button>
                                                </Box>
                                            </CardContent>
                                        </Card>

                                        {/* Transactions Section */}
                                        <Typography sx={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 500, color: 'var(--es-charcoal)', mb: 3 }}>
                                            Recent Transactions
                                        </Typography>

                                        {walletTransactions.length > 0 ? (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                {walletTransactions.map((tx) => (
                                                    <motion.div key={tx.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                                                        <Card sx={{
                                                            background: '#fff',
                                                            border: '1px solid var(--es-charcoal-5)',
                                                            borderRadius: '16px',
                                                            boxShadow: 'var(--es-shadow)',
                                                            transition: 'transform 0.2s',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: 'var(--es-shadow-md)' }
                                                        }}>
                                                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '20px !important' }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                    <Box sx={{
                                                                        width: 48, height: 48, borderRadius: '12px',
                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                        background: tx.type === 'credit' ? 'var(--es-emerald-muted)' : 'rgba(255,59,48,0.08)',
                                                                        color: tx.type === 'credit' ? 'var(--es-emerald)' : '#ff3b30'
                                                                    }}>
                                                                        {tx.type === 'credit' ? <AccountBalanceWalletIcon /> : <ShoppingBagOutlinedIcon />}
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 600, color: 'var(--es-charcoal)' }}>
                                                                            {tx.source.replace(/_/g, ' ')}
                                                                        </Typography>
                                                                        <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--es-charcoal-60)' }}>
                                                                            {new Date(tx.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                                <Box textAlign="right">
                                                                    <Typography sx={{
                                                                        fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 700,
                                                                        color: tx.type === 'credit' ? 'var(--es-emerald)' : 'var(--es-charcoal)'
                                                                    }}>
                                                                        {tx.type === 'credit' ? '+' : '-'} ₹{parseFloat(tx.amount).toFixed(2)}
                                                                    </Typography>
                                                                    <Box sx={{
                                                                        display: 'inline-block', mt: 0.5, px: 1.5, py: 0.5, borderRadius: '6px',
                                                                        background: tx.status === 'success' ? 'var(--es-emerald-muted)' : tx.status === 'pending' ? 'rgba(255,204,0,0.08)' : 'rgba(255,59,48,0.08)',
                                                                    }}>
                                                                        <Typography sx={{
                                                                            fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                                                                            color: tx.status === 'success' ? 'var(--es-emerald)' : tx.status === 'pending' ? '#d4a000' : '#ff3b30'
                                                                        }}>
                                                                            {tx.status}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>
                                                    </motion.div>
                                                ))}
                                            </Box>
                                        ) : (
                                            <Box sx={{
                                                textAlign: 'center', py: 8, background: '#fff', borderRadius: '20px',
                                                boxShadow: 'var(--es-shadow)', border: '1px dashed var(--es-charcoal-10)'
                                            }}>
                                                <AccountBalanceWalletIcon sx={{ fontSize: 64, color: 'var(--es-emerald)', opacity: 0.15, mb: 2 }} />
                                                <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 600, color: 'var(--es-charcoal)' }}>No transactions yet.</Typography>
                                                <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--es-charcoal-60)', mt: 1 }}>Your wallet activity will appear here.</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                )}

                                {activeView === "profile" && (
                                    <Card className="luxury-profile-card">
                                        <CardContent>
                                            <div className="profile-row">
                                                <Typography className="profile-lbl">Full Name</Typography>
                                                <Typography className="profile-val">{customer?.username}</Typography>
                                            </div>
                                            <Divider className="luxury-divider" />
                                            <div className="profile-row">
                                                <Typography className="profile-lbl">Contact No</Typography>
                                                <Typography className="profile-val">{customer?.contact_no}</Typography>
                                            </div>
                                            <Divider className="luxury-divider" />
                                            <div className="profile-row">
                                                <Typography className="profile-lbl">Email Address</Typography>
                                                <Typography className="profile-val">{customer?.email || "Not provided"}</Typography>
                                            </div>
                                            <Divider className="luxury-divider" />
                                            <div className="profile-row">
                                                <Typography className="profile-lbl">Member Since</Typography>
                                                <Typography className="profile-val">
                                                    {new Date(customer?.created_at || Date.now()).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                                                </Typography>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {/* --- Mini Footer --- */}
                    <Box sx={{ mt: 10, pt: 4, borderTop: '1px solid var(--es-charcoal-10)', textAlign: 'center', opacity: 0.5 }}>
                        <Typography variant="body2" color="var(--es-charcoal-60)">
                            © {BRAND_COPYRIGHT_YEAR} {BRAND_PORTAL}. All Rights Reserved.
                        </Typography>
                    </Box>
                </Box>
            </main>

            {/* --- Mobile Overlay --- */}
            {isMobile && sidebarOpen && (
                <Box
                    className="dash-mobile-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </Box>
    );
};

export default Dashboard;
