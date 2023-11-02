/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import image1 from "../../assets/productimage1.webp"
import { Box, Button, Divider, MenuItem, Select } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import ProductDialogBox from './ProductDialogBox';
import Toast from "../../common/Toast";
import "../products/Product.css"

function ProductCard() {

  const [isVisible, setIsVisible] = useState("hidden");
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardImage, setCardImage] = useState(null);
  const [openDialog, setOpenDialog]= useState(false);


  const handleMouseEnter = (event, cardNumber) => {
    setHoveredCard(cardNumber);
    // setCardImage(event.target.style.backgroundImage);
    console.log(event);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleEyeClick = (event) => {
    setOpenDialog(true);
  };


  function AddToCart() {
    setAlert(true);
    setSeverity("success");
    setMessage("Successfully Created");
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  }

  console.log("Card value=", openDialog);
  console.log(cardImage);

  // const [page, setPage] = React.useState(0);
  // const [cardsPerPage, setcardsPerPage] = React.useState(2);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeCardsPerPage = (event) => {
  //   setcardsPerPage(parseInt(event.target.value, 4));
  //   setPage(1);
  // };


  return (
    <>
      <Toast alerting={alert}
        severity={severity}
        message={message}
      />
      <ProductDialogBox openDialog={openDialog} setOpenDialog={setOpenDialog} image={image1} />


      <Box sx={{
        display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", marginRight: "10px", width: "75%", position: "relative"
      }}>
        <Box sx={{
          display: "block", position: "absolute", top: "30px", left: "70px", width: "90%", opacity: ".62",
          textTransform: "uppercase"
        }}>
          <span> This is personal </span>
          <Select defaultValue={"menu order"} size='small' style={{ float: "right", fontSize: "12px", bottom: "9px" }} >
            <MenuItem value="menu order" selected="selected">Default Sorting</MenuItem>
            <MenuItem value="popularity">Sort By Popularity</MenuItem>
            <MenuItem value="rating">Sort By Average Rating</MenuItem>
            <MenuItem value="date">Sort By latest</MenuItem>
            <MenuItem value="price">Sort By Price: low to high</MenuItem>
            <MenuItem value="price-desc">Sort By PRICE: high to low</MenuItem>



          </Select>
        </Box>

        {Array(10).fill(null).map((_, i) => (

          <Card key={i} sx={{ height: "82vh", margin: "70px 0 0 70px", borderRadius: "0", position: "relative" }}
            onMouseEnter={(event) => handleMouseEnter(event, i)} onMouseLeave={(event) => handleMouseLeave(event, i)}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "white" }}>
              <span style={{ backgroundColor: "black", fontSize: "15px" }}>-11%</span>
              <span style={{
                backgroundColor: "#e4c1b1", textTransform: "uppercase", fontSize: "12px",
                width: "67px", textAlign: "center"
              }}>featured</span>
            </div>

            <CardMedia
              sx={{ height: 260, position: "relative" }}
              image={image1}
            >
              <Box sx={{
                position: "absolute", display: "grid", top: "90px", left: "60px", height: "135px",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))", rowGap: "50px"
              }}

              >
                <Button className={hoveredCard === i ? 'btn-visibility' : ''} sx={{
                  width: "20px", visibility: 'hidden', border: "1px solid black",
                  borderRadius: "0", backgroundColor: "white"
                }}
                  onClick={(event) => handleEyeClick(event)}
                >
                  <RemoveRedEyeOutlinedIcon /></Button>

                <Button className={hoveredCard === i ? 'btn-visibility' : ''} sx={{
                  width: "20px", visibility: 'hidden', border: "1px solid black",
                  borderRadius: "0", right: "33px", backgroundColor: "white"
                }}>
                  <FavoriteBorderOutlinedIcon /></Button>

                <Button className={`btn-text ${hoveredCard === i ? 'btn-visibility' : ''}`} sx={{
                  width: "234px", visibility: 'hidden', border: "1px solid black", borderRadius: "0",
                  gridColumn: "span 2", letterSpacing: ".2em", left: "-50px", backgroundColor: "white"
                }}
                  onClick={AddToCart} >+ add to cart </Button>
              </Box>
            </CardMedia>

            <Divider></Divider>
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <h2 style={{
                textTransform: "uppercase", fontSize: "20px", letterSpacing: ".2em", fontWeight: "550",
                textAlign: "center", width: "60%", fontFamily: "marcellus"
              }} >
                airbrush matte
              </h2>
              <Typography variant='span' sx={{ textAlign: "center", width: "90%", fontSize: "15.5px" }}>
                skin-perfecting bronzed filter for the face
              </Typography>
              <div className="rate">
                <input type="radio" id="star5" name="rate" value="5" />
                <label htmlFor="star5" title="text">5 stars</label>
                <input type="radio" id="star4" name="rate" value="4" />
                <label htmlFor="star4" title="text">4 stars</label>
                <input type="radio" id="star3" name="rate" value="3" />
                <label htmlFor="star3" title="text">3 stars</label>
                <input type="radio" id="star2" name="rate" value="2" />
                <label htmlFor="star2" title="text">2 stars</label>
                <input type="radio" id="star1" name="rate" value="1" />
                <label htmlFor="star1" title="text">1 star</label>
              </div>
              <Typography sx={{ textAlign: "center", width: "75%", fontSize: "16.5px", fontWeight: "520", letterSpacing: ".8px", fontFamily: "inter" }}>
                $40.00
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Stack spacing={2} sx={{ position: "absolute", bottom: "20px", width: "100%", alignItems: "center", }} >
          <Pagination count={4} variant="outlined" shape="rounded"

          // onPageChange={handleChangePage}
          // cardsPerPage={cardsPerPage}
          // onCardsPerPageChange={handleChangeCardsPerPage}
          />
        </Stack>
      </Box>
    </>

  )
}

export default ProductCard