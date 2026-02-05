/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, MenuItem, Select, Rating } from '@mui/material';
import Pagination from '@mui/material/Pagination';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import API from '../../../apis';
import { setProducts } from '../../../redux/actions/ProductAction';
import ProductDetailPage from './ProductDetailPage';
import Toast from "../../common/Toast";
import Loader from "../../common/Loader";
import "../products/Product.css"

import botanicsImg from "../../assets/products/botanics.jpg"
import cleanserImg from "../../assets/products/cleanser.jpg"
import creamImg from "../../assets/products/cream.jpg"
import lorealImg from "../../assets/products/loreal.jpg"
import lotionImg from "../../assets/products/lotion.jpg"
import perfumeImg from "../../assets/products/perfume.jpg"

const productImages = {
  "All Bright": botanicsImg,
  "Skin Cleanser": cleanserImg,
  "Hydrating Cream": creamImg,
  "Bonjour Nudista": lorealImg,
  "Rance 1795 Perfume": perfumeImg,
  "Brown Sugar Body Lotion": lotionImg,
};

const ENV = import.meta.env;

function ProductCard() {
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { listData, loading } = useSelector(state => state.allProducts);
  const imgURL = `${ENV.VITE_SAS_URL}/product`;

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = listData?.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo(0, 300);
  };

  const handleMouseEnter = (event, cardNumber) => {
    setHoveredCard(cardNumber);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleEyeClick = (event, product, productImg) => {
    navigateTo("/product/detail", {
      state: {
        details: {
          product,
          productImg,
        },
      },
    });
  }

  function AddToCart() {
    setAlert(true);
    setSeverity("success");
    setMessage("Successfully Created");
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  }


  const getProducts = () => {
    API.ProductAPI.getProductList()
      .then(res => {
        if (res.status === "Success") {
          console.log(res.data, 'response data')
          dispatch(setProducts({ listData: res.data, loading: false }))
        } else {
          dispatch(setProducts({ listData: [], loading: false }))
        }
      })
      .catch(error => {
        throw error;
      });
  };

  React.useEffect(() => {
    getProducts();
  }, []);


  return (
    <>
      <Toast alerting={alert}
        severity={severity}
        message={message}
      />

      <Box sx={{
        display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", marginRight: "5px", width: "75%", position: "relative", height: "70vh"
      }}>
        <Box sx={{
          display: "block", position: "absolute", top: "30px", left: "70px", width: "90%", opacity: ".62",
          textTransform: "uppercase"
        }}>
          <span> showing {startIndex + 1}-{endIndex > listData.length ? `${listData.length}` : endIndex} of {listData.length} result </span>
          <Select defaultValue={"menu order"} size='small' style={{ float: "right", fontSize: "12px", bottom: "9px" }} >
            <MenuItem value="menu order" selected="selected">Default Sorting</MenuItem>
            <MenuItem value="popularity">Sort By Popularity</MenuItem>
            <MenuItem value="rating">Sort By Average Rating</MenuItem>
            <MenuItem value="date">Sort By latest</MenuItem>
            <MenuItem value="price">Sort By Price: low to high</MenuItem>
            <MenuItem value="price-desc">Sort By PRICE: high to low</MenuItem>

          </Select>
        </Box>

        {currentProducts?.map((product, i) => (
          <Card key={i} sx={{
            height: "70vh", margin: "70px 0 20px 20px", borderRadius: "0", position: "relative", display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexDirection: 'column'
          }}
            onMouseEnter={(event) => handleMouseEnter(event, i)} onMouseLeave={(event) => handleMouseLeave(event, i)}>
            <div style={{
              width: "100%", display: "flex", justifyContent: "flex-start", color: "white"
            }}>
              <span style={{
                backgroundColor: "#e4c1b1", textTransform: "uppercase", fontSize: "12px", textAlign: "center",
                padding: '3px', borderRadius: '4px', fontWeight: "300", lineHeight: "22px", letterSpacing: "0.1em"
              }}>
                {product.is_bestseller ? "Bestseller" : ""}</span>
            </div>

            <CardMedia
              sx={{ height: 250, backgroundSize: "contain" }}
              image={productImages[product.name]}
            >
              <Box sx={{
                display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", rowGap: "10px", alignItems: 'center',
                justifyContent: 'center', marginTop: "100px", marginLeft: "85px"
              }}

              >
                <Button className={hoveredCard === i ? 'btn-visibility' : ''} sx={{
                  width: "20px", visibility: 'hidden', border: "1px solid black",
                  borderRadius: "0", backgroundColor: "white"
                }}
                  onClick={(event) => handleEyeClick(event, product, productImages[product.name])} >

                  <RemoveRedEyeOutlinedIcon /> </Button>

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

            {/* <Divider sx={{ height: '50px' }} /> */}
            <CardContent sx={{
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"
            }}>
              <h2 className='productcategory'
                style={{
                  textTransform: "uppercase", fontSize: "16px", letterSpacing: ".2em", fontWeight: "550",
                  textAlign: "center", fontFamily: "marcellus"
                }}>
                {product.brand} {product.name}
              </h2>
              <Typography variant='span' sx={{
                textAlign: "center", width: "90%", paddingBottom: "10px", fontSize: "13px", opacity: ".5"
              }}>
                {product.description}
              </Typography>
              <Rating name="read-only" defaultValue={3.5} readOnly />
              <Box style={{ display: "flex", alignItems: 'center' }}>
                <span style={{
                  fontSize: "18px", fontWeight: "500", letterSpacing: ".8px", fontFamily: "inter", marginTop: "15px", width: "40%",
                  marginRight: "26px"
                }}>
                  &#8377;{product.discounted_price}
                </span>
                <span style={{
                  fontSize: "15px", fontWeight: "400", letterSpacing: ".8px", fontFamily: "inter", marginTop: "15px",
                  textDecorationLine: "line-through", opacity: ".5", width: "30%", textAlign: "center", marginRight: "26px"
                }}>
                  &#8377;{product.price}
                </span>
                <span style={{
                  fontSize: "12px", fontWeight: "400", letterSpacing: ".8px", fontFamily: "inter", marginTop: "15px", color: "green",
                  textTransform: "uppercase", width: "130%", textAlign: "center"
                }}>
                  &#8377;{product.discount_percent.toFixed(0)}% off
                </span>
              </Box>

            </CardContent>
          </Card>
        ))}


        <Pagination color="primary" size="large" shape="rounded"
          count={Math.ceil(listData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ gridColumn: "span 3", marginTop: "20px", marginBottom: "20px", display: "flex", justifyContent: "center" }}
        />

      </Box>
      {loading ? <Loader /> : null}
    </>

  )
};

export default ProductCard;
