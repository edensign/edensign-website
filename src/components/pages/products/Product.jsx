import React from 'react'
import ProductPageTop from './ProductPageTop'
import ProductCategories from './ProductCategories'
import ProductCard from './ProductCard'


function Product() {
  return (
    <>
    <ProductPageTop/>
    <div style={{display:"flex",backgroundColor:"rgb(236,236,236)"}}>
    <ProductCategories/>
    <ProductCard/>
    </div>
    </>
  )
}

export default Product