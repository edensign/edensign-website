/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { useState } from "react";
import { Box, Button, InputBase, useMediaQuery, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { tokens } from "../../theme";

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
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    const handleChange = (event) => {
        setInputValue(event.target.value);
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

    return (
        <Box borderRadius="4px" width="60vw" height={isTab ? "4vh" : "auto"} position="relative" sx={{
            backgroundColor: "#ffffff", padding: "2%", display: "flex", justifyContent: "flex-end", alignItems: "center", boxShadow: "2px 2px 4px hsl(0, 0%, 50%)"
        }} >
            <InputBase sx={{ ml: 2, flex: 1, width: "88%" }} placeholder="Search"
                id="input" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} />
            <Button onClick={handleSearch} type="submit" variant="contained" color='success' sx={{
                width: "18%", position: "absolute", right: isTab ? "1%" : "0", fontSize: "18px", letterSpacing: "0.01em", lineHeight: "2em", fontWeight: "500", padding: "14px", textTransform: "capitalize"
                // "&:hover": { backgroundColor: colors.greenAccent[600] }
            }}>
                Search
            </Button>
        </Box>
    );
}

export default Search;
