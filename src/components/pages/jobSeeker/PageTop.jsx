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

import JobBg from "../../assets/jobbg.jpg";
import Search from '../../common/Search';

const PageTop = () => {
    // const location = useLocation();
    const [filterOpen, setFilterOpen] = useState(false);

    const handleClick = () => {
        // const flatIcon = document.getElementById("flat-icon");

        const box = document.getElementsByClassName("filter-btn-box")[0];
        const btn = document.getElementsByClassName("filter-open-btn")[0];
        const filterBox = document.getElementById("filter-box");

        box.style.right = filterOpen ? "0" : "17%";
        box.style.transform = filterOpen ? "translateX(0)" : "matrix(1, 0, 0, 1, 0, 0)";
        btn.style.width = filterOpen ? "7em" : "4em";
        btn.style.padding = filterOpen ? "10px 50px" : "10px";
        filterBox.style.opacity = filterOpen ? "0" : "1";
        filterBox.style.transform = filterOpen ? "translateX(100%)" : "translateX(0)";

        setFilterOpen(!filterOpen);

        // if (!filterOpen && flatIcon !== null) {
        // }
    };

    return (
        <Box sx={{
            height: "80vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center", position: "relative", minHeight: "50vh"
        }}>
            <img src={JobBg} style={{ width: "100%", position: "absolute", boxShadow: "4px 4px 8px #043927, -4px -2px 6px #800080" }} />
            <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
                <p style={{ textTransform: "capitalize", fontSize: "32px", fontWeight: "600", lineHeight: "1", zIndex: "1" }}  >
                    hire people for your business  </p>
                <Search />
            </Box>

            <Box className="filter-btn-box" onClick={handleClick} sx={{ position: "fixed", top: "40%", right: "0", zIndex: "10", transform: "translateX(0)", transition: "all .5s cubic-bezier(0.77, 0, 0.175, 1)" }}>
                <Tooltip title="Filter">
                    <Button color="error" variant="contained" size="small" className="filter-open-btn"
                        startIcon={filterOpen ? <TrendingFlat id="flat-icon" /> : <TuneOutlined id="tune-icon" />}
                        sx={{ width: "7em", fontWeight: "500", fontSize: "12px", lineHeight: "1.2", letterSpacing: "0.1em", zIndex: "10", padding: "10px 50px" }}
                    >
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

export default PageTop;
