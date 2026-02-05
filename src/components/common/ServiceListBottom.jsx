/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SpaIcon from '@mui/icons-material/Spa';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import "../pages/about/AboutUs.css";
import image2 from "../assets/TQ.jpg";
import image1 from "../assets/NH1.jpg";
import image3 from "../assets/CB.jpg";


const ServiceListBottom = () => {

    return (
        <>
            <Box sx={{ width: "100%", height: "100px", display: "flex", justifyContent: "center", backgroundColor: "#58c5d2" }}>
                <p className='unique' style={{ fontSize: "40px", fontWeight: "400", letterSpacing: ".2em", height: "100px" }} >What Makes Us Unique ?</p>
            </Box>

            <Box sx={{ display: 'flex', backgroundColor: "#58c5d2", width: "100%", height: "500px", marginBottom: "8%" }}>
                <List sx={{ display: "inline-flex", margin: "15px", justifyContent: "space-around", width: "100%", color: "white", alignItems: "center" }}>
                    <ListItem className="flip-card-front" sx={{
                        flexDirection: "column", justifyContent: "center", borderRadius: "50%", height: "390px", width: "390px",
                        backgroundImage: `url(${image1})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"
                    }}>
                        <SpaIcon sx={{ fontSize: "40px" }} />
                        <ListItem sx={{ display: "flex", flexDirection: "column" }} >
                            <ListItemText primary="all natural" primaryTypographyProps={{ fontWeight: "500", fontSize: "32px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0px" }} />
                        </ListItem>
                        <Typography className="flip-card-back" sx={{ width: "87%", margin: "0 auto", color: "white", fontWeight: "300", fontSize: "16px", letterSpacing: "0.015em", display: "none" }} >
                            All the products that we manufacture are 99% natural and tested by lab technicians. Occasional mrs interested far expression.
                        </Typography>
                    </ListItem>

                    <ListItem className="flip-card-front" sx={{
                        flexDirection: "column", justifyContent: "center", borderRadius: "50%", height: "390px", width: "390px",
                        backgroundImage: `url(${image2})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"
                    }}>
                        <AutoAwesomeIcon sx={{ fontSize: "40px" }} />
                        <ListItem sx={{ display: "flex", flexDirection: "column" }} >
                            <ListItemText primary="Online Appointments" primaryTypographyProps={{ fontWeight: "500", fontSize: "32px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0px" }} />
                        </ListItem>
                        <Typography className="flip-card-back" sx={{ width: "87%", margin: "0 auto", color: "white", fontWeight: "300", fontSize: "16px", letterSpacing: "0.015em", display: "none" }}>
                            We make your salon booking experience hassle free and smooth.
                        </Typography>
                    </ListItem>

                    <ListItem className="flip-card-front" sx={{
                        flexDirection: "column", justifyContent: "center", borderRadius: "50%", height: "390px", width: "390px",
                        backgroundImage: `url(${image3})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"
                    }}>
                        <CurrencyExchangeIcon sx={{ fontSize: "40px" }} />
                        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
                            <ListItemText primary="10% cashback" primaryTypographyProps={{ fontWeight: "500", fontSize: "32px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0px" }} />
                        </ListItem>
                        <Typography className="flip-card-back" sx={{ width: "87%", margin: "0 auto", color: "white", fontWeight: "300", fontSize: "16px", letterSpacing: "0.015em", display: "none" }}>
                            We provide 10% cashback in all the beauty products and bookings listed on the site and money back guarantee if defect is there in any of our item.
                        </Typography>
                    </ListItem>
                </List>
            </Box>

        </>
    )
};

export default ServiceListBottom;


