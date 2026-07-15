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
                    navigate("/"); // Redirect to home page
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
                marginTop: "80px",
                backgroundColor: "var(--es-background)"
            }}
        >
            <Box
                sx={{
                    background: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(20px)",
                    padding: { xs: "30px", sm: "50px" },
                    maxWidth: "420px",
                    width: "100%",
                    borderRadius: "var(--es-radius-lg)",
                    boxShadow: "var(--es-shadow-lg)",
                    border: "1px solid var(--es-charcoal-10)"
                }}
            >
                {/* Logo */}
                <Box sx={{ textAlign: "center", marginBottom: "30px" }}>
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontFamily: "var(--font-serif)",
                            letterSpacing: "0.2em",
                            textTransform: "lowercase",
                            color: "var(--es-charcoal)",
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
                        marginBottom: "10px",
                        fontFamily: "var(--font-serif)",
                        fontSize: "26px",
                        color: "var(--es-charcoal)",
                        fontWeight: "600"
                    }}
                >
                    Welcome Back
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        marginBottom: "30px",
                        color: "var(--es-charcoal-60)",
                        fontSize: "13.5px",
                        fontFamily: "var(--font-sans)"
                    }}
                >
                    Sign in to continue to your account
                </Typography>

                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            marginBottom: "20px",
                            borderRadius: "10px"
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
                                    <PhoneIcon sx={{ color: "var(--es-emerald)" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            marginBottom: "20px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                "&:hover fieldset": {
                                    borderColor: "var(--es-emerald)"
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "var(--es-emerald)"
                                }
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "var(--es-emerald)"
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
                                    <LockIcon sx={{ color: "var(--es-emerald)" }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        sx={{ color: "var(--es-emerald)" }}
                                    >
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            marginBottom: "30px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                "&:hover fieldset": {
                                    borderColor: "var(--es-emerald)"
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "var(--es-emerald)"
                                }
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "var(--es-emerald)"
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
                            fontSize: "14px",
                            fontWeight: "600",
                            letterSpacing: "0.08em",
                            borderRadius: "30px",
                            background: "linear-gradient(135deg, var(--es-emerald) 0%, var(--es-emerald-soft) 100%)",
                            boxShadow: "0 6px 20px rgba(15, 93, 78, 0.15)",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                                background: "linear-gradient(135deg, var(--es-emerald-soft) 0%, var(--es-emerald) 100%)",
                                transform: "translateY(-1px)",
                                boxShadow: "0 8px 24px rgba(15, 93, 78, 0.25)"
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
                        color: "var(--es-charcoal-60)",
                        fontFamily: "var(--font-sans)"
                    }}
                >
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        style={{
                            color: "var(--es-emerald)",
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
