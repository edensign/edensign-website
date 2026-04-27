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

import API from "../../../apis";
import PremiumOfferCard from "../../common/PremiumOfferCard";
import "./Dashboard.css";

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [activeView, setActiveView] = useState("appointments");
    const [appointments, setAppointments] = useState([]);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
    
    const customer = API.CustomerAPI.getCustomer();
    const token = API.CustomerAPI.getToken();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [apptRes, cardRes] = await Promise.all([
                API.AppointmentAPI.getMyAppointments(token),
                API.DigitalOfferAPI.getMyCards(token)
            ]);

            if (apptRes.status === "Success") {
                setAppointments(apptRes.data.rows || []);
            }
            if (cardRes.status === "Success") {
                setCards(cardRes.data.rows || []);
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

    const handleLogout = () => {
        API.CustomerAPI.logout();
        window.location.href = "/";
    };

    const menuItems = [
        { id: "appointments", label: "Appointments", icon: <CalendarMonthIcon />, count: appointments.length },
        { id: "cards", label: "Offer Cards", icon: <ConfirmationNumberIcon />, count: cards.length },
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
