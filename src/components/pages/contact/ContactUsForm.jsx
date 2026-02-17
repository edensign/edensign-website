
import { useState } from "react";
import { Formik } from 'formik';
import { Box, Button, TextField, Snackbar, Alert, CircularProgress } from "@mui/material";

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

import flowerimage from "../../assets/flower.png";
import { ContactAPI } from "../../../apis/ContactAPI";

const initialValues = {
  name: '',
  email: '',
  message: '',
};

function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await ContactAPI.submitContact(values);
      if (response.status === 'Success') {
        setSnackbar({ open: true, message: 'Your message has been sent successfully!', severity: 'success' });
        resetForm();
      } else {
        setSnackbar({ open: true, message: response.msg || 'Something went wrong', severity: 'error' });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSnackbar({ open: true, message: 'Failed to send message. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box id="parent-box">

      <Box sx={{
        display: "flex", justifyContent: "center", alignItems: "center", margin: "10% auto 4% auto",
        width: "80vw", backgroundColor: "#ffffff"
      }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", width: "50%", padding: "4% 6%" }}>
          <p style={{
            fontWeight: "400", fontSize: "26px", letterSpacing: "0.05em", textTransform: "uppercase",
            marginTop: "6px", gridColumn: "span 2"
          }}>
            eden sign </p>

          <p style={{ fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em" }}>PHONE</p>
          <p style={{ fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em" }}>ADDRESS</p>

          <p style={{ fontWeight: "200", fontSize: "16px", letterSpacing: "0.05em" }}>9560648715</p>
          <p style={{ fontWeight: "200", fontSize: "16px", letterSpacing: "0.05em" }}>O, 44, Shastri Nagar, Izatnagar, Bareilly, Uttar Pradesh 243122</p>

          <p style={{ fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em" }}>EMAIL</p>
          <p style={{ fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em" }}>SOCIAL NETWORKS</p>

          <p style={{ fontWeight: "200", fontSize: "16px", letterSpacing: "0.05em" }}>edensign@gmail.com</p>
          <Box sx={{ width: "120px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <FacebookOutlinedIcon sx={{ fontSize: "20px", letterSpacing: "0.05em", "&:hover": { color: "#e4c1b1" } }} />
            <TwitterIcon sx={{ fontSize: "20px", letterSpacing: "0.05em", "&:hover": { color: "#e4c1b1" } }} />
            <InstagramIcon sx={{ fontSize: "20px", letterSpacing: "0.05em", "&:hover": { color: "#e4c1b1" } }} />
            <YouTubeIcon sx={{ fontSize: "20px", letterSpacing: "0.05em", "&:hover": { color: "#e4c1b1" } }} />
          </Box>
        </Box>

        <div style={{ width: "50%", height: "81vh", position: "relative" }}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112333.35766226827!2d79.33953766096158!3d28.376457597534422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a007b41b1eec35%3A0xc44ff0449ba21640!2sEden%20Signature!5e0!3m2!1sen!2sin!4v1694590873945!5m2!1sen!2sin"
            width="100%" height="500" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </Box>

      <Box sx={{
        display: "flex", justifyContent: "center", alignItems: "center", margin: "4% auto 10% auto",
        width: "80vw", backgroundColor: "#ffffff"
      }}>
        <Box sx={{ width: "50%", height: "86vh", position: "relative" }}>
          <img src={flowerimage} alt="flower" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>

        <Box sx={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
          <p style={{ width: "84%", margin: "46px 10px 22px 10px", fontWeight: "400", fontSize: "24px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
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
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  padding: "2% 6%",
                  '& .MuiTextField-root': { m: 1, width: '50ch', gridColumn: "span 2" }
                }}
                onSubmit={handleSubmit}
              >
                <TextField
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
                  multiline
                  rows={7}
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
                    fontSize: "14px", letterSpacing: "0.15em", lineHeight: "2em", fontWeight: "400",
                    padding: "6px 10px", margin: "8px", marginBottom: "25px", gridColumn: "span 2", textTransform: "capitalize"
                  }}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : "send"}
                </Button>

              </Box>
            )}
          </Formik>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  )
}

export default ContactUsForm;

