import React from 'react'
import productimage from "../../assets/productbg.webp"
import { Box } from '@mui/material'
function LegalInfo() {
    return (
        <>
            <Box sx={{
                width: "100%", height: "60vh", backgroundImage: `url(${productimage})`, display: "flex", justifyContent: "center",
                alignItems: "center", flexDirection: "column", position: "absolute"
            }}></Box>
            <Box sx={{ width: "80%", height: "350vh", backgroundColor: "white", display: "flex", justifyContent: "center", position: "relative", margin: "15% 0 0 10%", textAlign: "center", marginBottom: "60px" }}>
                <Box sx={{ width: "54%", display: "flex", justifyContent: "center", flexDirection: "column" }} >
                    <h1 style={{ textTransform: "uppercase", fontWeight: "400", fontSize: "45px", letterSpacing: ".2em" }}>privacy Policy</h1>
                    <p style={{ textTransform: "uppercase", fontWeight: "200", fontSize: "35px", letterSpacing: ".2em" }}>who we are</p>
                    <span style={{ fontSize: "18px", opacity: "0.9", fontWeight: "200", textAlign: "left" }}>
                        Our website address is :https://localhost.5173/.
                    </span>
                    <p style={{ textTransform: "uppercase", fontWeight: "200", fontSize: "35px", letterSpacing: ".2em" }}>what personal data we collect</p>
                    <div style={{ textAlign: "left", width: "110%" }}>
                        <h2 style={{ textTransform: "uppercase", fontWeight: "500", fontSize: "20px", letterSpacing: ".2em", margin: "40px 0 40px 0 " }}>comments</h2>
                        <p style={{ fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876" }}>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.</p>
                        <p style={{ fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876" }}>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p>
                    </div>
                    <div style={{ textAlign: "left", width: "110%" }}>
                        <h2 style={{ textTransform: "uppercase", fontWeight: "500", fontSize: "20px", letterSpacing: ".2em", margin: "40px 0 40px 0 " }}>media</h2>
                        <p style={{ fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876" }}>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p>
                    </div>
                    <div style={{ textAlign: "left", width: "110%" }}>
                        <h2 style={{ textTransform: "uppercase", fontWeight: "500", fontSize: "20px", letterSpacing: ".2em", margin: "40px 0 40px 0 " }}>cookies</h2>
                        <p style={{ fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876" }}>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p>
                        <p style={{ fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876" }}>
                            If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>
                        <p style={{ fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876" }}>
                            When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed. </p>
                        <p style={{ fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876" }}>
                            If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
                        </p>
                    </div>
                    <div style={{ textAlign: "left", width: "110%" }}>
                        <h2 style={{ textTransform: "uppercase", fontWeight: "500", fontSize: "20px", letterSpacing: ".2em", margin: "40px 0 40px 0 " }}>EMBEDDED CONTENT FROM OTHER WEBSITES</h2>
                        <p style={{ fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876" }}>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>
                    </div>
                    <p style={{ textTransform: "uppercase", fontWeight: "500", textAlign: "left", letterSpacing: "0.015em", fontSize: "16px" }}>IF YOU LEAVE A COMMENT, THE COMMENT AND ITS METADATA ARE RETAINED INDEFINITELY. THIS IS SO WE CAN RECOGNIZE AND APPROVE ANY FOLLOW-UP COMMENTS AUTOMATICALLY INSTEAD OF HOLDING THEM IN A MODERATION QUEUE.</p>
                    <p style={{ fontSize: "16px", opacity: "0.9", fontWeight: "200", lineHeight: "1.876", textAlign: "left" }}>
                        For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
                    </p>
                </Box>
            </Box>

        </>
    )
}

export default LegalInfo
