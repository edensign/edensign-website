
import { useState, useEffect } from "react";
import { Formik } from 'formik';
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { useToast } from "../../common/Toast";

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

import flowerimage from "../../assets/flower.png";
import { ContactAPI } from "../../../apis/ContactAPI";

import { SkeletonStyles, ContactPageSkeleton } from "../../common/PageSkeletons";

const initialValues = {
  name: '',
  email: '',
  message: '',
};

function ContactUsForm() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPageLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await ContactAPI.submitContact(values);
      if (response.status === 'Success') {
        showToast('Your message has been sent successfully!', 'success');
        resetForm();
      } else {
        showToast(response.msg || 'Something went wrong', 'error');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!pageLoaded) {
    return (
      <>
        <SkeletonStyles />
        <ContactPageSkeleton />
      </>
    );
  }

  return (
    <Box id="parent-box">
      <SkeletonStyles />

      <Box sx={{
        display: "flex", 
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center", 
        alignItems: "stretch", 
        margin: { xs: "60px auto", md: "10% auto 4% auto" },
        width: { xs: "95vw", md: "80vw" }, 
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
      }}>
        <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, 
          gap: "20px", 
          width: { xs: "100%", md: "50%" }, 
          padding: { xs: "32px 24px", md: "4% 6%" } 
        }}>
          <p style={{
            fontWeight: "400", fontSize: "26px", letterSpacing: "0.05em", textTransform: "uppercase",
            marginTop: "6px", gridColumn: "span 2"
          }}>
            eden sign </p>

          <Box>
            <p style={{ fontWeight: "600", fontSize: "11px", letterSpacing: "0.1em", color: "#c7956c", marginBottom: "4px" }}>PHONE</p>
            <p style={{ fontWeight: "300", fontSize: "15px", letterSpacing: "0.02em" }}>9897331083</p>
          </Box>
          <Box>
            <p style={{ fontWeight: "600", fontSize: "11px", letterSpacing: "0.1em", color: "#c7956c", marginBottom: "4px" }}>ADDRESS</p>
            <p style={{ fontWeight: "300", fontSize: "15px", letterSpacing: "0.02em", lineHeight: "1.5" }}>O, 44, Shastri Nagar, Izatnagar, Bareilly, Uttar Pradesh 243122</p>
          </Box>

          <Box>
            <p style={{ fontWeight: "600", fontSize: "11px", letterSpacing: "0.1em", color: "#c7956c", marginBottom: "4px" }}>EMAIL</p>
            <p style={{ fontWeight: "300", fontSize: "15px", letterSpacing: "0.02em" }}>edensign@gmail.com</p>
          </Box>
          <Box>
            <p style={{ fontWeight: "600", fontSize: "11px", letterSpacing: "0.1em", color: "#c7956c", marginBottom: "4px" }}>SOCIAL NETWORKS</p>
            <Box sx={{ width: "120px", display: "flex", justifyContent: "space-between", alignItems: "center", mt: "4px" }}>
              <FacebookOutlinedIcon sx={{ fontSize: "20px", cursor: "pointer", "&:hover": { color: "#c7956c" } }} />
              <TwitterIcon sx={{ fontSize: "20px", cursor: "pointer", "&:hover": { color: "#c7956c" } }} />
              <InstagramIcon sx={{ fontSize: "20px", cursor: "pointer", "&:hover": { color: "#c7956c" } }} />
              <YouTubeIcon sx={{ fontSize: "20px", cursor: "pointer", "&:hover": { color: "#c7956c" } }} />
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "50%" }, height: { xs: "300px", md: "auto" }, minHeight: { md: "500px" }, position: "relative" }}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112333.35766226827!2d79.33953766096158!3d28.376457597534422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a007b41b1eec35%3A0xc44ff0449ba21640!2sEden%20Signature!5e0!3m2!1sen!2sin!4v1694590873945!5m2!1sen!2sin"
            width="100%" height="100%" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </Box>
      </Box>

      <Box sx={{
        display: "flex", 
        flexDirection: { xs: "column-reverse", md: "row" },
        justifyContent: "center", 
        alignItems: "stretch", 
        margin: { xs: "40px auto 80px auto", md: "4% auto 10% auto" },
        width: { xs: "95vw", md: "80vw" }, 
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
      }}>
        <Box sx={{ width: { xs: "100%", md: "50%" }, height: { xs: "300px", md: "auto" }, position: "relative" }}>
          <img src={flowerimage} alt="flower" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>

        <Box sx={{ width: { xs: "100%", md: "50%" }, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 4 }} >
          <p style={{ width: "88%", marginBottom: "24px", fontWeight: "400", fontSize: "24px", letterSpacing: "0.05em", textTransform: "uppercase", textAlign: "center" }}>
            send your question </p>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({
              touched,
              dirty,
              errors,
              values,
              isSubmitting,
              handleSubmit,
              handleChange,
              handleBlur,
            }) => (
              <Box
                noValidate
                autoComplete="off"
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "90%", md: "84%" },
                  gap: "16px"
                }}
                onSubmit={handleSubmit}
              >
                <TextField
                  fullWidth
                  type="text"
                  variant="filled"
                  label="Name"
                  name="name"
                  autoComplete="new-name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  disabled={loading}
                />
                <TextField
                  fullWidth
                  type="text"
                  variant="filled"
                  label="Email"
                  name="email"
                  autoComplete="new-email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  disabled={loading}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  type="text"
                  variant="filled"
                  label="Your Message Here"
                  name="message"
                  autoComplete="off"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.message}
                  error={!!touched.message && !!errors.message}
                  helperText={touched.message && errors.message}
                  disabled={loading}
                />

                <Button type="submit" color='primary' variant='contained'
                  disabled={!dirty || loading}
                  sx={{
                    fontSize: "14px", letterSpacing: "0.15em", height: "50px", fontWeight: "600",
                    mt: 2, textTransform: "uppercase",
                    backgroundColor: "#1a0a00",
                    "&:hover": { backgroundColor: "#3d1e0a" }
                  }}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : "send message"}
                </Button>

              </Box>
            )}
          </Formik>
        </Box>
      </Box>



    </Box>
  )
}

export default ContactUsForm;

