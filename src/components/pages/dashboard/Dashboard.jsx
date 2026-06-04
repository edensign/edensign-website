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

import API from "../../../apis";
import { api } from "../../../apis/config/axiosConfig";
import PremiumOfferCard from "../../common/PremiumOfferCard";
import { loadRazorpayScript } from "../../utils/razorpay";
import { useToast } from "../../common/Toast";
import "./Dashboard.css";

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [activeView, setActiveView] = useState("appointments");
    const [appointments, setAppointments] = useState([]);
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
            const [apptRes, cardRes, balanceRes, txRes] = await Promise.all([
                API.AppointmentAPI.getMyAppointments(token),
                API.DigitalOfferAPI.getMyCards(token),
                api.get('/wallet/balance', { headers: { Authorization: `Bearer ${token}` } }),
                api.get('/wallet/transactions', { headers: { Authorization: `Bearer ${token}` } })
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
                name: 'Eden Sign',
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
                    <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: '#c9a84c' }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography className="dash-mobile-title">EdenSign Dashboard</Typography>
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
                            <CircularProgress sx={{ color: '#c9a84c' }} />
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
                                                                <Typography className="appt-footer-val">{appt.services || "Selected Services"}</Typography>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        )) : (
                                            <Box className="dash-empty-state">
                                                <CalendarMonthIcon sx={{ fontSize: 60, color: '#c7956c', opacity: 0.2, mb: 2 }} />
                                                <Typography variant="h6" color="#1a0f08">No appointments booked yet.</Typography>
                                                <Typography color="#6b5749">Start your beauty journey today.</Typography>
                                            </Box>
                                        )}
                                    </Grid>
                                )}

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
                                                <ConfirmationNumberIcon sx={{ fontSize: 60, opacity: 0.1, mb: 2 }} />
                                                <Typography variant="h6">No digital cards claimed.</Typography>
                                                <Typography color="rgba(255,255,255,0.4)">Exclusive offers are waiting for you.</Typography>
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
                                            background: 'linear-gradient(135deg, #1a0a00 0%, #3d1e0a 100%)',
                                            boxShadow: '0 20px 40px rgba(26,10,0,0.15)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            border: '1px solid rgba(199,149,108,0.2)'
                                        }}>
                                            {/* Decorative Background Elements */}
                                            <Box sx={{
                                                position: 'absolute', top: -50, right: -50, width: 200, height: 200,
                                                background: 'radial-gradient(circle, rgba(199,149,108,0.15) 0%, rgba(0,0,0,0) 70%)',
                                                borderRadius: '50%'
                                            }} />
                                            <Box sx={{
                                                position: 'absolute', bottom: -50, left: -50, width: 150, height: 150,
                                                background: 'radial-gradient(circle, rgba(199,149,108,0.1) 0%, rgba(0,0,0,0) 70%)',
                                                borderRadius: '50%'
                                            }} />

                                            <CardContent sx={{ position: 'relative', zIndex: 1, p: { xs: 4, md: 6 }, textAlign: 'center' }}>
                                                <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#c7956c', letterSpacing: '0.05em', textTransform: 'uppercase', mb: 1 }}>
                                                    Available Balance
                                                </Typography>
                                                <Typography sx={{ fontFamily: 'Playfair Display, serif', fontSize: { xs: '42px', md: '56px' }, fontWeight: 700, color: '#fff', mb: 4, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
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
                                                        <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#a8724d', fontSize: '18px', fontWeight: 600 }}>₹</span>
                                                        <input 
                                                            type="number" 
                                                            placeholder="Amount to add" 
                                                            value={addAmount} 
                                                            onChange={(e) => setAddAmount(e.target.value)}
                                                            style={{ 
                                                                padding: '16px 20px 16px 40px', 
                                                                borderRadius: '14px', 
                                                                background: 'rgba(255,255,255,0.08)', 
                                                                border: '1px solid rgba(199,149,108,0.4)',
                                                                color: '#fff',
                                                                fontFamily: 'Inter, sans-serif',
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
                                                            background: 'linear-gradient(135deg, #c7956c, #a8724d)', 
                                                            color: '#fff', 
                                                            border: 'none',
                                                            borderRadius: '14px',
                                                            padding: '16px 32px',
                                                            fontFamily: 'Inter, sans-serif',
                                                            fontSize: '16px',
                                                            fontWeight: 600,
                                                            cursor: processingPayment ? 'not-allowed' : 'pointer',
                                                            opacity: processingPayment ? 0.7 : 1,
                                                            boxShadow: '0 8px 20px rgba(199,149,108,0.4)',
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
                                        <Typography sx={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 700, color: '#1a0f08', mb: 3 }}>
                                            Recent Transactions
                                        </Typography>
                                        
                                        {walletTransactions.length > 0 ? (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                {walletTransactions.map((tx) => (
                                                    <motion.div key={tx.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                                                        <Card sx={{ 
                                                            background: '#fff', 
                                                            border: 'none', 
                                                            borderRadius: '16px',
                                                            boxShadow: '0 4px 15px rgba(26,10,0,0.03)',
                                                            transition: 'transform 0.2s',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(26,10,0,0.06)' }
                                                        }}>
                                                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '20px !important' }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                    <Box sx={{
                                                                        width: 48, height: 48, borderRadius: '12px',
                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                        background: tx.type === 'credit' ? 'rgba(76,217,100,0.1)' : 'rgba(255,59,48,0.1)',
                                                                        color: tx.type === 'credit' ? '#34c759' : '#ff3b30'
                                                                    }}>
                                                                        {tx.type === 'credit' ? <AccountBalanceWalletIcon /> : <ShoppingBagOutlinedIcon />}
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: '#1a0f08' }}>
                                                                            {tx.source.replace(/_/g, ' ')}
                                                                        </Typography>
                                                                        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9a8070' }}>
                                                                            {new Date(tx.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                                <Box textAlign="right">
                                                                    <Typography sx={{ 
                                                                        fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 700,
                                                                        color: tx.type === 'credit' ? '#34c759' : '#1a0f08' 
                                                                    }}>
                                                                        {tx.type === 'credit' ? '+' : '-'} ₹{parseFloat(tx.amount).toFixed(2)}
                                                                    </Typography>
                                                                    <Box sx={{ 
                                                                        display: 'inline-block', mt: 0.5, px: 1.5, py: 0.5, borderRadius: '6px',
                                                                        background: tx.status === 'success' ? 'rgba(76,217,100,0.1)' : tx.status === 'pending' ? 'rgba(255,204,0,0.1)' : 'rgba(255,59,48,0.1)',
                                                                    }}>
                                                                        <Typography sx={{ 
                                                                            fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                                                                            color: tx.status === 'success' ? '#34c759' : tx.status === 'pending' ? '#d4a000' : '#ff3b30'
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
                                                boxShadow: '0 4px 15px rgba(26,10,0,0.03)', border: '1px dashed rgba(199,149,108,0.3)' 
                                            }}>
                                                <AccountBalanceWalletIcon sx={{ fontSize: 64, color: '#c7956c', opacity: 0.2, mb: 2 }} />
                                                <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 600, color: '#1a0f08' }}>No transactions yet.</Typography>
                                                <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#9a8070', mt: 1 }}>Your wallet activity will appear here.</Typography>
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
                    <Box sx={{ mt: 10, pt: 4, borderTop: '1px solid rgba(199,149,108,0.1)', textAlign: 'center', opacity: 0.5 }}>
                        <Typography variant="body2" color="#6b5749">
                            © {new Date().getFullYear()} EdenSign Customer Portal. All Rights Reserved.
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
