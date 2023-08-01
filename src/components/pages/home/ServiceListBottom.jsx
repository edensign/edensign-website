/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import * as React from 'react';
import { Container, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SpaIcon from '@mui/icons-material/Spa';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';


const ServiceListBottom = () => {
    return (
        <Container sx={{ paddingBottom: "4%", display: 'flex', alignItems: "center" }}>
            <nav aria-label="services provided by this website">
                <List sx={{ display: "inline-flex", padding: "6% 0" }}>
                    <ListItem sx={{ flexDirection: "column" }}>
                        <SpaIcon sx={{ fontSize: "40px", lineHeight: "1", marginBottom: "6%" }} />
                        <ListItemButton className="list">
                            <ListItemText primary="all natural" primaryTypographyProps={{ fontWeight: "400", fontSize: "24px", lineHeight: "30px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "15px" }} />
                        </ListItemButton>
                        <FiberManualRecordIcon sx={{ fontSize: "4px", margin: "4%" }} />
                        <Typography sx={{ color: "rgb(97,97,97)", fontWeight: "300", fontSize: "16px", lineHeight: "30px", letterSpacing: "0.015em" }}>
                            All the products that we manufacture are 99% natural and tested by lab technicians. Occasional mrs interested far expression.
                        </Typography>
                    </ListItem>

                    <ListItem sx={{ flexDirection: "column" }}>
                        <AutoAwesomeIcon sx={{ fontSize: "40px", lineHeight: "1", marginBottom: "6%" }} />
                        <ListItemButton className="list">
                            <ListItemText primary="TOP QUALITY" primaryTypographyProps={{ fontWeight: "400", fontSize: "24px", lineHeight: "30px", letterSpacing: "0.14em", marginBottom: "15px" }} />
                        </ListItemButton>
                        <FiberManualRecordIcon sx={{ fontSize: "4px", margin: "4%" }} />
                        <Typography sx={{ color: "rgb(97,97,97)", fontWeight: "300", fontSize: "16px", lineHeight: "30px", letterSpacing: "0.015em" }}>
                            We provide the best quality products at cheapest rates without mixing manmade ingredients.
                        </Typography>
                    </ListItem>

                    <ListItem sx={{ flexDirection: "column" }}>
                        <CurrencyExchangeIcon sx={{ fontSize: "40px", lineHeight: "1", marginBottom: "6%" }} />
                        <ListItemButton className="list">
                            <ListItemText primary="10% CASHBACK" primaryTypographyProps={{ fontWeight: "400", fontSize: "24px", lineHeight: "30px", letterSpacing: "0.14em", marginBottom: "15px" }} />
                        </ListItemButton>
                        <FiberManualRecordIcon sx={{ fontSize: "4px", margin: "4%" }} />
                        <Typography sx={{ color: "rgb(97,97,97)", fontWeight: "300", fontSize: "16px", lineHeight: "30px", letterSpacing: "0.015em" }}>
                            We provide 10% cashback in all the beauty products listed on the site and money back guarantee if defect is there in any of our item.
                        </Typography>
                    </ListItem>
                </List>
            </nav>
        </Container>
    )
};

export default ServiceListBottom;
