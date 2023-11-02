/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */
import { useEffect, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, Box } from '@mui/material';
import { Checkbox, FormControlLabel, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import ReactImageMagnify from 'react-image-magnify';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useTheme } from '@mui/material/styles';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import "./Product.css"

const ProductDialogBox = ({ openDialog, setOpenDialog, image }) => {
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('900px'));
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:920px)");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [Num, setNum] = useState(1)

  const handleClose = () => {
    setOpenDialog(false);
  };
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
    <div>
      <Dialog
        fullScreen
        open={openDialog}
        aria-labelledby="responsive-dialog-title"
        sx={{
          top: isMobile ? "38%" : isTab ? "30%" : "10%", height: isMobile ? "24%" : isTab ? "14%" : "80%",
          width: "64%", marginLeft: "18%",
          "& .MuiBackdrop-root": {
            backgroundColor: '#ffffff',
            opacity: '0.8 !important'
          },
          "& .MuiDialog-container": {
            height: '89%'
          }
        }}>

        <List sx={{
          width: '100%', height: "100%", display: "flex"
        }}>
          <Box sx={{ width: "50%", backgroundColor: "green" }} >
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: 'Makeup',
                  isFluidWidth: true,
                  src: image,
                  className: "small-image",
                  // sizes: '(max-width: 480px) 100vw, (max-height: 1200px) 30vw, 480px'

                },
                largeImage: {
                  src: image,
                  width: 1200,
                  height: 1200,
                },
                isHintEnabled: true,
                enlargedImagePosition: 'over',
                shouldUsePositiveSpaceLens: true,
              }}
            />
          </Box>
          <ListItem className='list-it' sx={{
            width: "50%", height: "100%", display: "flex", flexDirection: "column",
            textTransform: "uppercase", bgcolor: 'rgb(222,222,222)'
          }}>
            <Box sx={{ width: "90%" }}>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                  border: "1 px solid black"
                }}
              >
                <CloseIcon />
              </IconButton>
              <h2 style={{ letterSpacing: ".2em", fontFamily: "marcellus", fontWeight: "400" }}>Moisture Balm</h2>
              <p style={{ textTransform: "none", opacity: "0.6" }}>A bestselling luminizing moisture balm</p>
              <Typography sx={{
                textAlign: "center", width: "75%", fontSize: "16.5px", fontWeight: "520",
                letterSpacing: ".8px", fontFamily: "inter"
              }}>
                $40.00
              </Typography>
              <Box sx={{
                backgroundColor: "white", height: "100px", width: "95%", display: "inline-flex", justifyContent: "center ", alignItems: "center", marginTop: "12px"
              }}>
                <Button className='addtocartbtn' variant='contained' sx={{ backgroundColor: "white", color: "black", margin: "12px", border: "1px solid black", borderRadius: "0", height: "45px", fontSize: "30px" }} onClick={handleDecreasingitem}>-</Button>
                {Num}
                <Button className='addtocartbtn' variant='contained' sx={{ backgroundColor: "white", color: "black", margin: "11px", border: "1px solid black", borderRadius: "0", height: "45px", fontSize: "30px" }} onClick={handleIncreasingitem}>+</Button>

                <Button variant='contained' sx={{ borderRadius: "0", width: "135px", height: "45px", fontSize: "12px" }}>Add to cart</Button>
              </Box>

              <Box sx={{
                width: "75%", marginTop: "20px", display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <FavoriteBorderOutlinedIcon className='hovericons' sx={{ verticalAlign: "middle", fontSize: "15px", border: '1px solid #E4C1B1' }} onClick={toggleWishlist} /> {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                {/* <span style={{ fontSize: "14px", fontWeight: "400", letterSpacing: ".8px" }}> add to wishlist </span> */}
              </Box>

              <Box sx={{ textTransform: "uppercase", opacity: ".6", marginTop: "14px", display: "flex", flexDirection: "column" }}>
                <ListItemText >sku: 987654221</ListItemText>
                <ListItemText>category: makeup</ListItemText>
                <ListItemText>tags: airbrush ,matte, skin</ListItemText></Box>
              <ListItem sx={{ width: "70%", display: "flex", justifyContent: "space-around", fontSize: "10px", marginLeft: "-16px" }}>
                <ListItemText sx={{ fontSize: "8px" }} >share</ListItemText>
                <ListItemText className='hovericons' ><FacebookOutlinedIcon /></ListItemText>
                <ListItemText className='hovericons'> <TwitterIcon /> </ListItemText>
                <ListItemText className='hovericons' > <WhatsAppIcon /></ListItemText>
                <ListItemText className='hovericons' > <InstagramIcon /></ListItemText></ListItem>



            </Box>
          </ListItem>
        </List>

      </Dialog>
    </div >
  );
}

export default ProductDialogBox;
