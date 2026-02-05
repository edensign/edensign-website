import { useState } from 'react'
import productimage from "../../assets/productbg.webp"
import { Box, Autocomplete, TextField, Button, useMediaQuery } from '@mui/material'

function ProductPageTop() {
  const [inputValue, setInputValue] = useState(null);
  const cities = ["Agra", "Aligarh", "Ayodhya", "Amroha", "Akbarpur"];
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:920px)");

  const handleChange = (event, value) => {
    console.log(value)
    setInputValue(value);
  };

  return (
    <Box style={{
      width: "100%", height: "60vh", backgroundImage: `url(${productimage})`, display: "flex", justifyContent: "center",
      alignItems: "center", flexDirection: "column"
    }}>
      <p style={{ textTransform: "uppercase", fontSize: "60px", letterSpacing: ".2em", color: "white", fontWeight: "250" }} >shop</p>
      <Box sx={{ width: "50%", backgroundColor: "white", display: "flex" }}>
        <Autocomplete onChange={handleChange} options={cities}
          sx={{ width: "80%", outline: "none" }}
          renderInput={(params) => <TextField {...params} label="Search.." />} />
        <Button type="submit" variant="contained" sx={{
          borderRadius: "0px",
          width: "20%", fontSize: "20px", right: isTab ? "1%" : "0",
          letterSpacing: "0.01em", lineHeight: "2em", fontWeight: "500",
          textTransform: "capitalize", backgroundColor: "rgb(76, 206, 172)"
        }}>
          Search
        </Button>
      </Box>
    </Box>
  )
}

export default ProductPageTop