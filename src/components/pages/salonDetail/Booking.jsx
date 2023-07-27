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


const Booking = () => {
    const [checkIn, setCheckIn] = React.useState(dayjs(Date.now()));
    const [checkOut, setCheckOut] = React.useState(dayjs(Date.now()));
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

        <Box sx={{ height: "auto", width: "40%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flexWrap: "wrap", border: "2px solid black", zIndex: "11", marginBottom: "10%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", padding: "6px 40px", boxShadow: "0 3px 6px #0000000F" }}>
                <h4 style={{ fontWeight: "400", fontSize: "44px", lineHeight: "1.3em", letterSpacing: "0.03em" }}>
                    Book Your Appointment
                </h4>
                <form ref={refId}>
                    <Box display="flex" flexDirection="column" marginBottom="20px">
                        <span style={{ fontWeight: "500", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> Check-in:</span>
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
                        <span style={{ fontWeight: "500", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> Check-out:</span>
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
                        <span style={{ fontWeight: "500", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> salons:</span>
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
                        <span style={{ fontWeight: "500", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> guests:</span>
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
                    <Button
                        fullWidth
                        // disabled={!formik.dirty || loading}  later to be included
                        type="submit"
                        variant="contained"
                        color='success'
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        sx={{
                            borderRadius: 0,
                            fontSize: "10px",
                            letterSpacing: "0.2em",
                            lineHeight: "2.9em",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            "&:after": {
                                backgroundColor: "#1b5e20",
                                position: "absolute",
                                left: "0",
                                top: "0",
                                height: "1px",
                                width: "100%",
                                transition: "transform .3s cubic-bezier(.4,0,.2,1)"
                            }
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
