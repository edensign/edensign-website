/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useState } from 'react';

import { Box, Button, Tooltip } from '@mui/material';
import { TuneOutlined } from '@mui/icons-material';
import { TrendingFlat } from '@mui/icons-material';

import SalonBg from "../../assets/salons.jpg";
import Search from '../../common/Search';

const SalonPageTop = () => {
    // const location = useLocation();
    const [filterOpen, setFilterOpen] = useState(false);

    const handleClick = () => {
        const box = document.getElementsByClassName("box")[0];
        const btn = document.getElementsByClassName("btn")[0];
        const filterBox = document.getElementById("filter-box");
        box.style.right = filterOpen ? "0" : "18.3%";
        btn.style.width = filterOpen ? "7em" : "4em";
        filterBox.style.opacity = filterOpen ? "0" : "1";
        filterBox.style.transform = filterOpen ? "translateX(100%)" : "translateX(0)";

        setFilterOpen(!filterOpen);
    };

    return (
        <Box sx={{
            height: "80vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            border: "1px solid crimson", position: "relative", backgroundImage: `url(${SalonBg})`, backgroundRepeat: "repeat", backgroundPosition: "center center", color: "#ffffff"
        }}>
            <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" height="42vh">
                <p style={{ textTransform: "capitalize", fontSize: "32px", fontWeight: "600", lineHeight: "1" }}  >
                    Over 100,000 Eden Sign Salons across 15 states  </p>
                <Search />
            </Box>
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
                        sx={{ width: "7em", fontWeight: "500", fontSize: "12px", lineHeight: "1.2", letterSpacing: "0.1em", zIndex: "10" }}
                    >
                        {/* , height: "7vh" */}
                        {filterOpen ? '' : 'Filter'}
                    </Button>
                </Tooltip>
            </Box>
        </Box >
    )
};

{/* <Typography sx={{ color: "#ffffff", textTransform: "uppercase", fontWeight: "500", fontSize: "11px", lineHeight: "1.2", letterSpacing: "0.1em", marginTop: "8px" }}>
<Link style={{ textDecoration: "none", color: "#ffffff", position: "relative", zIndex: "2" }} to="/"> HOME &gt; </Link>
{location.pathname.slice(1)}
</Typography> */}

export default SalonPageTop;
