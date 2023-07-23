/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useState } from 'react';
import { Formik } from "formik";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

import "./style.css";
import ValidationSchema from "./Validation";

const initialValues = {
  name: "",
  email: "",
  contact_no: ""
};

const BookAppointment = () => {
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (formData.email && formData.password) {
  //     setLoading(true);
  //     API.UserAPI.login(formData)
  //       .then(({ data: response }) => {
  //         setLoading(false);

  //         if (response.status === 'Success' &&
  //           (response.data === "User does not exist" || response.data === "Username and Password do not match")) {
  //           toastAndNavigate(dispatch, true, "info", response?.data);
  //         }
  //         else {
  //           const authInfo = {
  //             id: response.data.id,
  //             token: response.data.token,
  //             type: response.data.type,
  //             username: response.data.username
  //           };
  //           setLocalStorage("auth", authInfo);
  //           navigateTo("/");
  //         }
  //       })
  //       .catch(err => {
  //         setLoading(false);
  //         toastAndNavigate(dispatch, true, "error", err?.message);
  //       });
  //   };
  // }, [formData]);
  console.log("Formdata=>", formData);


  return (
    <Box color="azure" sx={{ background: "linear-gradient(to right, rgb(0, 34, 68), rgb(0, 86, 59))", paddingBottom: "10%" }} >

      <Container sx={{ display: "flex", justifyContent: "space-around", background: "linear-gradient(to right, #0CAFFF, #50C878)", borderRadius: "16px", width: "50%" }}>

        <Box sx={{ color: "azure", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography component="h3"> Book An Appointment </Typography>

          <Formik
            onSubmit={values => {
              setFormData(values);
            }}
            initialValues={initialValues}
            // validationSchema={ValidationSchema}
          >
            {({
              values,
              errors,
              touched,
              dirty,
              handleBlur,
              handleChange,
              handleSubmit
            }) => (
              <form onSubmit={handleSubmit} style={{ width: "80%" }}>
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  id="name"
                  label="Enter Your Name"
                  name="name"
                  type="text"
                  autoComplete="new-name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ margin: "2%", background: "hsl(0, 0%, 80%)" }}
                />
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  id="email"
                  label="Enter Your Email Address"
                  name="email"
                  type="email"
                  autoComplete="new-email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ margin: "2%", background: "hsl(0, 0%, 80%)" }}
                />
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  id="contact_no"
                  label="Enter Your Mobile Number"
                  name="contact_no"
                  type="text"
                  autoComplete="new-contact"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact_no}
                  error={!!touched.contact_no && !!errors.contact_no}
                  helperText={touched.contact_no && errors.contact_no}
                  sx={{ margin: "2%", background: "hsl(0, 0%, 80%)" }}
                />
                <Button
                  fullWidth
                  disabled={!dirty || loading}
                  id="appointment-btn"
                  type="submit"
                  variant="outlined"
                  color='info'
                  sx={{
                    mt: "2%",
                    minWidth: "200px",
                    borderRadius: 28
                  }}
                >
                  {/* {loading === true ? <SignInLoader /> : "Sign In"} */}
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Box>

        <Box sx={{ color: "azure" }}>
          {/* <TextField id="datetime-local" sx={{position: 'absolute', top:"7vh", left:"55%", background: "hsl(0, 0%, 80%)" }} label="Pick a Date" type="datetime-local" variant="filled" defaultValue="2017-05-24" /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </Box>
      </Container>

    </Box >
  )
};

export default BookAppointment;
