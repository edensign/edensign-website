/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { useState } from "react";
import { Autocomplete, Box, Button, InputBase, TextField, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";

const Search = ({
    // getSearchData,
    // condition,
    // setSearchFlag,
    // oldPagination,
    // reloadBtn,
    // action,
    // api
}) => {
    const [inputValue, setInputValue] = useState("");
    const location = useLocation();
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    const cities = ["Agra", "Aligarh", "Ayodhya", "Amroha", "Akbarpur", "Azamgarh", "Awagarh", "Ballia", "Basti",
        "Bijnor", "badaun", "Barabanki", "Banda", "Bahraich", "Bulandshahar", "Bareilly", "Chandausi", "Deoria",
        "Etawah", "Etah", "Fatehpur", "Farrukhabad", "Fatehgarh", "Firozabad", "Ghaziabad", "Gorakhpur", "Gonda",
        "Ghazipur", "Greater Noida", "Gautam Buddha Nagar", "Hathras", "Hardoi", "Hapur", "Jaunpur", "Jhansi", "Kanpur",
        "Khurja", "Kasganj", "Lalitpur", "Lakhimpur Kheri", "Lucknow", "Meerut", "Moradabad", "Muzaffarnagar",
        "Mathura Vrindavan", "Maunath Bhanjan", "Mirzapur Vindhyachal", "Modinagar", "Mainpuri", "Noida", "Orai",
        "Pilibhit", "Prayagraj", "Rampur", "Raebareli", "Saharanpur", "Shamli", "Shahjahanpur", "Sambhal", "Sitapur",
        "Sultanpur", "Sahaswan", "Shikohabad", "Tanda", "Ambedkar Nagar", "Unnao", "Varanasi", "Siddharthnagar",
        "Chitrakoot", "Mahoba", "Hamirpur", "Balarampur", "Shravasti", "Kushinagar", "Maharajganj", "Jalaun", "Kannauj",
        "Auraiya", "Baghpat", "Sonbhadra", "Pratapgarh", "Kaushambi", "Chandauli", "Amethi", "Dehradun", "Haridwar",
        "Roorkee", "Haldwani", "Kathgodam", "Nainital", "Rudrapur", "Kashipur", "Udham Singh Nagar", "Rishikesh",
        "Pithoragarh", "Ramnagar", "Kichha", "Mussoorie", "Srinagar", "Uttarkashi", "Khatima", "Rudraprayag", "Pauri"
    ];

    const handleChange = (event, value) => {
        console.log(value)
        setInputValue(value);
    };

    const handleSearch = () => {
        getSearchData(0, 5, action, api, condition, inputValue);
        setInputValue('');
        setSearchFlag({
            search: true,
            searching: true,
        });
        // reloadBtn.style.display = "inline-flex";
    };

    //Search data by pressing down the enter key
    const handleKeyDown = (event) => {
        if (event.keyCode == 13) {
            handleSearch();
        };
    };
    console.log("Autocomplete value=>", inputValue);
    console.log("Autocomplete value=>", location);

    return (
        <Box borderRadius="4px" width={location.pathname === "/job-seeker" ? "50vw" : "60vw"} height="auto" position="relative"
            sx={{
                backgroundColor: "#ffffff", display: "flex", alignItems: "center", boxShadow: "2px 2px 4px hsl(0, 0%, 50%)"
            }}>

            <Autocomplete disablePortal id="input" options={cities}
                onChange={handleChange} onKeyDown={handleKeyDown} sx={{ width: "80.5%", outline: "none" }}
                renderInput={(params) => <TextField {...params} label="Search.." />}
            />
            <Button onClick={handleSearch} type="submit" variant="contained" sx={{
                width: "20%", position: "absolute", right: isTab ? "1%" : "0", top: "0", fontSize: "20px",
                letterSpacing: "0.01em", lineHeight: "2em", fontWeight: "500", padding: "6.5px",
                textTransform: "capitalize", backgroundColor: "rgb(76, 206, 172)"
            }}>
                Search
            </Button>

            {/* <InputBase sx={{ ml: 2, flex: 1, width: "88%" }} placeholder="Search.."
                id="input" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} />  */}

        </Box >
    );
}

export default Search;
