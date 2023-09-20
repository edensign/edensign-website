import {Box} from "@mui/material";
import styles from "./NotFound.module.css";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

// import {Link, useLocation} from "react-router-dom";

import NotFound from "../assets/notfound.jpeg";
import { Button } from "@mui/material";

const NotFoundPage = () => {


  return (
    <div className={styles.container}>
      <img src={NotFound} alt="404" width="400px" />
      <h1>Page your are trying to access could not be found</h1>

      <div >
    <Button variant="contained" color="error" sx={{borderRadius:"1%",marginRight:"9px"}}> 
    GO HOME
    </Button>
    <Button variant="outlined" color="error"  sx={{border:"1px solid black"}}> 
    CONTACT US
    </Button>
    <Box sx={{display:"flex",justifyContent:"space-around"}} >
    <p><FacebookOutlinedIcon /></p>
<p><TwitterIcon/></p>
<p><InstagramIcon/></p>
<p><YouTubeIcon/></p>
    </Box>
      </div>
    </div>
  );
};


export default NotFoundPage;
