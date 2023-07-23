/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import * as React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Button, Tooltip, useTheme } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import { ColorModeContext, tokens } from "../../theme";

const pages = ['About', 'Services', 'Salons', 'Products', 'contact'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Topbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = React.useContext(ColorModeContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    window.onscroll = (e) => {
      const btnBox = document.getElementById("btn-box");
      const linkPage = document.getElementById("link-page");
      const appbar = document.getElementById("app-bar");
      let scroll = window.pageYOffset;

      if (scroll > 40) {
        btnBox.style.color = "#000000 !important";
        linkPage.style.color = "#000000 !important";
        appbar.style.backgroundColor = "#ffffff";
      } else {
        btnBox.style.color = "#ffffff !important";
        linkPage.style.color = "#ffffff !important";
        appbar.style.background = "transparent";
      }
    };
  }, []);

  return (
    <AppBar position="fixed" id="app-bar" sx={{
      background: "transparent", boxShadow: "none", right: "auto"
    }}>
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }} />
        <Typography variant="h3" sx={{
          textTransform: "uppercase", letterSpacing: "0.4rem", fontSize: "1.4rem", fontFamily: "Inter, sans-serif", lineHeight: "1.6", color: "#000000"
        }}>
          <Link style={{ textDecoration: "none", color: "#000000" }} to="/"> edensign </Link>
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map(page => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: "center", fontFamily: "Inter, sans-serif", color: "#ffffff" }}>
                  {page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            paddingRight: '20px',
            fontFamily: 'monospace',
            fontWeight: 400,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          LOGOoooooooooooooo
        </Typography>

        <Box id="btn-box" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "space-evenly" }}>
          {pages.map(page => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 1, display: 'block', fontSize: "10px", letterSpacing: "0.13em", lineHeight: "1.14", fontWeight: "700", textTransform: "uppercase" }}
            >
              <Link id="link-page" style={{ textDecoration: "none", color: "#ffffff" }} to={`/${page.charAt(0).toLowerCase() + page.slice(1)}`}>
                {page} </Link>
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1, mr: "2%", display: 'flex', justifyContent: "flex-end" }}>
          <IconButton sx={{ marginRight: "2%", color: "#000000" }}>
            <Tooltip title="Search">
              <SearchIcon sx={{
                fontSize: "16px",
                "&:hover": {
                  fontSize: "22px",
                  transition: "all 0.5s ease"
                }
              }} />
            </Tooltip>
          </IconButton>
          <IconButton sx={{ marginRight: "2%", color: "#000000" }}>
            <Tooltip title="Login">
              <LoginIcon sx={{
                fontSize: "16px",
                "&:hover": {
                  fontSize: "22px",
                  transition: "all 0.5s ease"
                }
              }}
              />
            </Tooltip>
          </IconButton>
          <IconButton sx={{ marginRight: "2%", color: "#000000" }}>
            <Tooltip title="Wishlist">
              <FavoriteBorderIcon sx={{
                fontSize: "16px",
                "&:hover": {
                  fontSize: "22px",
                  transition: "all 0.5s ease"
                }
              }}
              />
            </Tooltip>
          </IconButton>
          <Box className="media">
            <IconButton sx={{ marginRight: "2%", color: "#000000" }}>
              <Tooltip title="Cart">
                <ShoppingBagOutlinedIcon onClick={handleOpenUserMenu}
                  sx={{
                    fontSize: "16px",
                    "&:hover": {
                      fontSize: "22px",
                      transition: "all 0.5s ease"
                    }
                  }}
                />
              </Tooltip>
            </IconButton>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            ></Menu>

            {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
