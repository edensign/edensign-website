/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function StarRating({ value: propValue, onChange, name = "hover-feedback" }) {
    // Use internal state only if not controlled
    const [internalValue, setInternalValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);

    // Determine if controlled or uncontrolled
    const isControlled = propValue !== undefined;
    const value = isControlled ? propValue : internalValue;

    const handleChange = (event, newValue) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <Box
            sx={{
                width: 115,
                display: 'flex',
                alignItems: "flex-start",
                flexDirection: "column"
            }}
        >
            <Rating
                name={name}
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={handleChange}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}
