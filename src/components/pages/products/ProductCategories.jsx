import { Box, ListItem, List, Slider, Checkbox, Button, Divider } from '@mui/material'
import { useState } from 'react'

function ProductCategories() {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <>
            <Box sx={{ width: "20%", height: "200vh", margin: "70px 0 0 70px", backgroundColor: "white" }}>
                <h1 style={{ margin: "20px", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: "600", fontSize: "18px" }}>product categories</h1>
                <List sx={{ margin: "20px", display: "flex", flexDirection: "column", fontWeight: "300", fontSize: "19px", letterSpacing: "0.05em" }}>
                    <ListItem >Fragrance</ListItem>
                    <List sx={{ margin: "16px", display: "flex", flexDirection: "column", fontWeight: "300", fontSize: "19px", letterSpacing: "0.05em" }}> Makeup
                        <ListItem sx={{ fontSize: "14px" }} >Eye Palettes</ListItem>
                        <ListItem sx={{ fontSize: "14px" }}  >Hair Health</ListItem>
                        <ListItem sx={{ fontSize: "14px" }} >Lips Gloss</ListItem>
                    </List>
                    <ListItem >Skincare</ListItem>
                </List>
                <Divider/>
            {/* </Box>
            <Box sx={{ width: "20%", height: "30vh", margin: "1px 0 0 70px ", backgroundColor: "white" }}> */}
                <p style={{
                    margin: "20px", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: "400", fontSize: "18px"
                }}> price </p>
                <Slider
                    max={200}
                    min={20}
                    disableSwap
                    color="warning"
                    size="small"
                    // value={value}
                    // onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaLabel={() => 'Experience range'}
                    sx={{ margin: "0 10px 0 30px", width: "80%" }}
                />
                <Button type='submit' sx={{margin:"20px 0 0 25px",border:"1px solid black",borderRadius:"0",width:"80%",height:"50px",marginBottom:"30px"}}> Filter</Button>

            {/* </Box>
            <Box sx={{ width: "20%", height: "40vh", margin: "1px 0 0 70px ", backgroundColor: "white" }}> */}
            <Divider/>
                <p style={{
                    margin: "20px", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: "500", fontSize: "18px"
                }}> color</p>
                <List sx={{ margin: "5px 0 0 30px", fontSize: "18px" }}>
                    <ListItem >
                        <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "black", marginRight: "10px" }}></span>
                        Black</ListItem>
                    <ListItem >
                        <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#8e5c36", marginRight: "10px" }}></span>Light brown</ListItem>
                    <ListItem >
                        <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#dd1c1c", marginRight: "10px" }}></span>
                        Strawberry</ListItem> </List>
            {/* </Box>
            <Box sx={{ width: "20%", height: "25vh", margin: "1px 0 0 70px ", backgroundColor: "white" }}> */}
            <Divider/>
                <p style={{
                    margin: "20px", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: "400", fontSize: "18px"
                }}> Capacity </p>

                 <List sx={{ margin:"10px 15px 0 15px", fontSize: "15px",display:"flex",justifyContent:"space-around",marginBottom:"30px" }}>
                <ListItem sx={{border:"1px solid black",marginRight:"4px"}}>30mL</ListItem>
                <ListItem sx={{border:"1px solid black",marginRight:"4px"}}>40mL</ListItem>
                <ListItem sx={{border:"1px solid black"}}>50mL</ListItem>
                    </List>

            {/* </Box>
            <Box sx={{ width: "20%", height: "60vh", margin: "1px 0 0 70px ", backgroundColor: "white" }}> */}
            <Divider/>
                <p style={{
                    margin: "10px 0 0 25px", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: "400", fontSize: "18px"
                }}> brand </p>

                 <List sx={{ margin:"10px 0 0 15px", fontSize: "15px"}}>
                <ListItem ><Checkbox {...label} />Aerin</ListItem>
                <ListItem ><Checkbox {...label} />Fable&Mane</ListItem>
                <ListItem ><Checkbox {...label} /> Loreal</ListItem>
                <ListItem ><Checkbox {...label} /> Mac</ListItem>
                <ListItem ><Checkbox {...label} /> Schwarzkopf  </ListItem>
                    </List>

            </Box>
        </>
    )
}

export default ProductCategories