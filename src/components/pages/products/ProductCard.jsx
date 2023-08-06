/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { Chip, Rating } from '@mui/material';

const ProductCard = (props) => {
  const { brand, title, img, rating, url } = props;
  const fullUrl = `https://www.sephora.com/${url}`

  return (
    <Card sx={{ maxWidth: 310, height: "490px" }}>
      <Chip label={brand} sx={{ float: "right", backgroundColor: '#EE82EE', color: "white", fontWeight: "bold" }} />
      <CardMedia
        sx={{ height: 310 }}
        image={img}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"> <Rating name="read-only" value={rating} readOnly />
          <a href={fullUrl} target="_blank" rel='noreferrer' style={{ textDecoration: "none" }}>
            &nbsp;&nbsp;&nbsp; Buy
          </a>
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
