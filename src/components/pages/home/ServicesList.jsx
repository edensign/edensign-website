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
        <Container sx={{ paddingBottom: "4%", display: 'flex', alignItems: "center" }}>
            <nav aria-label="services provided by this website">
                <List sx={{ display: "inline-flex", padding: "8% 0" }}>
                    <ListItem sx={{ flexDirection: "column" }}>
                        <LocalShippingIcon />
                        <ListItemButton className="list" sx={{ padding: "0" }}>
                            <ListItemText primary="free shipping" primaryTypographyProps={{ fontSize: "1.5rem" }} sx={{ textTransform: "uppercase" }} />
                        </ListItemButton>
                        <FiberManualRecordIcon sx={{ fontSize: "6px", margin: "2%" }} />
                        <Typography>
                            For county now sister engage had season better had waited. Occasional mrs interested far expression.
                        </Typography>
                    </ListItem>
                    <ListItem sx={{ flexDirection: "column" }}>
                        <MessageIcon />
                        <CommentIcon sx={{ margin: "-10px 0 0 50px" }} />
                        <ListItemButton className="list" sx={{ padding: "0" }}>
                            <ListItemText primary="24/7 SUPPORT" primaryTypographyProps={{ fontSize: "1.5rem" }} />
                        </ListItemButton>
                        <FiberManualRecordIcon sx={{ fontSize: "6px", margin: "2%" }} />
                        <Typography>
                            Our team members work for 24/7 to provide you the best experience with most simplicity.
                        </Typography>
                    </ListItem>
                    <ListItem sx={{ flexDirection: "column" }}>
                        <SettingsBackupRestoreIcon />
                        <ListItemButton className="list" sx={{ padding: "0" }}>
                            <ListItemText primary="MONEY BACK" primaryTypographyProps={{ fontSize: "1.5rem" }} />
                        </ListItemButton>
                        <FiberManualRecordIcon sx={{ fontSize: "6px", margin: "2%" }} />
                        <Typography>
                            We provide 100% money back guarantee within 2 days of purchase if defect is there in any of our item.
                        </Typography>
                    </ListItem>
                </List>
            </nav>
        </Container>
    )
}

export default ServicesList;
