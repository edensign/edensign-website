/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import API from "../../../apis";

const validationSchema = Yup.object({
    username: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
    contact_no: Yup.string()
        .required("Contact number is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be at least 10 digits"),
    email: Yup.string()
        .email("Invalid email address"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match")
});

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            contact_no: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setError("");
            setSuccess("");

            try {
                const { confirmPassword, ...registerData } = values;
                const response = await API.CustomerAPI.register(registerData);

                if (response.status === "Success") {
                    API.CustomerAPI.saveAuth(response.data.token, response.data.customer);
                    setSuccess("Registration successful! Redirecting...");
                    setTimeout(() => {
                        navigate(-1); // Go back to previous page
                    }, 1500);
                } else {
                    setError(response.data || "Registration failed");
                }
            } catch (err) {
                console.error("Registration error:", err);
                setError(err.response?.data?.data || "Registration failed. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    });

    const inputStyles = {
        marginBottom: "18px",
        "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "&:hover fieldset": {
                borderColor: "#c7956c"
            },
            "&.Mui-focused fieldset": {
                borderColor: "#c7956c"
            }
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#c7956c"
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "calc(100vh - 200px)",
                padding: "40px 20px",
                marginTop: "80px"
            }}
        >
            <Box
                sx={{
                    background: "rgba(253, 251, 250, 0.95)",
                    backdropFilter: "blur(16px)",
                    padding: { xs: "30px", sm: "40px" },
                    maxWidth: "450px",
                    width: "100%",
                    borderRadius: "24px",
                    boxShadow: "0 12px 40px rgba(26, 10, 0, 0.08)",
                    border: "1px solid rgba(199, 149, 108, 0.15)"
                }}
            >
                {/* Logo */}
                <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontFamily: "Playfair Display, serif",
                            letterSpacing: "0.2em",
                            textTransform: "lowercase",
                            color: "#1a0f08",
                            fontWeight: "700"
                        }}
                    >
                        edensign
                    </Typography>
                </Box>

                <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                        textAlign: "center",
                        marginBottom: "8px",
                        fontFamily: "Playfair Display, serif",
                        fontSize: "24px",
                        color: "#1a0f08",
                        fontWeight: "600"
                    }}
                >
                    Create Account
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        marginBottom: "25px",
                        color: "#6b5749",
                        fontSize: "13.5px",
                        fontFamily: "Inter, sans-serif"
                    }}
                >
                    Register to book appointments
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ marginBottom: "18px", borderRadius: "10px" }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ marginBottom: "18px", borderRadius: "10px" }}>
                        {success}
                    </Alert>
                )}

                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Full Name"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        disabled={loading}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon sx={{ color: "#c7956c", fontSize: "20px" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={inputStyles}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Contact Number"
                        name="contact_no"
                        type="tel"
                        value={formik.values.contact_no}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contact_no && Boolean(formik.errors.contact_no)}
                        helperText={formik.touched.contact_no && formik.errors.contact_no}
                        disabled={loading}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon sx={{ color: "#c7956c", fontSize: "20px" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={inputStyles}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Email (Optional)"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        disabled={loading}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon sx={{ color: "#c7956c", fontSize: "20px" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={inputStyles}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        disabled={loading}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: "#c7956c", fontSize: "20px" }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        size="small"
                                        sx={{ color: "#c7956c" }}
                                    >
                                        {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={inputStyles}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        disabled={loading}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: "#c7956c", fontSize: "20px" }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                        size="small"
                                        sx={{ color: "#c7956c" }}
                                    >
                                        {showConfirmPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ ...inputStyles, marginBottom: "25px" }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            padding: "12px",
                            fontSize: "14px",
                            fontWeight: "600",
                            letterSpacing: "0.08em",
                            borderRadius: "30px",
                            background: "linear-gradient(135deg, #1a0a00 0%, #3d1e0a 100%)",
                            boxShadow: "0 6px 20px rgba(26, 10, 0, 0.15)",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                                background: "linear-gradient(135deg, #c7956c, #a8724d)",
                                transform: "translateY(-1px)",
                                boxShadow: "0 8px 24px rgba(199, 149, 108, 0.3)"
                            },
                            "&:disabled": {
                                background: "#ccc"
                            }
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "REGISTER"}
                    </Button>
                </form>

                <Typography
                    sx={{
                        textAlign: "center",
                        marginTop: "20px",
                        fontSize: "14px",
                        color: "#6b5749",
                        fontFamily: "Inter, sans-serif"
                    }}
                >
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        style={{
                            color: "#c7956c",
                            textDecoration: "none",
                            fontWeight: "600"
                        }}
                    >
                        Login
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Register;
