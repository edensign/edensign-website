/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box, Container, Grid } from '@mui/material';

const SalonDetails = () => {

  const salonsNames = ["JAWED HABIB HAIR & BEAUTY", "STUDIO11 SALON & SPA", "SHAHNAZ HUSAIN", "LAKMÉ SALON", "LOOKS SALON", "NATURALS"];
  const salonsImages = ["https://topfranchise.com/upload/resize_cache/webp/upload/medialibrary/c0e/c0ee4e9ff45dd92b3365c7685aa09416.webp", "https://topfranchise.com/upload/resize_cache/webp/upload/medialibrary/680/680d3ee2eab94c6bb80496b3c884ca31.webp", "https://topfranchise.com/upload/resize_cache/webp/upload/medialibrary/7c3/7c3d40a70b5aa33b344be9892a6b4c89.webp", "https://topfranchise.com/upload/resize_cache/webp/upload/medialibrary/5b5/5b57e9b4bd7a629df354cfb210f4f590.webp", "https://topfranchise.com/upload/resize_cache/webp/upload/medialibrary/138/138c98b08f39bad8792b69547907eb6e.webp", "https://topfranchise.com/upload/resize_cache/webp/upload/medialibrary/c13/c134c9d42b8c406f4371648eae23392b.webp"]
  const salonInfo = ["Jawed Habib Hair and Beauty Limited is one of the leading Hair & Beauty salon chains in India which offer a full range of hair and beauty services carrying the hallmark of quality that is synonymous with Jawed Habib. The Company has 45 Academies (owned and franchised) course duration of which ranges from a full time six months professional course on specialized aspects of hair dressing & beauty.", "Studio11 Salon & Spa, Founded in 2013 with a vision to create an Industry leader in the wellness sector and to bring international salon and spa experience to every neighborhood in India, is the fastest emerging full-service unisex salon and spa in India now.", "The Shahnaz Husain Group is India's leading company in the field of natural beauty and anti-aging treatments. The group has activities as diverse as beauty salons, beauty training academy, growing of its own herbs to manufacturing of its cosmetics line to retail to specialized treatments through its chain of over 200 beauty centres in India and abroad.", "Lakme is a chain of salons, dedicated to the Indian woman and her exploration of beauty, which offers a wide range of high performance colour cosmetics and skincare products. Lakme comes with an extremely sustainable and profitable franchise business model for people interested to start a business in the beauty retail industry.", "Looks Salon is a pioneer in hair, beauty and nail services and is amongst top 10 brands with pan India presence. The brand bears a sense of responsibility to ensure premium quality of services in each salon. The set up of a Looks Unisex Salon can be established in any geographical region in India with area required: 1500 – 2000 sq. feet. The company provides Franchise with the overall consulting, training and development needs as their franchisees are the key to their success.", "Naturals, founded by Veena and her husband CK Kumaravel in 2000, is India's No.1 unisex hair and beauty salon with a strong network of more than 650+ salons evenly spread across the country! It is one of the fastest growing chains of salons. Besides the Unisex Salons, the brand has Naturals Lounge (premium salon), Naturals W (women salon), Page 3 (luxury salons). Starting a franchise with Naturals presents an opportunity to increase investment in a systematic and steady manner."];
  const founded = [2006, 2012, 1970, 1952, 1989, 2000];
  const franchising = [2014, 2013, 1975, 1998, 2003, 2006];
  const franchiseUnits = [484, 150, 200, 170, 118, 430];
  const initialInvest = ['20-30 Lakhs', "30-50 Lakhs", "20-30 Lakhs", "50-60 Lakhs", "1.2-1.5 Crore", "50-55 Lakhs"];
  const royaltyFee = ["INR 15000 + INR 2500", "10%", "10%", "5%", "Not Available", "INR 5 Lakh + Service Tax"];

  return (
    <Grid container spacing={8} sx={{
      width: "100%", padding: "4%"
    }}>
      {
        salonsNames.map((salon, index) => {
          let img = salonsImages[index];
          let found = founded[index];
          let fran = franchising[index];
          let franUni = franchiseUnits[index];
          let ini = initialInvest[index];
          let royal = royaltyFee[index];
          let salonData = salonInfo[index];
          return (
            <Grid item xs={12} md={12} key={index} sx={{ display: "flex", padding: "0", width: "100%" }}>
              <Container
                sx={{
                  width: "50%", height: 460, borderRadius: '20px'
                }}
              >
                <img src={img} id='salon-img' alt="This is a Salon Photo" />
              </Container>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: "50%",
                  height: 440,
                  color: "azure",
                }}
              >
                <h3> <a name={salon} style={{ textDecoration: "none" }}>
                  {salon} </a> </h3>
                <p className='makeup-para4'><b> Founded in:</b> {found} <br /><b>Franchising since:</b> {fran} <br /><b>Franchise units:</b> {franUni} <br />
                  <b>Initial investment:</b> {ini} <br /><b>Royalty Fees:</b> {royal} </p>
                <p className='makeup-para4'> {salonData} </p>
              </Container>
            </Grid>
          )
        })
      }
    </Grid>
  )
};

export default SalonDetails;
