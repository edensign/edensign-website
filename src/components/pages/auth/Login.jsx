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
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import API from "../../../apis";

const validationSchema = Yup.object({
    contact_no: Yup.string()
        .required("Contact number is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be at least 10 digits"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
});

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            contact_no: "",
            password: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setError("");

            try {
                const response = await API.CustomerAPI.login(values);

                if (response.status === "Success") {
                    API.CustomerAPI.saveAuth(response.data.token, response.data.customer);
                    navigate(-1); // Go back to previous page
                } else {
                    setError(response.data || "Login failed");
                }
            } catch (err) {
                console.error("Login error:", err);
                setError(err.response?.data?.data || "Login failed. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    });

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
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    padding: { xs: "30px", sm: "50px" },
                    maxWidth: "420px",
                    width: "100%",
                    borderRadius: "16px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                }}
            >
                {/* Logo */}
                <Box sx={{ textAlign: "center", marginBottom: "30px" }}>
                    <Typography
                        sx={{
                            fontSize: "28px",
                            fontFamily: "Inter, sans-serif",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "#333",
                            fontWeight: "300"
                        }}
                    >
                        EDENSIGN
                    </Typography>
                </Box>

                <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                        textAlign: "center",
                        marginBottom: "10px",
                        fontFamily: "Marcellus, serif",
                        fontSize: "24px",
                        color: "#333",
                        fontWeight: "500"
                    }}
                >
                    Welcome Back
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        marginBottom: "30px",
                        color: "#666",
                        fontSize: "14px"
                    }}
                >
                    Sign in to continue to your account
                </Typography>

                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            marginBottom: "20px",
                            borderRadius: "8px"
                        }}
                    >
                        {error}
                    </Alert>
                )}

                <form onSubmit={formik.handleSubmit}>
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
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon sx={{ color: "#888" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            marginBottom: "20px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                "&:hover fieldset": {
                                    borderColor: "#800080"
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#800080"
                                }
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#800080"
                            }
                        }}
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
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: "#888" }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        sx={{ color: "#888" }}
                                    >
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            marginBottom: "30px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                "&:hover fieldset": {
                                    borderColor: "#800080"
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#800080"
                                }
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#800080"
                            }
                        }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            padding: "14px",
                            fontSize: "15px",
                            fontWeight: "600",
                            letterSpacing: "0.1em",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, #800080 0%, #a855f7 100%)",
                            boxShadow: "0 4px 15px rgba(128, 0, 128, 0.3)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                background: "linear-gradient(135deg, #600060 0%, #9333ea 100%)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 6px 20px rgba(128, 0, 128, 0.4)"
                            },
                            "&:disabled": {
                                background: "#ccc"
                            }
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "LOGIN"}
                    </Button>
                </form>

                <Typography
                    sx={{
                        textAlign: "center",
                        marginTop: "25px",
                        fontSize: "14px",
                        color: "#666"
                    }}
                >
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        style={{
                            color: "#800080",
                            textDecoration: "none",
                            fontWeight: "600"
                        }}
                    >
                        Register
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
