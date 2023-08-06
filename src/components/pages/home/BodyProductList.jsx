/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import axios from 'axios';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Container, Grid, List, ListItemButton, ListItemText } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import Divider from '@mui/material/Divider';

import Loader from '../../common/Loader';
import ProductCarousel from './ProductCarousel';
import { setProducts } from '../../../redux/actions/ProductAction';

const ProductList = () => {

  const dispatch = useDispatch();
  const products = useSelector(state => state.allProducts);
  console.log("products=>", products)

  const fetchProducts = () => {
    const options = {
      method: 'GET',
      url: 'https://sephora.p.rapidapi.com/products/list',
      params: { categoryId: 'cat150006', pageSize: '60', currentPage: '1' },
      headers: {
        'X-RapidAPI-Key': '29c83dd30bmsh6b5d59d0cf81cfbp119427jsnb95a03da5160',
        'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
      }
    };
    axios.request(options)
      .then(res => {
        dispatch(setProducts({ listData: res.data.products, loading: false }));
      })
      .catch(err => {
        dispatch(setProducts({ listData: [], loading: false }));
      });
  }

  // React.useEffect(() => {
  //   fetchProducts();
  // }, [])

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{
        display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center"
      }}>
        <p style={{ fontFamily: "Marcellus,sans-serif", fontWeight: "400", fontSize: "20px", lineHeight: "20px", letterSpacing: "0.8em" }}> TOP BRANDED </p>
        <DiamondIcon sx={{ fontSize: "10px" }} />
        <p style={{ fontSize: '40px', fontWeight: "400", lineHeight: "1.28", letterSpacing: "0.14em", marginTop: "4px" }}> PRODUCTS </p>
      </Box>

      <Box marginTop="2%">
        <ProductCarousel />
      </Box>
    </Box>
  );
}


export default ProductList;

// {  products.loading === true ? <Loader /> :
//   <Grid container spacing={2} sx={{ margin: "3% 0 10% 0" }}>
//     {products.listData?.length ? products.listData.slice(0, 3).map(item => (
//      : <div style={{ height: "500px", width: "100%", border: "4px solid crimson" }}> </div>
//           : "Errorrr"}
//   </Grid>
