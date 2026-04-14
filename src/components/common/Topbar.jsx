/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

import API from '../../apis';

/* ── nav links ── */
const navLinks = [
  { label: 'Salons', href: '/salons' },
  { label: 'Job Seeker', href: '/job-seeker' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/* ── mobile bottom nav ── */
const mobileNav = [
  { label: 'Home', href: '/', Icon: HomeOutlinedIcon },
  { label: 'Salons', href: '/salons', Icon: ContentCutOutlinedIcon },
  { label: 'Jobs', href: '/job-seeker', Icon: WorkOutlineOutlinedIcon },
  { label: 'Shop', href: '/products', Icon: StorefrontOutlinedIcon },
  { label: 'Account', href: '/login', Icon: PersonOutlineOutlinedIcon },
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

  /* ── keep existing auth logic ── */
  const customer = API.CustomerAPI.getCustomer();
  const isLoggedIn = API.CustomerAPI.isLoggedIn();

  const getUserInitials = () => {
    if (!customer?.username) return 'U';
    const names = customer.username.split(' ');
    if (names.length >= 2) return (names[0][0] + names[1][0]).toUpperCase();
    return customer.username.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    API.CustomerAPI.logout();
    navigate('/');
    window.location.reload();
  };

  /* ── scroll handler ── */
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.pageYOffset > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── close mobile menu on route change ── */
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ── Desktop / Tablet Navbar ── */}
      <header
        id="app-bar"
        style={{
          ...styles.appBar,
          background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 4px 20px rgba(26,10,0,0.08)' : 'none',
          borderBottom: '1px solid rgba(199,149,108,0.1)',
        }}
      >
        <div style={styles.toolbar}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexShrink: 0,
            }}
          >
            <div style={{
              width: 34,
              height: 34,
              background: 'linear-gradient(135deg, #1a0a00, #c7956c)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(199,149,108,0.2)',
            }}>
              <ContentCutOutlinedIcon sx={{ fontSize: 18, color: '#fff' }} />
            </div>
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: '22px',
              letterSpacing: '0.02em',
              color: '#1a0a00',
            }}>
              edensign
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="es-desktop-nav">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href ||
                (link.href !== '/' && location.pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{
                    textDecoration: 'none',
                    padding: '6px 16px',
                    borderRadius: '100px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '0.03em',
                    color: isActive ? '#c7956c' : '#1a0a00',
                    background: isActive ? 'rgba(199,149,108,0.1)' : 'transparent',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                  }}
                  className="es-nav-link"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="es-desktop-actions">
            {/* Search */}
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              color: '#1a0a00',
              transition: 'all 0.3s',
            }} className="es-icon-btn">
              <SearchIcon sx={{ fontSize: 20 }} />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              color: '#1a0a00',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }} className="es-icon-btn">
              <FavoriteBorderIcon sx={{ fontSize: 20 }} />
            </Link>

            {/* Cart */}
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              color: '#1a0a00',
              transition: 'all 0.3s',
            }} className="es-icon-btn">
              <ShoppingBagOutlinedIcon sx={{ fontSize: 20 }} />
            </button>

            {/* Auth */}
            {isLoggedIn ? (
              <div style={{ position: 'relative' }} className="es-profile-wrap">
                <button
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #c7956c, #a8724d)',
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
                    boxShadow: '0 2px 8px rgba(199,149,108,0.4)',
                  }}
                  className="es-avatar-btn"
                  title={customer?.username || 'Profile'}
                >
                  {getUserInitials()}
                </button>
                {/* Dropdown */}
                <div className="es-profile-dropdown">
                  <div className="es-profile-dropdown-inner">
                    <p style={{ margin: '0 0 4px 0', fontWeight: 600, fontSize: '14px', color: '#1a0f08', fontFamily: 'Inter, sans-serif' }}>
                      Hi, {customer?.username?.split(' ')[0] || 'User'} 👋
                    </p>
                    <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#a8724d', fontFamily: 'Inter, sans-serif' }}>
                      {customer?.email || ''}
                    </p>
                    <button onClick={handleLogout} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'none',
                      border: '1px solid rgba(199,149,108,0.3)',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      color: '#a8724d',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: 500,
                      width: '100%',
                      transition: 'background 0.2s',
                    }} className="es-logout-btn">
                      <LogoutIcon sx={{ fontSize: 16 }} />
                      Logout
                    </button>
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
                  padding: '9px 20px',
                  borderRadius: '100px',
                  background: 'linear-gradient(135deg, #c7956c, #a8724d)',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  marginLeft: '8px',
                  boxShadow: '0 2px 12px rgba(199,149,108,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                className="es-login-btn"
              >
                <LoginIcon sx={{ fontSize: 16 }} />
                Sign In
              </Link>
            )}

            {/* Mobile hamburger (visible only on mobile) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                display: 'none',
                color: '#1a0a00',
                marginLeft: '4px',
              }}
              className="es-hamburger"
              aria-label="Open menu"
            >
              <MenuIcon sx={{ fontSize: 24 }} />
            </button>
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
                background: 'rgba(26,10,0,0.5)',
                zIndex: 1299,
                backdropFilter: 'blur(4px)',
              }}
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                background: '#fff',
                zIndex: 1300,
                borderBottomLeftRadius: '24px',
                borderBottomRightRadius: '24px',
                padding: '24px 28px 32px',
                boxShadow: '0 8px 40px rgba(26,10,0,0.18)',
              }}
            >
              {/* Drawer header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
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
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '50%', color: '#6b5749' }}
                >
                  <CloseIcon sx={{ fontSize: 22 }} />
                </button>
              </div>

              {/* Nav links */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.href ||
                    (link.href !== '/' && location.pathname.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          display: 'block',
                          padding: '14px 16px',
                          textDecoration: 'none',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '15px',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? '#c7956c' : '#3d1e0a',
                          background: isActive ? 'rgba(199,149,108,0.08)' : 'transparent',
                          borderRadius: '12px',
                          borderLeft: isActive ? '3px solid #c7956c' : '3px solid transparent',
                          transition: 'all 0.2s',
                        }}
                      >
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

      {/* ── Mobile Bottom Navigation ── */}
      <nav className="es-mobile-bottom-nav">
        {mobileNav.map(({ label, href, Icon }) => {
          const isActive = location.pathname === href ||
            (href !== '/' && location.pathname.startsWith(href));
          return (
            <Link
              key={href}
              to={href}
              className={`es-bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon sx={{ fontSize: 22 }} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

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
          top: calc(100% + 12px);
          right: 0;
          min-width: 200px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(26,10,0,0.14);
          border: 1px solid rgba(199,149,108,0.12);
          pointer-events: none;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.25s ease, transform 0.25s ease;
          z-index: 10;
        }
        .es-profile-wrap:hover .es-profile-dropdown {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .es-profile-dropdown-inner { padding: 20px; }
        .es-logout-btn:hover { background: rgba(199,149,108,0.08) !important; }

        /* Mobile bottom nav */
        .es-mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1100;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-top: 1px solid rgba(199,149,108,0.12);
          padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
          box-shadow: 0 -4px 20px rgba(26,10,0,0.06);
          grid-template-columns: repeat(5, 1fr);
        }
        
        .es-bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          text-decoration: none;
          padding: 6px 4px;
          color: #9a8070;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: color 0.2s;
          min-width: 0;
          overflow: hidden;
        }
        .es-bottom-nav-item.active {
          color: #c7956c;
        }
        .es-bottom-nav-item:hover {
          color: #c7956c;
        }

        /* Responsive breakpoints */
        @media (max-width: 900px) {
          .es-desktop-nav, .es-desktop-actions { display: none !important; }
          .es-hamburger { display: flex !important; }
          .es-mobile-bottom-nav { display: grid !important; }
          /* Push page content above bottom nav */
          #main-div { padding-bottom: 65px; }
        }

        @media (max-width: 600px) {
          .es-login-btn span { display: none; }
        }

        @media (min-width: 901px) {
          .es-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default Topbar;
