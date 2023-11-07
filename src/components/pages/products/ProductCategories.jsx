import { useState } from 'react';
import { Box, ListItem, List, Slider, Checkbox, Button, Divider } from '@mui/material';

import "../products/Product.css"
import ProductCard from './ProductCard';

function ProductCategories() {
    const [value, setValue] = useState([10, 50]);
    const minDistance = 1;
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };


    return (
        <div style={{ display: "flex", backgroundColor: "rgb(236,236,236)" }}>
            <Box sx={{ width: "19%", margin: "40px 0 0 70px", backgroundColor: "white",height:"215vh" }}>
                <h1 style={{ margin: "12px", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: "500",
                 fontSize: "17px" }}>product categories</h1>
                <List sx={{ margin: "20px", display: "flex", flexDirection: "column", fontWeight: "300", fontSize: "17px", letterSpacing: "0.05em" }}>
                    <ListItem className='productcategory' >Fragrance</ListItem>
                    <List sx={{ margin: "16px", display: "flex", flexDirection: "column", fontWeight: "300", fontSize: "17px",
                     letterSpacing: "0.05em" }}> Makeup
                        <ListItem className='productcategory' sx={{ fontSize: "14px" }} >Eye Palettes</ListItem>
                        <ListItem className='productcategory' sx={{ fontSize: "14px" }}  >Hair Health</ListItem>
                        <ListItem className='productcategory' sx={{ fontSize: "14px" }} >Lips Gloss</ListItem>
                    </List>
                    <ListItem className='productcategory' sx={{fontSize:"17px"}} >Skincare</ListItem>
                </List>
                <Divider />
                {/* </Box>
            <Box sx={{ width: "20%", height: "30vh", margin: "1px 0 0 70px ", backgroundColor: "white" }}> */}
                <p style={{
                    margin: "20px", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: "400", fontSize: "18px"
                }}> price </p>
                <Slider
                    max="200"

                    disableSwap
                    color="warning"
                    size="small"
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaLabel={() => 'Experience range'}
                    sx={{ margin: "0 10px 0 30px", width: "80%" }}
                />
                <p style={{
                    fontSize: "12px", fontWeight: "500", lineHeight: "1.2", letterSpacing: "0.05em",
                    textTransform: "capitalize", margin: "4px 0px 18px 30px"
                }}>{`Range : $${value[0]} - $${value[1]} `}</p>
                <Button type='submit' sx={{ margin: "20px 0 0 25px", border: "1px solid black", borderRadius: "0",
                 width: "75%", height: "40px", marginBottom: "30px" }}> Filter</Button>
                <Divider />
                <p style={{
                    margin: "20px", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: "500", fontSize: "18px"
                }}> color</p>
                <List sx={{ margin: "5px 0 0 30px", fontSize: "15px" }}>
                    <ListItem className='productcategory' >
                        <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "black", marginRight: "10px" }}></span>
                        Black</ListItem>
                    <ListItem className='productcategory' >
                        <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#8e5c36", marginRight: "10px" }}></span>Light brown</ListItem>
                    <ListItem className='productcategory' >
                        <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#dd1c1c", marginRight: "10px" }}></span>
                        Strawberry</ListItem> </List>
                {/* </Box>
            <Box sx={{ width: "20%", height: "25vh", margin: "1px 0 0 70px ", backgroundColor: "white" }}> */}
                <Divider />
                <p style={{
                    margin: "20px", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: "400", fontSize: "18px"
                }}> Capacity </p>

                <List sx={{ margin: "10px 18px 0 18px", fontSize: "12px", display: "flex", justifyContent: "space-around",
                 marginBottom: "30px" }}>
                    <ListItem className='productcategory' sx={{ border: "1px solid black", marginRight: "4px" }}>30mL</ListItem>
                    <ListItem className='productcategory' sx={{ border: "1px solid black", marginRight: "4px" }}>40mL</ListItem>
                    <ListItem className='productcategory' sx={{ border: "1px solid black" }}>50mL</ListItem>
                </List>

                {/* </Box>
            <Box sx={{ width: "20%", height: "60vh", margin: "1px 0 0 70px ", backgroundColor: "white" }}> */}
                <Divider />
                <p style={{
                    margin: "10px 0 0 25px", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: "400", fontSize: "18px"
                }}> brand </p>

                <List sx={{ margin: "10px 0 0 15px", fontSize: "15px" }}>
                    <ListItem className='productcategory' ><Checkbox {...label} />Aerin</ListItem>
                    <ListItem className='productcategory' ><Checkbox {...label} />Fable&Mane</ListItem>
                    <ListItem className='productcategory' ><Checkbox {...label} /> Loreal</ListItem>
                    <ListItem className='productcategory' ><Checkbox {...label} /> Mac</ListItem>
                    <ListItem className='productcategory' ><Checkbox {...label} /> Schwarzkopf  </ListItem>
                </List>
            </Box>

            <ProductCard />
        </div>
    )
}

export default ProductCategories