/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import { Box, Button, Checkbox, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress } from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";

import API from "../../../apis";
import appointmentImg from "../../assets/appointment.jpg"


const Booking = ({ appointmentRef, selectedService }) => {
    const navigate = useNavigate();
    const [checkIn, setCheckIn] = React.useState(dayjs(Date.now()));
    const [salonEmployee, setSalonEmployee] = React.useState([]);
    const [bookedSlots, setBookedSlots] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [bookingStatus, setBookingStatus] = React.useState({ type: '', message: '' });
    const { salon } = useSelector(state => state.salonDetail);
    const URLParams = useParams();

    const refId = React.useRef();
    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };

    // Check if customer is logged in
    const isLoggedIn = API.CustomerAPI.isLoggedIn();

    const initialValues = {
        date: checkIn,
        services: "",
        stylist: "",
        slots: "",
        else: false,
        persons: ""
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: () => { }
    });

    React.useImperativeHandle(refId, () => ({
        Submit: async () => {
            await formik.submitForm();
        }
    }));

    console.log('appointment values=>', formik.values);

    // Fetch salon employees when service changes
    useEffect(() => {
        if (formik.values.services) {
            API.SalonEmployeeAPI.getSalonEmployee({ ...URLParams, service_id: formik.values.services })
                .then(response => {
                    response.status === "Success" ?
                        setSalonEmployee(response.data)
                        :
                        setSalonEmployee([]);
                })
                .catch(error => {
                    console.error("Error fetching employees:", error);
                    setSalonEmployee([]);
                });
        }
    }, [formik.values.services]);

    // Fetch booked slots when stylist or date changes
    useEffect(() => {
        if (formik.values.stylist && checkIn) {
            const employee = salonEmployee.find(e => e.name.toLowerCase() === formik.values.stylist);
            if (employee) {
                API.AppointmentAPI.getBookedSlots({
                    employee_id: employee.id,
                    date: checkIn.format('YYYY-MM-DD')
                }).then(response => {
                    if (response.status === "Success") {
                        setBookedSlots(response.data || []);
                    } else {
                        setBookedSlots([]);
                    }
                }).catch(err => {
                    console.error("Error fetching booked slots:", err);
                    setBookedSlots([]);
                });
            }
        }
    }, [formik.values.stylist, checkIn, salonEmployee]);

    console.log("Salon employee=>", salonEmployee);

    // Set selected service from carousel
    useEffect(() => {
        formik.setFieldValue("services", selectedService);
    }, [selectedService]);

    // Handle booking submission
    const handleBookAppointment = async (e) => {
        e.preventDefault();
        setBookingStatus({ type: '', message: '' });

        // Validation
        if (!formik.values.services) {
            setBookingStatus({ type: 'error', message: 'Please select a service' });
            return;
        }
        if (!formik.values.stylist) {
            setBookingStatus({ type: 'error', message: 'Please select a stylist' });
            return;
        }
        if (!formik.values.slots) {
            setBookingStatus({ type: 'error', message: 'Please select a time slot' });
            return;
        }

        const employee = salonEmployee.find(e => e.name.toLowerCase() === formik.values.stylist);
        if (!employee) {
            setBookingStatus({ type: 'error', message: 'Invalid stylist selected' });
            return;
        }

        // Check if customer is logged in
        if (!isLoggedIn) {
            setBookingStatus({ type: 'warning', message: 'Please login to book an appointment' });
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            return;
        }

        setLoading(true);

        try {
            const response = await API.AppointmentAPI.createAppointment({
                date: checkIn.format('YYYY-MM-DD'),
                time_slot: formik.values.slots,
                services: formik.values.services.toString(),
                salon_employee: employee.id,
                booked_for: formik.values.else ? formik.values.persons : 'self'
            });

            if (response.status === "Success") {
                setBookingStatus({ type: 'success', message: 'Appointment booked successfully!' });
                // Add the booked slot to the list
                setBookedSlots(prev => [...prev, formik.values.slots]);
                // Reset the slot selection
                formik.setFieldValue("slots", "");
            } else {
                setBookingStatus({ type: 'error', message: response.data || 'Failed to book appointment' });
            }
        } catch (error) {
            console.error("Booking error:", error);
            const errorMessage = error.response?.data?.data || 'Failed to book appointment. Please try again.';
            setBookingStatus({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    };

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

                {/* Status Messages */}
                {bookingStatus.message && (
                    <Alert
                        severity={bookingStatus.type}
                        sx={{ width: "78%", marginBottom: "15px" }}
                        onClose={() => setBookingStatus({ type: '', message: '' })}
                    >
                        {bookingStatus.message}
                    </Alert>
                )}

                <form ref={refId} style={{ width: "78%" }}>
                    <Box display="flex" flexDirection="column" marginBottom="20px">
                        <span style={{ fontWeight: "500", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}> &nbsp;Date:</span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                views={['day', "month", "year"]}
                                format="DD MMMM YYYY"
                                name="date"
                                value={checkIn}
                                onChange={newCheckIn => {
                                    setCheckIn(newCheckIn);
                                    // Reset slot selection when date changes
                                    formik.setFieldValue("slots", "");
                                }}
                                minDate={dayjs()}
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
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    // Reset slot selection when stylist changes
                                    formik.setFieldValue("slots", "");
                                }}
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
                                {(() => {
                                    // Generate slots based on salon opening/closing times
                                    const generateSlotsFromSalonHours = () => {
                                        let openHour = 10; // Default 10 AM
                                        let closeHour = 18; // Default 6 PM (18:00)

                                        // Parse salon's opening_time and closing_time
                                        if (salon?.opening_time) {
                                            const openTime = dayjs(salon.opening_time);
                                            if (openTime.isValid()) {
                                                openHour = openTime.hour();
                                            }
                                        }

                                        if (salon?.closing_time) {
                                            const closeTime = dayjs(salon.closing_time);
                                            if (closeTime.isValid()) {
                                                closeHour = closeTime.hour();
                                            }
                                        }

                                        const slots = [];
                                        // Generate 1-hour slots, last slot ends before closing
                                        for (let hour = openHour; hour < closeHour; hour++) {
                                            // Format start hour
                                            const startHour12 = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
                                            const startSuffix = hour < 12 ? 'AM' : 'PM';

                                            // Format end hour
                                            const endHour24 = hour + 1;
                                            const endHour12 = endHour24 === 0 ? 12 : (endHour24 > 12 ? endHour24 - 12 : endHour24);
                                            const endSuffix = endHour24 < 12 ? 'AM' : 'PM';

                                            // Create slot string like "6:00 - 7:00 AM" or "11:00 AM - 12:00 PM"
                                            const slotStart = `${startHour12}:00`;
                                            const slotEnd = `${endHour12}:00`;

                                            // If both AM or both PM, only show suffix at end
                                            if (startSuffix === endSuffix) {
                                                slots.push(`${slotStart} - ${slotEnd} ${endSuffix}`);
                                            } else {
                                                slots.push(`${slotStart} ${startSuffix} - ${slotEnd} ${endSuffix}`);
                                            }
                                        }

                                        return slots.length > 0 ? slots : [
                                            "10:00 - 11:00 AM",
                                            "11:00 AM - 12:00 PM",
                                            "12:00 - 1:00 PM",
                                            "1:00 - 2:00 PM",
                                            "2:00 - 3:00 PM",
                                            "3:00 - 4:00 PM",
                                            "4:00 - 5:00 PM",
                                            "5:00 - 6:00 PM"
                                        ];
                                    };

                                    const slotsToRender = generateSlotsFromSalonHours();

                                    // Check if selected date is today
                                    const isToday = checkIn && dayjs().isSame(checkIn, 'day');
                                    const currentHour = dayjs().hour();
                                    const currentMinute = dayjs().minute();

                                    // Helper function to parse slot start time and check if it's passed
                                    const isSlotPassed = (slot, slotIndex) => {
                                        if (!isToday) return false;

                                        // Calculate the actual hour from salon opening time + slot index
                                        let openHour = 10;
                                        if (salon?.opening_time) {
                                            const openTime = dayjs(salon.opening_time);
                                            if (openTime.isValid()) {
                                                openHour = openTime.hour();
                                            }
                                        }
                                        const slotHour24 = openHour + slotIndex;

                                        // Compare with current time
                                        if (slotHour24 < currentHour) return true;
                                        if (slotHour24 === currentHour && currentMinute > 0) return true;
                                        return false;
                                    };

                                    return slotsToRender.map((slot, index) => {
                                        const isBooked = bookedSlots.includes(slot);
                                        const isPassed = isSlotPassed(slot, index);
                                        const isDisabled = isBooked || isPassed;

                                        let statusText = "";
                                        if (isBooked) statusText = "(Booked)";
                                        else if (isPassed) statusText = "(Passed)";

                                        return (
                                            <MenuItem value={slot} key={index} disabled={isDisabled}>
                                                {slot} {statusText}
                                            </MenuItem>
                                        );
                                    });
                                })()}
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
                                <MenuItem value="senior_citizen">Senior Citizen</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>}

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color='success'
                        id="availability-btn"
                        onClick={handleBookAppointment}
                        disabled={loading}
                        sx={{
                            borderRadius: 0, fontSize: "13px", letterSpacing: "0.2em", lineHeight: "2em", fontWeight: "600", padding: "16px", marginBottom: "19px", textTransform: "uppercase", transform: "translateY(0)", transition: "transform 1s ease"
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Book Appointment"}
                    </Button>
                </form>
            </Box>
        </Box>
    )
};

export default Booking;
