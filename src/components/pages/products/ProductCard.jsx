import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import image1 from "../../assets/productimage1.webp"
import { Divider } from '@mui/material';

import "../products/Product.css"

function ProductCard() {
  return (
    <Card sx={{ height:"82vh",margin: "70px 0 0 70px",borderRadius:"0" }}>
        <div style={{width:"24%",position:"absolute",display:"flex",justifyContent:"space-between",color:"white"}}>
            <span style={{backgroundColor:"black",fontSize:"15px"}}>-11%</span>
            <span style={{backgroundColor:"#e4c1b1",textTransform:"uppercase",fontSize:"12px",width:"67px",textAlign:"center"}}>featured</span>
        </div>
      <CardMedia
        sx={{ height: 280 ,marginBottom:"2px" }}
       image={image1}     
      />
      <Divider></Divider>
      <CardContent sx={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
        <h2 style ={{textTransform:"uppercase",fontSize:"25px",letterSpacing:".2em",fontWeight:"550",textAlign:"center",width:"60%",fontFamily:"marcellus"}} >
          airbrush matte
        </h2>
        <Typography sx={{textAlign:"center",width:"75%",fontSize:"17.5px"}}>
          skin-perfecting bronzed filter for the face
        </Typography>
        <div class="rate">
      <input type="radio" id="star5" name="rate" value="5" />
      <label for="star5" title="text">5 stars</label>
      <input type="radio" id="star4" name="rate" value="4" />
      <label for="star4" title="text">4 stars</label>
      <input type="radio" id="star3" name="rate" value="3" />
      <label for="star3" title="text">3 stars</label>
      <input type="radio" id="star2" name="rate" value="2" />
      <label for="star2" title="text">2 stars</label>
      <input type="radio" id="star1" name="rate" value="1" />
      <label for="star1" title="text">1 star</label>
    </div>
      <Typography sx={{textAlign:"center",width:"75%",fontSize:"16.5px",fontWeight:"520",letterSpacing:".8px",fontFamily:"inter"}}>
         $40.00
        </Typography>
        </CardContent>
    </Card>
  )
}

export default ProductCard