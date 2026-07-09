import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import productimage from "../../assets/productbg.webp";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
    margin: "12px 0",
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#c7956c', fontSize: 24 }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'var(--es-surface-container)',
    minHeight: "72px",
    borderRadius: "12px",
    border: "1px solid rgba(213, 195, 184, 0.4)",
    flexDirection: 'row',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)((({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: 'transparent',
    borderTop: '1px solid rgba(213, 195, 184, 0.3)',
})));

export default function Faq() {
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box sx={{ background: 'var(--es-background)', minHeight: '100vh', pb: 8 }}>
            <Box sx={{
                width: "100%", 
                height: "45vh", 
                backgroundImage: `url(${productimage})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: "flex", 
                justifyContent: "center",
                alignItems: "center", 
                flexDirection: "column",
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(26,10,0,0.3) 0%, rgba(26,10,0,0.7) 100%)',
                    zIndex: 1
                }
            }}>
                <Box sx={{ zIndex: 2, textAlign: 'center' }}>
                    <Typography sx={{
                        fontSize: { xs: "36px", sm: "48px" }, 
                        letterSpacing: "0.05em", 
                        color: "white", 
                        fontWeight: "600",
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        mb: 1
                    }}>FAQ</Typography>
                    <div style={{ width: '48px', height: '2px', background: 'var(--es-rose-gold)', margin: '0 auto' }} />
                </Box>
            </Box>

            <Box sx={{
                display: "flex", 
                flexDirection: "column", 
                width: "100%", 
                justifyContent: "center", 
                alignItems: "center",
                mt: 6
            }}>
                <Box sx={{
                    width: { xs: "90%", sm: "80%", md: "70%" }, 
                    maxWidth: "900px",
                    display: "flex", 
                    flexDirection: "column"
                }}>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography sx={{
                                fontSize: "13px", 
                                fontWeight: "600", 
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: 'var(--es-espresso)',
                                fontFamily: "'Inter', sans-serif"
                            }}>
                                payment methods
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{
                                fontSize: "14px", 
                                color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : '#6b5749', 
                                fontWeight: "400", 
                                lineHeight: "1.8",
                                fontFamily: "'Inter', sans-serif"
                            }}>
                                Nulla in faucibus praesent scelerisque neque ut tellus dolor. Auctor lorem convallis vulputate tincidunt tellus quis molestie pulvinar. Viverra ut pellentesque pulvinar erat ipsum amet pellentesque semper nunc. Vitae massa quisque gravida pellentesque ultrices nibh semper elit in. Ut velit vitae purus, ornare odio gravida nulla. Viverra et morbi sapien sapien mauris lacus adipiscing. Mi, tincidunt tortor sed purus. Urna dictumst mauris malesuada aliquam sit nullam volutpat. Tristique mattis vitae leo libero dui scelerisque quis.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography sx={{
                                fontSize: "13px", 
                                fontWeight: "600", 
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: 'var(--es-espresso)',
                                fontFamily: "'Inter', sans-serif"
                            }}>
                                international shipping
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{
                                fontSize: "14px", 
                                color: 'var(--es-on-surface-variant)', 
                                fontWeight: "400", 
                                lineHeight: "1.8",
                                fontFamily: "'Inter', sans-serif"
                            }}>
                                Nulla in faucibus praesent scelerisque neque ut tellus dolor. Auctor lorem convallis vulputate tincidunt tellus quis molestie pulvinar. Viverra ut pellentesque pulvinar erat ipsum amet pellentesque semper nunc. Vitae massa quisque gravida pellentesque ultrices nibh semper elit in. Ut velit vitae purus, ornare odio gravida nulla. Viverra et morbi sapien sapien mauris lacus adipiscing. Mi, tincidunt tortor sed purus. Urna dictumst mauris malesuada aliquam sit nullam volutpat. Tristique mattis vitae leo libero dui scelerisque quis.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography sx={{
                                fontSize: "13px", 
                                fontWeight: "600", 
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: 'var(--es-espresso)',
                                fontFamily: "'Inter', sans-serif"
                            }}>
                                cashback program
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{
                                fontSize: "14px", 
                                color: 'var(--es-on-surface-variant)', 
                                fontWeight: "400", 
                                lineHeight: "1.8",
                                fontFamily: "'Inter', sans-serif"
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            aria-controls="panel4a-content"
                            id="panel4a-header"
                        >
                            <Typography sx={{
                                fontSize: "13px", 
                                fontWeight: "600", 
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: 'var(--es-espresso)',
                                fontFamily: "'Inter', sans-serif"
                            }}>
                                money back warranty
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{
                                fontSize: "14px", 
                                color: 'var(--es-on-surface-variant)', 
                                fontWeight: "400", 
                                lineHeight: "1.8",
                                fontFamily: "'Inter', sans-serif"
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </Box>
    );
}
