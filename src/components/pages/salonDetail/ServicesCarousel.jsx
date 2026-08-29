/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';

const ServicesCarousel = ({ handleClick }) => {

    const { salon } = useSelector(state => state.salonDetail);
    console.log("Services Selector=>", salon?.services);

    let slideIndex = 0;
    let counter = 3;

    function showSlides(num) {
        let slides = document.getElementsByClassName("salon-sliding");
        if (num == slides.length - (counter - 1)) {
            num = 0;
            slideIndex = 0;
        }
        if (num < 0) {
            num = slides.length - counter;
            slideIndex = slides.length - counter;
        }
        for (let slide of slides) {
            slide.style.display = "none";
            // slide.style.opacity = "1";
        }
        if (counter) {
            for (let x = num; x < (counter + num); x++) {
                slides[x].style.display = "block";
                // slides[x].style.opacity = "1";
            }
        } else {
            slides[num].style.display = "block";
            // slides[num].style.opacity = "1";
        }
    };

    function prevArrowClick(i) {
        slideIndex = slideIndex + i;
        console.log("Prev click ", i)
        showSlides(slideIndex);
    };

    function nextArrowClick(i) {
        slideIndex = slideIndex + i;
        console.log("Next click ", i);
        showSlides(slideIndex);
    };

    setTimeout(() => {
        showSlides(slideIndex);
        console.log("Running Controller");
    }, 500);

    return (
        <Box className="salon-slider">

            {salon?.services?.map(service => (
                <Box className='salon-sliding' key={service.id}>
                    <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "black", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        <span style={{ marginRight: "8px" }}>from</span>
                        <span> &#8377;500</span>
                    </Box>
                    <img src={service.default_image} />
                    <Box>
                        <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "24px", letterSpacing: "0.15em", textTransform: "capitalize" }}>
                            {service.name}
                        </h4>
                        <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "26px" }}>
                            {service.description} </p>
                        <Button type="submit" onClick={() => handleClick(service)}
                            sx={{
                                borderRadius: 0,
                                fontSize: "12px",
                                letterSpacing: "0.05em",
                                lineHeight: "2em",
                                fontWeight: "600",
                                padding: "4px 0 2px 0",
                                borderBottom: "1px solid",
                                textTransform: "capitalize"
                            }}>  Book Appointment  </Button>
                    </Box>
                </Box>
            ))}

            {/* <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={`${servicesSectionURL}matteMakeup.jpg`} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Matte Makeup
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "26px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={event => handleClick(event)}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={`${servicesSectionURL}eyebrow.jpg`} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Eyebrow Makeup
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "26px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={event => handleClick(event)}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={`${servicesSectionURL}AirbrushMakeup.jpg`} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Airbrush Makeup
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "26px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={event => handleClick(event)}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={`${servicesSectionURL}hairwash.jpg`} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Hair Wash
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={event => handleClick(event)}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={`${servicesSectionURL}haircut.jpg`} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Haircut
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={event => handleClick(event)}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={`${servicesSectionURL}haircolor.jpg`} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Hair Color
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={event => handleClick(event)}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={`${servicesSectionURL}keratin.jpg`} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Keratin Treatment
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={event => handleClick(event)}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={`${servicesSectionURL}pedicure.jpg`} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Pedicure
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={event => handleClick(event)}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={`${servicesSectionURL}fishPedicure.jpg`} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Fish Pedicure
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={event => handleClick(event)}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={`${servicesSectionURL}manicure.jpg`} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Manicure
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={event => handleClick(event)}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box> */}

            <span className='salon-arrow' style={{ left: "4%" }} onClick={() => prevArrowClick(-1)}>&#10094;</span>
            <span className='salon-arrow' style={{ right: "4%" }} onClick={() => nextArrowClick(+1)}>&#10095;</span>

        </Box >
    )
}

export default ServicesCarousel;
