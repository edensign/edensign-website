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
    const { state } = useLocation();
    const { product, productImg } = state?.details || {};

    const [isInWishlist, setIsInWishlist] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(productImg);
    const unitPrice = product?.discounted_price ?? 0;
    const totalPrice = unitPrice * quantity;

    const toggleWishlist = () => {
        setIsInWishlist(!isInWishlist);
    };

    const handleIncreaseQuantity = () => setQuantity(quantity + 1);
    const handleDecreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <Box sx={{ backgroundColor: "#f7f7f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "75%", marginTop: "90px", height: "100%", display: "flex" }}>
                <List sx={{ width: "10%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
                    {/* {state.details?.image_sources.split(',').map((image, index) => (
                        <ListItem
                            key={index}
                            onClick={() => handleThumbnailClick(selectedImage)}
                        >
                            <img
                                src={selectedImage}
                                alt={`Thumbnail ${index + 1}`}
                                style={{ width: "70px", cursor: "pointer" }}
                            />
                        </ListItem>
                    ))} */}
                </List>
                {/* Image Section */}
                <Box sx={{ width: "30%", marginRight: "10px", height: "100%", display: "flex", flexDirection: "column" }} >
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
                    {/* <Box sx={{ width: "128%", backgroundColor: "blue", marginTop: "10px", marginLeft: "-85px", height: "180px" }}>
                        <div style={{ display: "flex" }}>
                            <Button variant="outlined">Outlined</Button>
                        </div>
                    </Box> */}
                </Box>
                {/* Details Section */}
                <ListItem sx={{
                    width: "55%", height: "81vh", display: "flex", flexDirection: "column",
                    textTransform: "uppercase", bgcolor: 'white', marginBottom: '40px', paddingTop: '40px'
                }}>
                    <Box sx={{ width: "90%" }}>
                        <Typography
                            variant="h4"
                            sx={{ letterSpacing: ".2em", fontFamily: "marcellus", fontWeight: "400", marginBottom: "10px" }}
                        >
                            {product?.brand} {product?.name}
                        </Typography>
                        <Typography sx={{ textTransform: "none", opacity: "0.6", marginBottom: "20px" }}>
                            {product?.description}
                        </Typography>
                        <div style={{ display: "flex", marginBottom: "20px" }}>
                            <Typography sx={{ fontSize: "18px", fontWeight: "520", marginRight: "20px" }}>
                                ₹{totalPrice.toFixed(2)}
                            </Typography>
                            <Typography
                                sx={{ fontSize: "16px", fontWeight: "400", textDecoration: "line-through", opacity: "0.6", marginRight: "20px" }}
                            >
                                ₹{product?.price ?? 0}
                            </Typography>
                            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "green" }}>
                                {product?.discount_percent ?? 0}% off
                            </Typography>
                            <Typography style={{ marginLeft: "20px" }}>Capacity: {product?.capacity}</Typography>
                        </div>

                        {/* Quantity Selector */}
                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                            <Button variant="outlined" onClick={handleDecreaseQuantity} sx={{ marginRight: "10px" }}>
                                -
                            </Button>
                            <Typography sx={{ fontSize: "18px", fontWeight: "500", marginRight: "10px" }}>{quantity}</Typography>
                            <Button variant="outlined" onClick={handleIncreaseQuantity}>
                                +
                            </Button>
                        </Box>

                        {/* Add to Wishlist */}
                        <Box onClick={toggleWishlist} sx={{ display: "flex", alignItems: "center", cursor: "pointer", marginBottom: "20px" }}>
                            {isInWishlist ? <FavoriteIcon className='hovericons' /> : <FavoriteBorderOutlinedIcon />}
                            <Typography sx={{ marginLeft: "10px" }} className='hovericons'>
                                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                            </Typography>
                        </Box>

                        {/* Share Icons */}
                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                            <Typography sx={{ marginRight: "10px", opacity: "0.6" }}>Share:</Typography>
                            <FacebookOutlinedIcon className='hovericons' />
                            <TwitterIcon sx={{ marginLeft: "10px" }} className='hovericons' />
                            <InstagramIcon sx={{ marginLeft: "10px" }} className='hovericons' />
                            <WhatsAppIcon sx={{ marginLeft: "10px" }} className='hovericons' />
                        </Box>

                        {/* Additional Details */}
                        <Typography sx={{ opacity: "0.6", marginTop: "20px" }}>
                            Brand: {product?.brand}
                        </Typography>
                        <Typography sx={{ opacity: "0.6", marginTop: "20px" }}>
                            Tags: Airbrush, Matte, Skin
                        </Typography>
                    </Box>
                </ListItem>
            </div>
        </Box>
    )
}

export default ProductDetailPage