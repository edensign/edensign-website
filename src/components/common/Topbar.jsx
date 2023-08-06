/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();

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


  window.onscroll = () => {
    const btnBox = document.getElementsByClassName("btn-box");
    const linkPage = document.getElementsByClassName("link-page");
    const appbar = document.getElementById("app-bar");
    const mainDiv = document.getElementById("main-div");

    const welcomeText = document.getElementsByClassName("bigger-text")[0];
    const welcomeLine = document.getElementsByClassName("offer-line")[0];
    const serviceLine = document.getElementsByClassName("offer-line")[1];
    const offersLine = document.getElementsByClassName("offer-line")[2];
    const locationsLine = document.getElementsByClassName("offer-line")[3];
    const facilitiesImg = document.getElementsByClassName("facilities-img-box")[0];
    const facilitiesListLeft = document.getElementsByClassName("facilities-list-left")[0];
    const facilitiesListRight = document.getElementsByClassName("facilities-list-right")[0];
    let scroll = window.pageYOffset;
    console.log(scroll);

    if (scroll > 40) {
      appbar.style.backgroundColor = "#ffffff";
      Array.from(btnBox).forEach(btn => {
        btn.style.color = "#000000";
      });
      Array.from(linkPage).forEach(link => {
        link.style.color = "#000000";
      });
    } else {
      appbar.style.background = "transparent";
      Array.from(btnBox).forEach(btn => {
        btn.style.color = "#ffffff";
      });
      Array.from(linkPage).forEach(link => {
        link.style.color = "#ffffff";
      });
    }

    if (scroll > 500 && welcomeLine) {
      welcomeLine.classList.add("clip-line");
    }

    if (scroll > 600 && welcomeText) {
      welcomeText.style.animation = `shine 4s linear`;
    }

    if (scroll > 800 && facilitiesImg) {
      facilitiesImg.classList.add("facilities-img-box-show");
      facilitiesListLeft.classList.add("facilities-list-show");
      facilitiesListRight.classList.add("facilities-list-show");
    }

    if (scroll > 1450 && serviceLine) {
      serviceLine.classList.add("clip-line");
    }

    if (scroll > 3000 && offersLine) {
      offersLine.classList.add("clip-line");
    }

    if (scroll > 6230) {
      locationsLine.classList.add("clip-line");
    }


    //changing background gradients on page scroll
    // if (scroll > 500 && scroll < 2499) {
    //   mainDiv.style.background = location.pathname === "/salons" ? `linear-gradient(to left, rgb(166,179,195), rgb(166,179,195))` :
    //     `linear-gradient(to left, #f4c4f3, #fc67fa)`;
    // }
    // if (scroll > 2500 && scroll < 3999) {
    //   mainDiv.style.background = location.pathname === "/salons" ? `linear-gradient(to left, rgb(166,179,195), rgb(166,179,195))` :
    //     `linear-gradient(to top, #fbd3e9, #bb377d)`;
    // }
    // if (scroll > 4000 && scroll < 7000) {
    //   mainDiv.style.background = location.pathname === "/salons" ? `linear-gradient(to left, rgb(166,179,195), rgb(166,179,195))` :
    //     `linear-gradient(to bottom right, #800080, #ffc0cb)`;
    // }

  };

  return (
    <AppBar position="fixed" id="app-bar" sx={{
      background: "transparent", boxShadow: "none", right: "auto"
    }}>
      <Toolbar disableGutters sx={{ justifyContent: "space-between", padding: "30px" }}>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }} />
        <Typography sx={{
          display: { xs: 'none', md: "flex" }, textTransform: "uppercase", letterSpacing: "0.4rem", fontSize: "1.6em", fontFamily: "Inter, sans-serif", lineHeight: "1.6", color: "#000000"
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
          EDEN SIGN
        </Typography>

        <Box className="btn-box" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "space-evenly" }}>
          {pages.map(page => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 1, display: 'block', fontSize: "12px", letterSpacing: "0.13em", lineHeight: "1.14", fontWeight: "500", textTransform: "uppercase" }}
            >
              <Link className="link-page" style={{ textDecoration: "none", color: "#ffffff" }} to={`/${page.charAt(0).toLowerCase() + page.slice(1)}`}>
                {page} </Link>
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end" }}>
          <IconButton sx={{ marginRight: "2%", color: "#000000" }}>
            <Tooltip title="Search">
              <SearchIcon sx={{
                fontSize: "22px",
                "&:hover": {
                  fontSize: "28px",
                  transition: "all 0.5s ease"
                }
              }} />
            </Tooltip>
          </IconButton>
          <IconButton sx={{ marginRight: "2%", color: "#000000" }}>
            <Tooltip title="Login">
              <LoginIcon sx={{
                fontSize: "22px",
                "&:hover": {
                  fontSize: "28px",
                  transition: "all 0.5s ease"
                }
              }}
              />
            </Tooltip>
          </IconButton>
          <IconButton sx={{ marginRight: "2%", color: "#000000" }}>
            <Tooltip title="Wishlist">
              <FavoriteBorderIcon sx={{
                fontSize: "22px",
                "&:hover": {
                  fontSize: "28px",
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
                    fontSize: "22px",
                    "&:hover": {
                      fontSize: "28px",
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
