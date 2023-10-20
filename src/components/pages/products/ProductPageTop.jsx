import React from 'react'
import productimage from "../../assets/productbg.webp"
import { Box } from '@mui/material'
function ProductPageTop() {
  return (
    <Box style={{width:"100%",height:"60vh",backgroundImage:`url(${productimage})`,display:"flex", justifyContent:"center",alignItems:"center"}}>
        <p style={{textTransform:"uppercase", fontSize:"60px", letterSpacing:".2em",color:"white",fontWeight:"250"}} >shop</p>
        
    </Box>
  )
}

export default ProductPageTop