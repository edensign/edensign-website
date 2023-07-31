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
import ProductCard from './ProductCard';
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
    <Box sx={{ pt: 2, position: "relative" }}>
      <Container sx={{
        pt: 4, display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center"
      }}>
        <p style={{ fontFamily: "Marcellus,sans-serif", fontWeight: "400", fontSize: "20px", lineHeight: "20px", letterSpacing: "0.8em" }}> TOP BRANDED </p>
        <DiamondIcon sx={{ fontSize: "10px" }} />
        <p style={{ fontSize: '40px', fontWeight: "400", lineHeight: "1.28", letterSpacing: "0.14em", marginTop: "4px" }}> PRODUCTS </p>
        <List component='nav' sx={{ display: "inline-flex" }}>
          <ListItemButton className="list">
            <ListItemText primary="FEATURED" primaryTypographyProps={{ fontSize: "20px", fontWeight: "400", lineHeight: "18px", letterSpacing: "0.15em" }} />
          </ListItemButton>
          <ListItemButton className="list">
            <ListItemText primary="POPULAR" primaryTypographyProps={{ fontSize: "20px", fontWeight: "400", lineHeight: "18px", letterSpacing: "0.15em" }} />
          </ListItemButton>
          <ListItemButton className="list">
            <ListItemText primary="CATEGORY" primaryTypographyProps={{ fontSize: "20px", fontWeight: "400", lineHeight: "18px", letterSpacing: "0.15em" }} />
          </ListItemButton>
          <ListItemButton className="list" component="a" href="#simple-list">
            <ListItemText primary="BRAND" primaryTypographyProps={{ fontSize: "20px", fontWeight: "400", lineHeight: "18px", letterSpacing: "0.15em" }} />
          </ListItemButton>
        </List>
      </Container>
      <Divider sx={{ borderBottomWidth: "thick" }} />
      <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: "center" }}>
        {/* {products.loading === true ? <Loader /> : */}
        {products.listData?.length ? products.listData.slice(0, 3).map(item => (
          <React.Fragment key={item.productId}>
            <Grid item xs={6} sm={6} md={4} xl={3}>
              <ProductCard title={item.displayName} img={item.image250} rating={item.rating} url={item.targetUrl} brand={item.brandName} />
            </Grid>
          </React.Fragment>
        ))
          // : <div style={{ height: "500px", width: "100%", border: "4px solid crimson" }}> </div>
          : "Errorrr"}
      </Grid>
    </Box>
  );
}


export default ProductList;
