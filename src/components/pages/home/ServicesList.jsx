/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Container, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MessageIcon from '@mui/icons-material/Message';
import CommentIcon from '@mui/icons-material/Comment';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

const ServicesList = () => {

    return (
        <Container sx={{ marginBottom: "8%", display: 'flex', alignItems: "center" }}>
            <nav aria-label="services provided by this website">
                <List sx={{ display: "inline-flex", padding: "0" }}>
                    <ListItem sx={{ flexDirection: "column" }}>
                        <LocalShippingIcon sx={{ fontSize: "40px", lineHeight: "1", marginBottom: "6%" }} />
                        <ListItemButton className="list">
                            <ListItemText primary="free shipping" primaryTypographyProps={{ fontWeight: "400", fontSize: "24px", lineHeight: "30px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "15px" }} />
                        </ListItemButton>
                        <FiberManualRecordIcon sx={{ fontSize: "4px", margin: "5%", marginTop: "0" }} />
                        <Typography sx={{ color: "rgb(97,97,97)", fontWeight: "300", fontSize: "16px", lineHeight: "30px", letterSpacing: "0.015em" }}>
                            For county now sister engage had season better had waited. Occasional mrs interested far expression.
                        </Typography>
                    </ListItem>

                    <ListItem sx={{ flexDirection: "column", width: "89%", maxWidth: "89%" }}>
                        <div style={{ display: "flex", height: "62px" }}>
                            <MessageIcon sx={{ fontSize: "40px", lineHeight: "1" }} />
                            <CommentIcon sx={{ fontSize: "40px", lineHeight: "1", marginTop: "18px" }} />
                        </div>
                        <ListItemButton className="list">
                            <ListItemText primary="24/7 SUPPORT" primaryTypographyProps={{ fontWeight: "400", fontSize: "24px", lineHeight: "30px", letterSpacing: "0.14em", marginBottom: "15px" }} />
                        </ListItemButton>
                        <FiberManualRecordIcon sx={{ fontSize: "4px", margin: "5%", marginTop: "0" }} />
                        <Typography sx={{ color: "rgb(97,97,97)", fontWeight: "300", fontSize: "16px", lineHeight: "30px", letterSpacing: "0.015em" }}>
                            Our team members work for 24/7 to provide you the best experience with most simplicity.
                        </Typography>
                    </ListItem>

                    <ListItem sx={{ flexDirection: "column" }}>
                        <SettingsBackupRestoreIcon sx={{ fontSize: "40px", lineHeight: "1", marginBottom: "6%" }} />
                        <ListItemButton className="list">
                            <ListItemText primary="MONEY BACK" primaryTypographyProps={{ fontWeight: "400", fontSize: "24px", lineHeight: "30px", letterSpacing: "0.14em", marginBottom: "15px" }} />
                        </ListItemButton>
                        <FiberManualRecordIcon sx={{ fontSize: "4px", margin: "5%", marginTop: "0" }} />
                        <Typography sx={{ color: "rgb(97,97,97)", fontWeight: "300", fontSize: "16px", lineHeight: "30px", letterSpacing: "0.015em" }}>
                            We provide 100% money back guarantee within 2 days of purchase if defect is there in any of our item.
                        </Typography>
                    </ListItem>
                </List>
            </nav>
        </Container>
    )
}

export default ServicesList;
