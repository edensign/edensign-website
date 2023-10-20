/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box, List, ListItem, Typography } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import "../about/AboutUs.css";

const MissionComponent = () => {

  return (
    <Box sx={{ position: "relative", margin: "60px 0" }}>
      <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <p style={{ fontFamily: "Marcellus,sans-serif", fontWeight: "400", fontSize: "20px", lineHeight: "20px", letterSpacing: "0.8em" }}> OUR </p>
        <DiamondIcon sx={{ fontSize: "10px" }} />
        <p style={{ fontSize: '40px', fontWeight: "400", lineHeight: "1.28", letterSpacing: "0.14em", marginTop: "4px" }}> MISSION </p>
      </Box>

      <div style={{ margin: "5% auto", marginTop: "2%", display: 'flex', alignItems: "center" }}>
        <nav aria-label="mission of eden sign website">
          <List sx={{ display: "inline-flex", padding: "0" }}>
            <ListItem sx={{ display: "initial", margin: "0 4% 0 8%" }}>
              <Typography component="p" sx={{
                color: "rgb(97,97,97)", fontWeight: "300", fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: "26px", letterSpacing: "0.115em"
              }}>
                At "Eden Sign", our mission is to deliver exceptional salon experiences that empower our clients to look and feel their best. We are dedicated to providing top-quality services that prioritize customer satisfaction, innovation, and inclusivity. Through a commitment to excellence, sustainability, and community engagement, we strive to be the trusted destination for beauty, self-confidence, and well-being. We believe that beauty is about more than appearances; it's about self-esteem and embracing one's uniqueness.
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "initial", margin: "0 8% 0 4%" }}>
              <Typography component="p" sx={{
                color: "rgb(97,97,97)", fontWeight: "300", fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: "26px", letterSpacing: "0.115em"
              }}>
                Our client-centric approach, and eco-friendly practices define our salon's character. We aim to create a welcoming and diverse space where individuals can confidently express themselves, knowing that they are in the hands of skilled professionals who care deeply about their needs and preferences. We are more than just a salon franchise; we are a destination for transformation, self-expression, and empowerment. Join us on this journey towards self-confidence, style, and a brighter, more beautiful world.
              </Typography>
            </ListItem>
          </List>
        </nav>
      </div>

    </Box>
    // <ListItem sx={{ flexDirection: "column" }}>
    //   <ListItemText primary="Excellence in Service" primaryTypographyProps={{ fontWeight: "400", fontSize: "24px", lineHeight: "30px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "15px" }} />
    //   <FiberManualRecordIcon sx={{ fontSize: "4px", margin: "5%", marginTop: "0" }} />
    //   <Typography sx={{ color: "rgb(97,97,97)", fontWeight: "300", fontSize: "16px", lineHeight: "30px", letterSpacing: "0.015em" }}>
    //     We are committed to delivering exceptional salon experiences through skilled professionals who stay at the forefront of industry trends. Quality and customer satisfaction are our top priorities.
    //   </Typography>
    // </ListItem>
  )
}

export default MissionComponent;
