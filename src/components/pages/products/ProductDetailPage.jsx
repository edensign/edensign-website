import React from 'react'
import { useEffect, useState } from 'react';

import { Button, List, Box } from '@mui/material';
import { ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactImageMagnify from 'react-image-magnify';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import "./Product.css";
import { useLocation } from 'react-router-dom';

const ENV = import.meta.env;

function ProductDetailPage() {
    const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('900px'));
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");
    const imgURL = `${ENV.VITE_SAS_URL}/product`;

    const [isInWishlist, setIsInWishlist] = useState(false);
    const [Num, setNum] = useState(1);
    const { state } = useLocation();
    const [selectedImage, setSelectedImage] = useState(`${imgURL}/${state?.details?.image_sources.split(',')[0]}`);
    const unitPrice = state?.details?.discounted_price ?? 0;
    const totalPrice = unitPrice * Num;


    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    console.log("AAA", state, selectedImage)

    const toggleWishlist = () => {
        setIsInWishlist(!isInWishlist);
    };
    const handleIncreasingitem = () => {
        setNum(Num + 1);
    }
    const handleDecreasingitem = () => {
        if (Num > 1) {
            setNum(Num - 1);
        }
    }

    return (
        <Box sx={{ backgroundColor: "#f7f7f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "75%", marginTop: "90px", height: "100%", display: "flex" }}>
                <List sx={{ width: "10%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
                    {state.details?.image_sources.split(',').map((image, index) => (
                        <ListItem
                            key={index}
                            onClick={() => handleThumbnailClick(`${imgURL}/${image}`)}
                        >
                            <img
                                src={`${imgURL}/${image}`}
                                alt={`Thumbnail ${index + 1}`}
                                style={{ width: "70px", cursor: "pointer" }}
                            />
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ width: "30%", marginRight: "10px", height: "100%",display:"flex",flexDirection:"column" }} >
                    <ReactImageMagnify

                        {...{
                            smallImage: {
                                alt: 'Makeup',
                                isFluidWidth: true,
                                src: `${selectedImage}`, // Use selectedImage state here
                                className: "small-image"
                            },
                            largeImage: {
                                src: `${selectedImage}`, // Use selectedImage state here
                                width: 1200,
                                height: 1200,
                            },
                            isHintEnabled: true,
                            enlargedImagePosition: 'over',
                            shouldUsePositiveSpaceLens: true,
                        }}
                    />
                <Box sx={{width:"128%",backgroundColor:"blue",marginTop:"10px",marginLeft:"-85px",height:"180px"}}>
                <Typography style={{padding:"10px"}}>capacity: {state.details?.capacity}</Typography>
                <div style={{display:"flex"}}>
                <Button variant="outlined">Outlined</Button>
                </div>
                </Box>
                </Box>
                <ListItem sx={{
                    width: "55%", height: "200vh", display: "flex", flexDirection: "column",
                    textTransform: "uppercase", bgcolor: 'white'
                }}>
                    <Box sx={{ width: "90%" }}>
                        <h2 style={{ letterSpacing: ".2em", fontFamily: "marcellus", fontWeight: "400" }}>{state.details?.brand} {state.details?.name}</h2>
                        <p style={{ textTransform: "none", opacity: "0.6" }}>{state.details?.description}</p>
                        <div style={{ display: "flex", width: "60%" }}>
                            <Typography sx={{
                                textAlign: "center", width: "75%", fontSize: "16.5px", fontWeight: "520",
                                letterSpacing: ".8px", fontFamily: "inter"
                            }}>
                                &#8377; {totalPrice.toFixed(2)}
                            </Typography>
                            <Typography sx={{
                                textAlign: "center", width: "75%", fontSize: "16.5px", fontWeight: "520",
                                letterSpacing: ".8px", fontFamily: "inter", textDecoration: "line-through", opacity: ".6"
                            }}>
                                &#8377; {state?.details?.price ?? 0}
                            </Typography>
                            <Typography sx={{
                                textAlign: "center", width: "75%", fontSize: "12.5px", fontWeight: "500",
                                letterSpacing: ".8px", fontFamily: "inter", color: "green",verticalAlign:"sub"
                            }}>
                                &#8377; {state?.details?.discount_percent ?? 0}% off 
                            </Typography></div>
                        <Box sx={{
                            backgroundColor: "white", height: "80px", width: "95%", display: "inline-flex", justifyContent: "center ", alignItems: "center", marginTop: "12px"
                        }}>
                            <Button className='addtocartbtn' variant='contained' sx={{ backgroundColor: "white", color: "black", margin: "7px", border: "0.4px solid black", borderRadius: "0", height: "45px", fontSize: "30px" }} onClick={handleDecreasingitem}>-</Button>
                            {Num}
                            <Button className='addtocartbtn' variant='contained' sx={{ backgroundColor: "white", color: "black", margin: "10px", border: "1px solid black", borderRadius: "0", height: "45px", fontSize: "30px" }} onClick={handleIncreasingitem}>+</Button>

                            <Button variant='contained' sx={{ borderRadius: "0", width: "135px", height: "45px", fontSize: "12px" }}>Add to cart</Button>
                        </Box>

                        <Box className='hovericons' sx={{
                            width: "75%", marginTop: "20px", display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }} onClick={toggleWishlist} >
                            <FavoriteBorderOutlinedIcon sx={{
                                verticalAlign: "middle", fontSize: "15px",
                                border: '1px solid #E4C1B1'
                            }} /> {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            {/* <span style={{ fontSize: "14px", fontWeight: "400", letterSpacing: ".8px" }}> add to wishlist </span> */}
                        </Box>

                        <Box sx={{ textTransform: "uppercase", opacity: ".6", marginTop: "14px", display: "flex", flexDirection: "column" }}>
                            <ListItemText>Brand:{state?.details?.brand} </ListItemText>
                            <ListItemText>tags: airbrush ,matte, skin</ListItemText></Box>
                        <ListItem sx={{ width: "70%", display: "flex", justifyContent: "space-around", fontSize: "10px", marginLeft: "-16px" }}>
                            <ListItemText sx={{ fontSize: "8px" }} >share</ListItemText>
                            <ListItemText className='hovericons' ><FacebookOutlinedIcon /></ListItemText>
                            <ListItemText className='hovericons'> <TwitterIcon /> </ListItemText>
                            <ListItemText className='hovericons' > <WhatsAppIcon /></ListItemText>
                            <ListItemText className='hovericons' > <InstagramIcon /></ListItemText></ListItem>



                    </Box>
                </ListItem>


            </div>
        </Box>
    )
}

export default ProductDetailPage