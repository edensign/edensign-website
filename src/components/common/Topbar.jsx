/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

import API from '../../apis';

/* ── nav links ── */
const navLinks = [
  { label: 'Salons', href: '/salons' },
  { label: 'Job Seeker', href: '/job-seeker' },
  { label: 'Products', href: '/products' },
  { label: 'Academy', href: '/academy' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/* ── sidebar links ── */
const sidebarLinks = [
  { label: 'Home', href: '/', Icon: HomeOutlinedIcon },
  { label: 'Salons', href: '/salons', Icon: ContentCutOutlinedIcon },
  { label: 'Job Seeker', href: '/job-seeker', Icon: WorkOutlineOutlinedIcon },
  { label: 'Products', href: '/products', Icon: StorefrontOutlinedIcon },
  { label: 'Academy', href: '/academy', Icon: SchoolOutlinedIcon },
  { label: 'About Us', href: '/about', Icon: InfoOutlinedIcon },
  { label: 'Contact', href: '/contact', Icon: CallOutlinedIcon },
];

/* ── styles ── */
const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1200,
    transition: 'all 0.4s ease',
  },
  appBarScrolled: {
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 2px 20px rgba(26,10,0,0.08)',
    borderBottom: '1px solid rgba(199,149,108,0.12)',
  },
  appBarTransparent: {
    background: 'transparent',
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    height: '72px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
  },
};

function Topbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = React.useState(false);
  const profileRef = React.useRef(null);

  /* ── cart quantity from redux ── */
  const cartTotalQty = useSelector(state => state.cart.totalQty);

  /* ── keep existing auth logic — memoized to avoid re-running on every cart update ── */
  const customer = React.useMemo(() => API.CustomerAPI.getCustomer(), []);
  const isLoggedIn = React.useMemo(() => API.CustomerAPI.isLoggedIn(), []);

  const getUserInitials = React.useCallback(() => {
    if (!customer?.username) return 'U';
    const names = customer.username.split(' ');
    if (names.length >= 2) return (names[0][0] + names[1][0]).toUpperCase();
    return customer.username.substring(0, 2).toUpperCase();
  }, [customer?.username]);

  const handleLogout = React.useCallback(() => {
    API.CustomerAPI.logout();
    navigate('/');
    window.location.reload();
  }, [navigate]);

  /* ── scroll handler ── */
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.pageYOffset > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── close mobile menu on route change ── */
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  /* ── close profile dropdown on click outside ── */
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* ── Desktop / Tablet Navbar ── */}
      <header
        id="app-bar"
        style={{
          ...styles.appBar,
          background: scrolled ? 'rgba(255, 248, 245, 0.85)' : 'rgba(255, 248, 245, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 4px 20px rgba(127, 85, 50, 0.08)' : 'none',
          borderBottom: '1px solid rgba(213, 195, 184, 0.4)',
          height: '80px',
        }}
      >
        <div style={{ ...styles.toolbar, height: '80px' }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 600,
              fontSize: '24px',
              letterSpacing: '0.15em',
              color: 'var(--es-primary)',
              textTransform: 'uppercase',
            }}>
              Eden Sign
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="es-desktop-nav" style={{ gap: '20px' }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href ||
                (link.href !== '/' && location.pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-label-caps"
                  style={{
                    textDecoration: 'none',
                    padding: '8px 12px',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--es-primary)' : 'var(--es-on-surface-variant)',
                    borderBottom: isActive ? '2px solid var(--es-primary)' : '2px solid transparent',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="es-actions-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Desktop Actions */}
            <div className="es-desktop-actions">


              <button
                onClick={() => navigate('/cart')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--es-on-surface-variant)',
                  transition: 'all 0.3s',
                  position: 'relative',
                }}
                className="es-icon-btn"
                aria-label="Cart"
              >
                <ShoppingBagOutlinedIcon sx={{ fontSize: 20 }} />
                {cartTotalQty > 0 && (
                  <motion.span
                    key={cartTotalQty}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    style={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      minWidth: 17,
                      height: 17,
                      borderRadius: '100px',
                      background: 'var(--es-primary)',
                      color: '#fff',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '9px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                      lineHeight: 1,
                      padding: '0 4px',
                      boxShadow: '0 2px 6px rgba(127, 85, 50, 0.4)',
                    }}
                  >
                    {cartTotalQty > 99 ? '99+' : cartTotalQty}
                  </motion.span>
                )}
              </button>

              {isLoggedIn ? (
                <div style={{ position: 'relative' }} className="es-profile-wrap" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'var(--es-primary)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '13px',
                      color: '#fff',
                      marginLeft: '4px',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      boxShadow: '0 2px 8px rgba(127, 85, 50, 0.3)',
                    }}
                    className="es-avatar-btn"
                    title={customer?.username || 'Profile'}
                  >
                    {getUserInitials()}
                  </button>
                  <div className={`es-profile-dropdown ${profileOpen ? 'is-open' : ''}`}>
                    <div className="es-profile-dropdown-inner" style={{ padding: '20px' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <p style={{ margin: '0', fontWeight: 700, fontSize: '15px', color: 'var(--es-espresso)', fontFamily: 'Inter, sans-serif' }}>
                          Hi, {customer?.username?.split(' ')[0] || 'User'} 👋
                        </p>
                        <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--es-on-surface-variant)', opacity: 0.7, fontFamily: 'Inter, sans-serif', wordBreak: 'break-all' }}>
                          {customer?.email || ''}
                        </p>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                          onClick={() => navigate('/dashboard')}
                          className="es-profile-menu-btn"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: '#fdfaf7',
                            border: '1px solid rgba(199,149,108,0.1)',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            cursor: 'pointer',
                            color: 'var(--es-espresso)',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13.5px',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                            textAlign: 'left'
                          }}
                        >
                          <PersonOutlineOutlinedIcon sx={{ fontSize: 18, color: 'var(--es-primary)' }} />
                          Dashboard
                        </button>

                        <button
                          onClick={handleLogout}
                          className="es-profile-menu-btn es-logout-btn-dropdown"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'transparent',
                            border: '1px solid rgba(255,59,48,0.1)',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            cursor: 'pointer',
                            color: '#ff3b30',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13.5px',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                            textAlign: 'left'
                          }}
                        >
                          <LogoutIcon sx={{ fontSize: 18 }} />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    padding: '8px 20px',
                    borderRadius: '100px',
                    background: 'linear-gradient(135deg, #c7956c 0%, #7f5532 100%)',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginLeft: '8px',
                    boxShadow: '0 4px 12px rgba(127, 85, 50, 0.2)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  className="es-login-btn font-label-caps"
                >
                  <LoginIcon sx={{ fontSize: 14 }} />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Actions (Visible on mobile) */}
            <div className="es-mobile-actions" style={{ display: 'none', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => navigate('/cart')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#1a0a00',
                  position: 'relative',
                }}
                aria-label="Cart"
              >
                <ShoppingBagOutlinedIcon sx={{ fontSize: 22 }} />
                {cartTotalQty > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      minWidth: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: '#c7956c',
                      color: '#fff',
                      fontSize: '9px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 2px',
                    }}
                  >
                    {cartTotalQty > 99 ? '99+' : cartTotalQty}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  color: '#1a0a00',
                }}
                className="es-hamburger"
                aria-label="Open menu"
              >
                <MenuIcon sx={{ fontSize: 26 }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Slide-down Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(26,10,0,0.4)',
                zIndex: 1400,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 350 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(320px, 85%)',
                background: '#fff',
                zIndex: 1500,
                padding: '32px 28px',
                boxShadow: '-10px 0 40px rgba(26,10,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Drawer header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    background: 'linear-gradient(135deg, #1a0a00, #c7956c)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <ContentCutOutlinedIcon sx={{ fontSize: 16, color: '#fff' }} />
                  </div>
                  <span style={{
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: '#1a0a00',
                  }}>edensign</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ background: '#f8f5f2', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', color: '#6b5749', display: 'flex' }}
                >
                  <CloseIcon sx={{ fontSize: 20 }} />
                </button>
              </div>

              {/* Nav links */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto', margin: '0 -4px' }}>
                {sidebarLinks.map((link, i) => {
                  const Icon = link.Icon;
                  const isActive = location.pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '12px 16px',
                          textDecoration: 'none',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '15px',
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? '#c7956c' : '#3d1e0a',
                          background: isActive ? 'rgba(199,149,108,0.08)' : 'transparent',
                          borderRadius: '12px',
                          transition: 'all 0.2s',
                        }}
                      >
                        <Icon sx={{ fontSize: 20, opacity: isActive ? 1 : 0.6 }} />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Auth section */}
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(199,149,108,0.15)' }}>
                {isLoggedIn ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#3d1e0a', fontWeight: 600 }}>
                      Hi, {customer?.username?.split(' ')[0] || 'User'} 👋
                    </span>
                    <button onClick={handleLogout} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      background: 'rgba(199,149,108,0.1)', border: '1px solid rgba(199,149,108,0.3)',
                      borderRadius: '8px', padding: '8px 14px', cursor: 'pointer',
                      color: '#a8724d', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500,
                    }}>
                      <LogoutIcon sx={{ fontSize: 15 }} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      textDecoration: 'none', padding: '14px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #1a0a00, #3d1e0a)',
                      color: '#fff',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    <LoginIcon sx={{ fontSize: 18 }} />
                    Sign In to Your Account
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Removed */}

      {/* ── Topbar CSS ── */}
      <style>{`
        /* Desktop layouts */
        .es-desktop-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .es-desktop-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Nav link hover */
        .es-nav-link:hover {
          background: rgba(199,149,108,0.08) !important;
          color: #c7956c !important;
        }

        /* Icon button hover */
        .es-icon-btn:hover {
          background: rgba(199,149,108,0.1);
          color: #c7956c !important;
        }

        /* Login button hover */
        .es-login-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(199,149,108,0.5) !important;
        }

        /* Avatar hover */
        .es-avatar-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 4px 16px rgba(199,149,108,0.5) !important;
        }

        /* Profile dropdown */
        .es-profile-wrap { position: relative; }
        .es-profile-dropdown {
          position: absolute;
          top: calc(100% + 16px);
          right: -8px;
          min-width: 240px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 15px 50px rgba(26,10,0,0.18);
          border: 1px solid rgba(199,149,108,0.12);
          pointer-events: none;
          opacity: 0;
          transform: translateY(-12px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2000;
        }
        .es-profile-dropdown.is-open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .es-profile-menu-btn:hover {
          background: #f8f1eb !important;
          border-color: rgba(199,149,108,0.3) !important;
          transform: translateX(4px);
        }
        .es-logout-btn-dropdown:hover {
          background: rgba(255,59,48,0.05) !important;
          border-color: rgba(255,59,48,0.2) !important;
        }
        .es-profile-dropdown-inner { padding: 20px; }
        .es-logout-btn:hover { background: rgba(199,149,108,0.08) !important; }

        /* Responsive breakpoints */
        @media (max-width: 900px) {
          .es-desktop-nav, .es-desktop-actions { display: none !important; }
          .es-mobile-actions { display: flex !important; }
        }

        @media (max-width: 600px) {
          .es-login-btn span { display: none; }
          .toolbar { padding: 0 16px !important; }
        }

        @media (min-width: 901px) {
          .es-mobile-actions { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default Topbar;
