/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from "react";
import { Box, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";

import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";

import appointmentImg from "../../assets/appointment.jpg"


const Booking = () => {
    const addOneDay = (dateVar = new Date()) => dayjs(dateVar.setDate(dateVar.getDate() + 1));

    const [checkIn, setCheckIn] = React.useState(dayjs(Date.now()));
    const [checkOut, setCheckOut] = React.useState(addOneDay());
    const [loading, setLoading] = React.useState(false);

    const refId = React.useRef();

    const initialValues = {
        check_in: checkIn,
        check_out: checkOut,
        salons: "",
        guests: ""
    };

    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: salonValidation,
        enableReinitialize: true,
        onSubmit: () => watchForm()
    });

    React.useImperativeHandle(refId, () => ({
        Submit: async () => {
            await formik.submitForm();
        }
    }));

    const watchForm = () => {
        if (onChange) {
            onChange({
                values: formik.values,
                validated: formik.isSubmitting
                    ? Object.keys(formik.errors).length === 0
                    : false,
            });
        };
    }
    console.log(formik.values)

    return (
        //padding: "12px 50px", paddingTop: "0",
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "108vh", margin: "auto", marginBottom: "10%", position: "relative" }}>
            <Box sx={{ display: "flex", width: "75%", position: "relative", backgroundColor: "#ffffff", boxShadow: "4px 4px 6px #800080, -4px -4px 6px #800080" }}>
                <img src={appointmentImg} alt="Salon"
                    style={{
                        width: "1100px", maxWidth: "100%", aspectRatio: "1092 / 916", boxShadow: "none", border: "none", backgroundPosition: "center", backgroundSize: "cover", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", overflow: "clip"
                    }} />
            </Box>
            <Box sx={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", width: "37%", backgroundColor: "#ffffff", marginLeft: "2%", boxShadow: "4px 4px 6px #800080, -4px -4px 6px #800080"
            }}>
                <h4 style={{ width: "78%", textAlign: "center", fontWeight: "400", fontSize: "36px", fontFamily: "Marcellus, sans-serif", letterSpacing: "0.1em", lineHeight: "initial", margin: "2px 0 26px 0" }}>
                    Book Your Appointment
                </h4>
                <form ref={refId} style={{ width: "78%" }}>
                    <Box display="flex" flexDirection="column" marginBottom="20px">
                        <span style={{ fontWeight: "500", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> Check-in:</span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                views={['day', "month", "year"]}
                                format="DD MMMM YYYY"       //ex - 25 July 2023
                                name="check_in"
                                value={checkIn}
                                onChange={newCheckIn => setCheckIn(newCheckIn)}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box display="flex" flexDirection="column" marginBottom="20px">
                        <span style={{ fontWeight: "500", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> Check-out:</span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                views={['day', "month", "year"]}
                                format="DD MMMM YYYY"       //ex - 25 July 2023
                                name="check_out"
                                value={checkOut}
                                onChange={newCheckOut => setCheckOut(newCheckOut)}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box display="flex" flexDirection="column" marginBottom="20px">
                        <span style={{ fontWeight: "500", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> salons:</span>
                        <FormControl variant="filled" sx={{}}>
                            <InputLabel id="salonsField">Choose</InputLabel>
                            <Select
                                variant="filled"
                                labelId="salonsField"
                                name="salons"
                                autoComplete="new-salons"
                                onChange={formik.handleChange}
                                value={formik.values.salons}
                                error={!!formik.touched.salons && !!formik.errors.salons}
                            >
                                <MenuItem value="sunday">Sunday</MenuItem>
                                <MenuItem value="monday">Monday</MenuItem>
                                <MenuItem value="tuesday">Tuesday</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box display="flex" flexDirection="column" marginBottom="20px">
                        <span style={{ fontWeight: "500", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> guests:</span>
                        <FormControl variant="filled" sx={{}}>
                            <InputLabel id="guestsField">Adult</InputLabel>
                            <Select
                                variant="filled"
                                labelId="guestsField"
                                name="guests"
                                autoComplete="new-guests"
                                onChange={formik.handleChange}
                                value={formik.values.guests}
                                error={!!formik.touched.guests && !!formik.errors.guests}
                            >
                                <MenuItem value="children">Children</MenuItem>
                                <MenuItem value="lady">Lady</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button fullWidth type="submit" variant="contained" color='success' onClick={e => e.preventDefault()}
                        // disabled={!formik.dirty || loading}  later to be included
                        sx={{
                            borderRadius: 0, fontSize: "12px", letterSpacing: "0.2em", lineHeight: "2em", fontWeight: "600", padding: "20px", textTransform: "uppercase"
                        }}
                    >
                        {/* {loading === true ? <SignInLoader /> : "Sign In"} */}
                        availability
                    </Button>
                </form>
            </Box>
        </Box>
    )
};

export default Booking;
