import React from 'react'
import productimage from "../../assets/productbg.webp"
import { Box } from '@mui/material'

function LegalInfo() {
    return (
        <>
            {/* Hero */}
            <Box sx={{
                width: "100%",
                height: "45vh",
                backgroundImage: `url(${productimage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(26,10,0,0.3) 0%, rgba(26,10,0,0.7) 100%)',
                    zIndex: 1
                }
            }}>
                <Box sx={{ zIndex: 2, textAlign: 'center', px: 3 }}>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--es-rose-gold)",
                        marginBottom: "12px"
                    }}>Legal</p>
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 600,
                        fontSize: "clamp(32px, 5vw, 52px)",
                        letterSpacing: "0.02em",
                        color: "#ffffff",
                        margin: 0,
                        fontStyle: "italic"
                    }}>Privacy Policy</h1>
                    <div style={{ width: '48px', height: '2px', background: 'var(--es-rose-gold)', margin: '16px auto 0' }} />
                </Box>
            </Box>

            {/* Content */}
            <Box sx={{
                background: 'var(--es-background)',
                py: { xs: 6, md: 10 },
                px: { xs: 3, md: '10%' }
            }}>
                <Box sx={{
                    maxWidth: "860px",
                    margin: "0 auto",
                    background: "#ffffff",
                    border: "1px solid rgba(213, 195, 184, 0.5)",
                    borderRadius: "12px",
                    padding: { xs: "32px 24px", md: "56px 64px" },
                    boxShadow: "0 15px 40px rgba(127, 85, 50, 0.05)"
                }}>
                    <h2 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--es-primary)",
                        marginBottom: "8px"
                    }}>Who We Are</h2>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: "1.8",
                        color: "var(--es-on-surface-variant)",
                        marginBottom: "40px"
                    }}>
                        Our website address is: https://edensign.com/.
                    </p>

                    <hr style={{ border: "none", borderTop: "1px solid rgba(213, 195, 184, 0.4)", marginBottom: "40px" }} />

                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 600,
                        fontSize: "22px",
                        color: "var(--es-espresso)",
                        marginBottom: "24px"
                    }}>What Personal Data We Collect</h2>

                    <div style={{ marginBottom: "32px" }}>
                        <h3 style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            fontSize: "11px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--es-primary)",
                            margin: "0 0 12px 0"
                        }}>Comments</h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 400, lineHeight: "1.8", color: "var(--es-on-surface-variant)", margin: "0 0 12px 0" }}>
                            When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor's IP address and browser user agent string to help spam detection.
                        </p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 400, lineHeight: "1.8", color: "var(--es-on-surface-variant)", margin: 0 }}>
                            An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.
                        </p>
                    </div>

                    <div style={{ marginBottom: "32px" }}>
                        <h3 style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            fontSize: "11px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--es-primary)",
                            margin: "0 0 12px 0"
                        }}>Media</h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 400, lineHeight: "1.8", color: "var(--es-on-surface-variant)", margin: 0 }}>
                            If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
                        </p>
                    </div>

                    <div style={{ marginBottom: "32px" }}>
                        <h3 style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            fontSize: "11px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--es-primary)",
                            margin: "0 0 12px 0"
                        }}>Cookies</h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 400, lineHeight: "1.8", color: "var(--es-on-surface-variant)", margin: "0 0 12px 0" }}>
                            If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
                        </p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 400, lineHeight: "1.8", color: "var(--es-on-surface-variant)", margin: "0 0 12px 0" }}>
                            If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
                        </p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 400, lineHeight: "1.8", color: "var(--es-on-surface-variant)", margin: "0 0 12px 0" }}>
                            When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year.
                        </p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 400, lineHeight: "1.8", color: "var(--es-on-surface-variant)", margin: 0 }}>
                            If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
                        </p>
                    </div>

                    <div style={{ marginBottom: "32px" }}>
                        <h3 style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            fontSize: "11px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--es-primary)",
                            margin: "0 0 12px 0"
                        }}>Embedded Content From Other Websites</h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 400, lineHeight: "1.8", color: "var(--es-on-surface-variant)", margin: 0 }}>
                            Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
                        </p>
                    </div>

                    <hr style={{ border: "none", borderTop: "1px solid rgba(213, 195, 184, 0.4)", marginBottom: "32px" }} />

                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        lineHeight: "1.8",
                        letterSpacing: "0.02em",
                        color: "var(--es-on-surface-variant)",
                        margin: "0 0 24px 0"
                    }}>
                        If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.
                    </p>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: "1.8",
                        color: "var(--es-on-surface-variant)",
                        margin: 0
                    }}>
                        For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
                    </p>
                </Box>
            </Box>
        </>
    )
}

export default LegalInfo
