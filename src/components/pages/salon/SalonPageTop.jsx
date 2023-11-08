/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Button, Tooltip } from '@mui/material';
import { TuneOutlined } from '@mui/icons-material';
import { TrendingFlat } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { setFilterOpen } from "../../../redux/actions/FilterAction";
import SalonBg from "../../assets/salonbg.jpg";
import Search from '../../common/Search';

const SalonPageTop = () => {

    const [buttonText, setButtonText] = useState("Filter");
    const filterOpen = useSelector(state => state.filterOpen);
    const dispatch = useDispatch();

    // Function to handle click event, it toggles the filterOpen & buttonText state accordingly to user click
    const handleClick = () => {

        const box = document.getElementsByClassName("filter-btn-box")[0];
        const btn = document.getElementsByClassName("filter-open-btn")[0];
        const filterBox = document.getElementById("filter-box");
        const arrowIcon = document.getElementById("arrow-icon");
        console.log(filterOpen)

        dispatch(setFilterOpen(!filterOpen.filterOpen));
        setButtonText(filterOpen.filterOpen ? "Filter" : "");

        box.style.right = filterOpen.filterOpen ? "0" : "21%";
        box.style.transform = filterOpen.filterOpen ? "translateX(0)" : "matrix(1, 0, 0, 1, 0, 0)";
        btn.style.width = filterOpen.filterOpen ? "7em" : "4em";
        btn.style.padding = filterOpen.filterOpen ? "10px 50px" : "9px 0px 9px 4px";
        filterBox.style.opacity = filterOpen.filterOpen ? "0" : "1";
        filterBox.style.transform = filterOpen.filterOpen ? "translateX(100%)" : "translateX(0)";
        arrowIcon.style.transform = filterOpen.filterOpen ? "" : "rotate(180deg)";
    };

    // Function to handle scroll event, changes buttonText & icon states accordingly
    function onScroll() {

        const btn = document.getElementsByClassName("filter-open-btn")[0];
        const scroll = window.pageYOffset;

        if (scroll > 100) {
            btn.style.width = "4em";
            btn.style.padding = "9px 0px 9px 4px";
            // setFilterOpen(true);
            setButtonText("");

        } else if (scroll < 100) {
            btn.style.width = "7em";
            btn.style.padding = "10px 50px";
            // setFilterOpen(false);
            setButtonText("Filter");
        }
    };

    // Add a scroll event listener to the window, when the component mounts
    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);
    console.log(filterOpen)

    return (
        <Box sx={{
            height: "80vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
             alignItems: "center", position: "relative", backgroundColor: "#A6B7C5", color: "#ffffff"
        }}>
            <img src={SalonBg} style={{ width: "100%", position: "absolute" }} />
            <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
                <p style={{ textTransform: "capitalize", fontSize: "32px", fontWeight: "600", lineHeight: "1", zIndex: "1" }}  >
                    Over 10,000 Eden Sign Salons across 15 states  </p>
                <Search />
            </Box>

            <Box className="filter-btn-box" onClick={handleClick} sx={{ position: "fixed", top: "40%", right: "0", zIndex: "10", transform: "translateX(0)", transition: "all .5s cubic-bezier(0.77, 0, 0.175, 1)" }}>
                <Tooltip title="Show Filters">
                    <Button color="error" variant="contained" size="small" className="filter-open-btn" startIcon={<ArrowBackIcon id="arrow-icon" />}
                        sx={{
                            width: "7em", fontWeight: "500", fontSize: "12px", lineHeight: "1.2", letterSpacing: "0.1em",
                            zIndex: "10", padding: "10px 50px", transition: "all .15s ease"
                        }}
                    >
                        {buttonText}
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
