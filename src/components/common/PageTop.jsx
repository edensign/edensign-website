/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Box, Button, Tooltip, Typography } from '@mui/material';
import { TuneOutlined } from '@mui/icons-material';
import { TrendingFlat } from '@mui/icons-material';
import SalonBg from "../assets/salons.jpg";

const PageTop = (props) => {
    const location = useLocation();
    const [filterOpen, setFilterOpen] = useState(false);

    const handleClick = () => {
        const box = document.getElementsByClassName("box")[0];
        const btn = document.getElementsByClassName("btn")[0];
        const filterBox = document.getElementById("filter-box");
        box.style.right = filterOpen ? "0" : "18.3%";
        btn.style.width = filterOpen ? "7vw" : "4vw";
        filterBox.style.opacity = filterOpen ? "0" : "1";
        filterBox.style.transform = filterOpen ? "translateX(100%)" : "translateX(0)";

        setFilterOpen(!filterOpen);
    };

    return (
        <Box sx={{
            height: "80vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid crimson",
            position: "relative",
            backgroundImage: `url(${SalonBg})`,
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            color: "#ffffff"
            // backgroundImage: "linear-gradient(69deg, #D9AFD9 0%, #97D9E1 100%)"
        }}
        > <Typography sx={{
            textTransform: "uppercase", fontSize: "36px", fontWeight: "300", lineHeight: "1", letterSpacing: "0.2em"
        }}
        >
                {props.name}
            </Typography>
            <Typography sx={{ color: "#ffffff", textTransform: "uppercase", fontWeight: "500", fontSize: "10px", lineHeight: "1.2", letterSpacing: "0.1em", marginTop: "8px" }}>
                <Link style={{ textDecoration: "none", color: "#ffffff", position: "relative", zIndex: "2" }} to="/"> HOME &gt; </Link>
                {location.pathname.slice(1)}
            </Typography>

            <Box className="box" onClick={handleClick} sx={{
                position: "fixed", top: "40%", right: "0", zIndex: "10", transition: "all 1s ease"
            }}>
                <Tooltip title="Filter">
                    <Button
                        color="error"
                        variant="contained"
                        size="small"
                        className="btn"
                        startIcon={filterOpen ? <TrendingFlat /> : <TuneOutlined />}
                        sx={{ width: "7vw", fontWeight: "500", fontSize: "10px", lineHeight: "1.2", letterSpacing: "0.1em", zIndex: "10" }}
                    >
                        {/* , height: "7vh" */}
                        {filterOpen ? '' : 'Filter'}
                    </Button>
                </Tooltip>
            </Box>
        </Box >
    )
};

export default PageTop;
