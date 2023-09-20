/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useFormik } from "formik";
import { Box, Button, Checkbox, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";

import API from "../../../apis";
import appointmentImg from "../../assets/appointment.jpg"


const Booking = ({ appointmentRef }) => {
    // const addOneDay = (dateVar = new Date()) => dayjs(dateVar.setDate(dateVar.getDate() + 1));

    const [checkIn, setCheckIn] = React.useState(dayjs(Date.now()));
    const [salonEmployee, setSalonEmployee] = React.useState([]);
    const { salon } = useSelector(state => state.salonDetail);
    const URLParams = useParams();

    const refId = React.useRef();
    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };

    const initialValues = {
        date: checkIn,
        services: "",
        stylist: "",
        slots: "",
        else: false
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
    console.log(formik.values);

    useEffect(() => {
        API.SalonEmployeeAPI.getSalonEmployee({ ...URLParams, service_id: formik.values.services })
            .then(response => {
                response.status === "Success" ?
                    setSalonEmployee(response.data)
                    :
                    setSalonEmployee([]);
            })
            .catch(error => {
                throw error;
            });
    }, [formik.values.services]);
    console.log("Salon employee=>", salonEmployee)

    return (
        <Box ref={appointmentRef} sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "110vh", margin: "auto", marginBottom: "10%", position: "relative" }}>
            <Box sx={{ display: "flex", width: "75%", height: "100%", position: "relative", backgroundColor: "#ffffff", boxShadow: "4px 4px 6px #800080, -4px -4px 6px #800080" }}>
                <img src={appointmentImg} alt="Salon"
                    style={{
                        width: "1100px", maxWidth: "100%", aspectRatio: "1092 / 916", boxShadow: "none", border: "none", backgroundPosition: "center", backgroundSize: "cover", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", overflow: "clip"
                    }} />
            </Box>
            <Box sx={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflowY: "auto", height: "100%", width: "37%", backgroundColor: "#ffffff", marginLeft: "2%", boxShadow: "4px 4px 6px #800080, -4px -4px 6px #800080"
            }}>
                <h4 style={{ width: "78%", textAlign: "center", fontWeight: "400", fontSize: "36px", fontFamily: "Marcellus, sans-serif", letterSpacing: "0.1em", lineHeight: "initial", margin: formik.values.else ? "80px 0 26px 0" : "29px 0 29px 0" }}>
                    Book Your Appointment
                </h4>
                <form ref={refId} style={{ width: "78%" }}>
                    <Box display="flex" flexDirection="column" marginBottom="20px">
                        <span style={{ fontWeight: "500", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> &nbsp;Date:</span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                views={['day', "month", "year"]}
                                format="DD MMMM YYYY"       //ex - 25 July 2023
                                name="date"
                                value={checkIn}
                                onChange={newCheckIn => setCheckIn(newCheckIn)}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box display="flex" flexDirection="column" marginBottom="20px">
                        <span style={{ fontWeight: "500", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> &nbsp;Services:</span>
                        <FormControl variant="filled">
                            <InputLabel id="servicesField">Choose</InputLabel>
                            <Select
                                variant="filled"
                                labelId="servicesField"
                                name="services"
                                autoComplete="new-services"
                                onChange={formik.handleChange}
                                value={formik.values.services}
                                error={!!formik.touched.services && !!formik.errors.services}
                            >
                                {salon?.services?.map((service, index) => (
                                    <MenuItem value={service.id} key={index}>{service.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box display="flex" flexDirection="column" marginBottom="20px">
                        <span style={{ fontWeight: "500", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> &nbsp;Stylist:</span>
                        <FormControl variant="filled">
                            <InputLabel id="stylistField">Choose</InputLabel>
                            <Select
                                variant="filled"
                                labelId="stylistField"
                                name="stylist"
                                autoComplete="new-stylist"
                                onChange={formik.handleChange}
                                value={formik.values.stylist}
                                error={!!formik.touched.stylist && !!formik.errors.stylist}
                            >
                                {salonEmployee?.map((employee, index) => (
                                    <MenuItem value={employee.name.toLowerCase()} key={index}>{employee.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box display="flex" flexDirection="column" marginBottom="20px">
                        <span style={{ fontWeight: "500", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> &nbsp;Time Slots:</span>
                        <FormControl variant="filled">
                            <InputLabel id="slotsField">Choose</InputLabel>
                            <Select
                                variant="filled"
                                labelId="slotsField"
                                name="slots"
                                autoComplete="new-slots"
                                onChange={formik.handleChange}
                                value={formik.values.slots}
                                error={!!formik.touched.slots && !!formik.errors.slots}
                            >
                                <MenuItem value="12:00-1:00">12:00 - 01:00</MenuItem>
                                <MenuItem value="1:00-2:00">01:00 - 02:00</MenuItem>
                                <MenuItem value="3:00-4:00">03:00 - 04:00</MenuItem>
                                <MenuItem value="4:00-5:00">04:00 - 05:00</MenuItem>
                                <MenuItem value="5:00-7:00">05:00 - 07:00</MenuItem>
                                <MenuItem value="7:00-9:00">07:00 - 09:00</MenuItem>
                                <MenuItem value="9:00-10:00">09:00 - 10:00</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box marginBottom="10px">
                        <Checkbox {...checkboxLabel} color="default" size="small"
                            name="else"
                            checked={formik.values?.else}
                            onChange={(event, value) => formik.setFieldValue("else", value)}
                            value={formik.values.else}
                        />
                        <span style={{ paddingTop: "8px", fontSize: "11px", fontWeight: "500", lineHeight: "1.2", letterSpacing: "0.05em" }}>Book For Someone Else</span>
                    </Box>

                    {formik.values.else && <Box id="persons-box" display="flex" flexDirection="column" marginBottom="20px">
                        <span style={{ fontWeight: "500", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> &nbsp;persons:</span>
                        <FormControl variant="filled">
                            <InputLabel id="personsField">Choose</InputLabel>
                            <Select
                                variant="filled"
                                labelId="personsField"
                                name="persons"
                                autoComplete="new-persons"
                                onChange={formik.handleChange}
                                value={formik.values.persons}
                                error={!!formik.touched.persons && !!formik.errors.persons}
                            >
                                <MenuItem value="kid">Kid</MenuItem>
                                <MenuItem value="boy">Boy</MenuItem>
                                <MenuItem value="girl">Girl</MenuItem>
                                <MenuItem value="man">Man</MenuItem>
                                <MenuItem value="woman">Woman</MenuItem>
                                <MenuItem value="seniorCitizen">Senior Citizen</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>}

                    <Button fullWidth type="submit" variant="contained" color='success'
                        id="availability-btn" onClick={e => e.preventDefault()}
                        // disabled={!formik.dirty || loading}  later to be included
                        sx={{
                            borderRadius: 0, fontSize: "13px", letterSpacing: "0.2em", lineHeight: "2em", fontWeight: "600", padding: "16px", marginBottom: "19px", textTransform: "uppercase", transform: "translateY(0)", transition: "transform 1s ease"
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
