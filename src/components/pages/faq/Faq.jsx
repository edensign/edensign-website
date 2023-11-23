import React from 'react'
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import productimage from "../../assets/productbg.webp";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    margin: "9px",
    transition: 'all 2.3s linear',
    marginTop: "0",
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark',
    height: "105px",
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transformOrigin: 'center center',
        transform: 'rotate(180deg)',
        transition: 'transform .3s linear',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
        fontSize: '25px',
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    transition: 'height 2s ease-in-out',
}));

export default function Faq() {
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <>
            <Box sx={{
                width: "100%", height: "55vh", backgroundImage: `url(${productimage})`, display: "flex", justifyContent: "center",
                alignItems: "center", flexDirection: "column"
            }}>
                <p style={{
                    textTransform: "uppercase", fontSize: "60px", letterSpacing: ".2em", color: "white", fontWeight: "250"
                }} >faq</p>
            </Box>

            <Box sx={{
                display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center"
            }}>
                <div style={{
                    width: "80%", display: "flex", flexDirection: "column", height: "90vh", marginTop: "50px",

                }}>
                    <Accordion style={{ overflow: 'none' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography sx={{
                                textTransform: "uppercase", fontSize: "20px", fontWeight: "400", letterSpacing: "0.19rem"
                            }}>
                                payment methods</Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                            <Typography sx={{
                                fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876"
                            }}>
                                Nulla in faucibus praesent scelerisque neque ut tellus dolor. Auctor lorem convallis vulputate tincidunt tellus quis molestie pulvinar. Viverra ut pellentesque pulvinar erat ipsum amet pellentesque semper nunc. Vitae massa quisque gravida pellentesque ultrices nibh semper elit in. Ut velit vitae purus, ornare odio gravida nulla. Viverra et morbi sapien sapien mauris lacus adipiscing. Mi, tincidunt tortor sed purus. Urna dictumst mauris malesuada aliquam sit nullam volutpat. Tristique mattis vitae leo libero dui scelerisque quis.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography sx={{
                                textTransform: "uppercase", fontSize: "20px", fontWeight: "400", letterSpacing: "0.19rem"
                            }}>
                                international shipping</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{
                                fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876"
                            }}>
                                Nulla in faucibus praesent scelerisque neque ut tellus dolor. Auctor lorem convallis vulputate tincidunt tellus quis molestie pulvinar. Viverra ut pellentesque pulvinar erat ipsum amet pellentesque semper nunc. Vitae massa quisque gravida pellentesque ultrices nibh semper elit in. Ut velit vitae purus, ornare odio gravida nulla. Viverra et morbi sapien sapien mauris lacus adipiscing. Mi, tincidunt tortor sed purus. Urna dictumst mauris malesuada aliquam sit nullam volutpat. Tristique mattis vitae leo libero dui scelerisque quis.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography sx={{
                                textTransform: "uppercase", fontSize: "20px", fontWeight: "400", letterSpacing: "0.19rem"
                            }}>
                                cashback program </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{
                                fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876"
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4a-content"
                            id="panel4a-header"
                        >
                            <Typography sx={{
                                textTransform: "uppercase", fontSize: "20px", fontWeight: "400", letterSpacing: "0.19rem"
                            }}>
                                money back warranty</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{
                                fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876"
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Box>
        </>
    );
};

