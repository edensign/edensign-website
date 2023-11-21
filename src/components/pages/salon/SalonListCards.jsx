/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Grid, Rating } from '@mui/material';

import API from '../../../apis';
import { setSalons } from '../../../redux/actions/SalonAction';

const SalonListCards = ({ selectedCategory, selectedGender }) => {

  const dispatch = useDispatch();
  const { listData } = useSelector(state => state.allSalons);

  const getSalons = () => {
    API.SalonAPI.getSalonList(selectedCategory, selectedGender)
      .then(res => {
        if (res.status === "Success") {
          dispatch(setSalons({ listData: res.data, loading: false }))
        } else {
          dispatch(setSalons({ listData: [], loading: false }))
        }
      })
      .catch(error => {
        console.log('ERRRRRR=>', error);
        throw error;
      });
  };

  React.useEffect(() => {
    getSalons();
  }, [selectedCategory, selectedGender]);

  // Function to check if an element is in the viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight + 260 || document.documentElement.clientHeight + 260) &&
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
  };

  // Attach scroll event listener to the container
  document.addEventListener('scroll', onScroll);

  // Call the onScroll function initially to handle items already in view
  onScroll();


  const handleMouseOver = (index) => {
    const salonImage = document.getElementById(`salon-listing-img-${index}`);
    const imageHeight = Math.ceil(salonImage.getBoundingClientRect().height) - 320;

    salonImage.style.transform = `translate3D(0, ${-imageHeight}px, 0)`;
    salonImage.style.transition = "transform 16s ease";
  };

  const handleMouseOut = (index) => {
    const salonImage = document.getElementById(`salon-listing-img-${index}`);

    salonImage.style.transform = `translate3D(0, 0, 0)`;
    salonImage.style.webkitTransform = `translate3D(0, 0, 0)`;
    salonImage.style.transitionDuration = "3s";
  };

  return (

    <Box sx={{ width: "100%", marginBottom: "10%" }}>
      <Grid container id="grid-container" spacing={8} sx={{
        margin: 'auto', marginTop: "150px", maxWidth: "90%", flexWrap: "wrap", WebkitBackfaceVisibility: "hidden", transition: "all .2s linear"
      }}>
        {listData?.map((salon, index) => {
          return (
            <Grid item xs={12} md={6} lg={6} key={index} className={`grid-item`} sx={{
              padding: "0", opacity: "0", transform: "translateY(30px)",
              visibility: "visible", WebkitBackfaceVisibility: "hidden", transition: "all 0.3s ease-in-out"
            }}>
              <Card sx={{

                maxWidth: "88%", height: 520, boxShadow: "4px 4px 9px #043927", filter: "brightness(100%)"
              }}>

                <Box height="318px" onMouseOut={() => handleMouseOut(index)}
                  sx={{ overflow: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translate(0, 0)", transitionDuration: "3s" }}>
                  <img
                    id={`salon-listing-img-${index}`}
                    className="salon-listing-img"
                    src={salon.banner_image}
                    title={salon.name}
                    alt="Not Found"
                    onMouseOver={() => handleMouseOver(index)}
                  />
                </Box>

                <CardContent>
                  <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize", margin: "0", textAlign: "center" }}>
                    {salon.name}
                  </h4>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <span style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.1em", textAlign: "center", padding: "0 30px" }}>{salon.landmark} {salon.street}</span>
                </CardActions>
                <CardActions sx={{ justifyContent: "space-around" }}>
                  <Button size="small"> <Rating name="read-only" defaultValue={5} /> </Button>
                  <span style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.1em", textAlign: "center", padding: "0 30px" }}>{salon.type}</span>
                  <Link to={`/salon/detail/${salon.salon_code}`} rel='noreferrer' style={{ textDecoration: "none" }}>
                    Know More
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          )
        }
        )}
      </Grid>   {/* for spacing between container & card bottom */}
      <div style={{ width: "50px", height: "50px" }}></div>
    </Box>
  )
};

export default SalonListCards;
