/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Rating } from '@mui/material';
import { Grid, Box, Typography } from '@mui/material';

import "./style.css";
import SalonDetails from './SalonDetails';

const SalonListCards = () => {
  const salonNames = ["#JAWED HABIB HAIR & BEAUTY", "#STUDIO11 SALON & SPA", "#SHAHNAZ HUSAIN", "#LAKMÉ SALON", "#LOOKS SALON", "#NATURALS"];
  const salonImages = ["https://augustine.qodeinteractive.com/wp-content/uploads/2021/02/home-1-landing.jpg", "https://augustine.qodeinteractive.com/wp-content/uploads/2021/02/02_home.jpg", "https://augustine.qodeinteractive.com/wp-content/uploads/2021/02/044_home_land4.jpg", "https://augustine.qodeinteractive.com/wp-content/uploads/2021/02/augustine_land21.jpg", "https://topfranchise.com/upload/resize_cache/webp/upload/medialibrary/138/138c98b08f39bad8792b69547907eb6e.webp", "https://topfranchise.com/upload/resize_cache/webp/upload/medialibrary/c13/c134c9d42b8c406f4371648eae23392b.webp"]
  const rating = [4.5, 4, 4.5, 4.5, 4, 4.5];

  // Function to check if an element is in the viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight + 180 || document.documentElement.clientHeight + 180) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to handle scroll event
  function onScroll() {
    const gridContainer = document.querySelector("#grid-container");
    const scroll = window.pageYOffset;

    if (gridContainer) {
      if (scroll > 80) {
        gridContainer.style.marginTop = "-150px";
      } else {
        gridContainer.style.marginTop = "150px";
      }
    }

    const items = document.querySelectorAll('.grid-item');
    items.forEach(item => {
      if (isElementInViewport(item)) {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }
    });
  }

  // Attach scroll event listener to the container
  document.addEventListener('scroll', onScroll);

  // Call the onScroll function initially to handle items already in view
  onScroll();


  {/* transform: "scale(1.1)" */ }
  return (

    <Box sx={{ backgroundColor: "#f3f3f3", width: "100%", border: "2px solid yellow", marginBottom: "20%" }}>
      <Grid container id="grid-container" spacing={8} sx={{
        margin: 'auto', marginTop: "150px", maxWidth: "90%", flexWrap: "wrap", transition: "all 0.5s ease"
      }}
      >
        {salonNames.map((salon, index) => {
          const img = salonImages[index];
          const ratings = rating[index];
          return (
            <Grid item xs={12} md={6} lg={4} key={index} className={`grid-item`} sx={{
              padding: "0", opacity: "0", transform: "translateY(30px)", transition: "all 0.5s ease",
            }}>
              <Card sx={{
                maxWidth: "86%", height: 400, boxShadow: "4px 4px 9px #043927", filter: "brightness(100%)",
                // "&:hover": { transform: "translate3d(0px, -880px, 0px)", transition: "transform 10s ease" }
              }} >

                <Box height="280px" sx={{ overflow: "hidden" }}>
                  <img
                    id="salon-listing-img"
                    src={img}
                    title={salon}
                    alt="Not Found"
                  />
                </Box>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" textAlign="center" marginBottom="-10px">
                    {salon}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-around" }}>
                  <Button size="small"> <Rating name="read-only" value={ratings} readOnly />  </Button>
                  <a href={salon} rel='noreferrer' style={{ textDecoration: "none" }}>
                    Know More
                  </a>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
};

export default SalonListCards;
