/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardActions, CardContent, Rating } from '@mui/material';
import { Grid, Box, Typography } from '@mui/material';

import API from '../../../apis';
import { setSalons } from '../../../redux/actions/SalonAction';

const SalonListCards = () => {
  const salonNames = ["#JAWED HABIB HAIR & BEAUTY", "#STUDIO11 SALON & SPA", "#SHAHNAZ HUSAIN", "#LAKMÉ SALON", "#LOOKS SALON", "#NATURALS"];
  const salonImages = ["https://augustine.qodeinteractive.com/wp-content/uploads/2021/02/home-1-landing.jpg", "https://augustine.qodeinteractive.com/wp-content/uploads/2021/02/02_home.jpg", "https://augustine.qodeinteractive.com/wp-content/uploads/2021/02/044_home_land4.jpg", "https://augustine.qodeinteractive.com/wp-content/uploads/2021/02/augustine_land21.jpg", "https://topfranchise.com/upload/resize_cache/webp/upload/medialibrary/138/138c98b08f39bad8792b69547907eb6e.webp", "https://topfranchise.com/upload/resize_cache/webp/upload/medialibrary/c13/c134c9d42b8c406f4371648eae23392b.webp"]
  const rating = [4.5, 4, 4.5, 4.5, 4, 4.5];

  const dispatch = useDispatch();
  const { listData } = useSelector(state => state.allSalons);

  const getSalons = () => {
    API.SalonAPI.getAll()
      .then(res => {
        if (res.status === "Success") {
          console.log("Res.status===Success", res.data.rows)
          dispatch(setSalons({ listData: res.data.rows, loading: false }))
        } else {
          dispatch(setSalons({ listData: [], loading: false }))
        }
        console.log(res);
      })
      .catch(error => {
        throw error;
      });
  };

  React.useEffect(() => {
    //scroll to top of the page automatically
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    getSalons();
  }, []);
  console.log("useselector=>", listData)

  // Function to check if an element is in the viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight + 140 || document.documentElement.clientHeight + 140) &&
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

  return (

    <Box sx={{ width: "100%", marginBottom: "10%" }}>
      <Grid container id="grid-container" spacing={8} sx={{
        margin: 'auto', marginTop: "150px", maxWidth: "90%", flexWrap: "wrap", transition: "all 0.5s ease"
      }}
      >
        {salonNames.map((salon, index) => {
          const img = salonImages[index];
          const ratings = rating[index];
          return (
            <Grid item xs={12} md={6} lg={6} key={index} className={`grid-item`} sx={{
              padding: "0", opacity: "0", transform: "translateY(30px)", transition: "all 0.5s ease",
            }}>
              <Card sx={{
                maxWidth: "82%", height: 500, boxShadow: "4px 4px 9px #043927", filter: "brightness(100%)",
                // "&:hover": { transform: "translate3d(0px, -880px, 0px)", transition: "transform 10s ease" }
              }} >

                <Box height="340px" sx={{ overflow: "hidden" }}>
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
      </Grid>   {/* for spacing between container & card bottom */}
      <div style={{ width: "50px", height: "50px" }}></div>
    </Box>
  )
};

export default SalonListCards;
