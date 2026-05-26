import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Typography,
    Grid,
    CircularProgress,
    IconButton,
    Autocomplete,
    FormHelperText
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import API from "../../../apis";

const phoneRegExp = /^[0-9]{10}$/;

const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name is too short!")
        .max(50, "Name is too long!")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    contact_no: Yup.string()
        .matches(phoneRegExp, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
    designation: Yup.string()
        .required("Designation is required"),
    experience: Yup.number()
        .typeError("Experience must be a number")
        .min(0, "Experience cannot be negative")
        .required("Experience is required"),
    age: Yup.number()
        .typeError("Age must be a number")
        .integer("Age must be an integer")
        .min(18, "Must be at least 18 years old")
        .max(100, "Invalid age"),
    gender: Yup.string().required("Gender is required"),
    qualification: Yup.string().required("Qualification is required")
});

const initialValues = {
    name: "",
    email: "",
    contact_no: "",
    age: "",
    gender: "",
    qualification: "",
    designation: "",
    experience: "",
    skills: [],
    hobbies: "",
    previous_employer: "",
    description: "",
    resume: null
};

const AddJobSeekerModal = ({ open, handleClose, skills = [], onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filename, setFilename] = useState("");

    const formatResumeName = (name, file) => {
        if (!name || !file) return "";
        return (
            Math.ceil(Math.random() * 100) +
            name
                .toLowerCase()
                .trim()
                .replace(/[!@#$%^&*();:'"`~`'$]/g, "")
                .replace(/\s+/g, "_") +
            "-" +
            file
                .toLowerCase()
                .trim()
                .replace(/[!@#$%^&*();:'"`~`'$]/g, "")
                .replace(/\s+/g, "_")
        );
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setError("");

            try {
                // Get skill IDs as a comma-separated string
                const skillIds = values.skills.map(s => s.id).join(",");

                let resumeFormatted = "";
                if (values.resume instanceof File && filename) {
                    resumeFormatted = formatResumeName(values.name, filename);
                }

                const payload = {
                    name: values.name,
                    email: values.email,
                    contact_no: values.contact_no,
                    age: values.age ? parseInt(values.age) : null,
                    gender: values.gender,
                    qualification: values.qualification,
                    designation: values.designation,
                    experience: values.experience.toString(),
                    skills: skillIds,
                    hobbies: values.hobbies,
                    previous_employer: values.previous_employer,
                    description: values.description,
                    resume: resumeFormatted,
                    status: "active",
                    paid: "no"
                };

                const response = await API.JobSeekerAPI.createJobSeeker(payload);

                if (response.status === "Success") {
                    formik.resetForm();
                    setFilename("");
                    onSuccess && onSuccess();
                    handleClose();
                } else {
                    setError(response.msg || "Something went wrong. Please try again.");
                }
            } catch (err) {
                console.error("Error creating job seeker profile:", err);
                setError(err.response?.data?.msg || "An error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    });

    // Custom textfield styling to match premium brand theme
    const fieldStyle = {
        mb: 2,
        "& .MuiOutlinedInput-root": {
            color: "#fff",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            "& fieldset": {
                borderColor: "rgba(199, 149, 108, 0.2)",
            },
            "&:hover fieldset": {
                borderColor: "rgba(199, 149, 108, 0.5)",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#c7956c",
            },
        },
        "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.6)",
            "&.Mui-focused": {
                color: "#c7956c",
            },
        },
        "& .MuiFormHelperText-root": {
            color: "#ff8a8a"
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                style: {
                    background: "linear-gradient(135deg, #0d0500 0%, #1a0a00 100%)",
                    border: "1px solid rgba(199, 149, 108, 0.25)",
                    borderRadius: "20px",
                    boxShadow: "0 24px 48px rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(20px)",
                    color: "#fff",
                    padding: "12px"
                }
            }}
        >
            <DialogTitle style={{ borderBottom: "1px solid rgba(199, 149, 108, 0.15)", padding: "16px 24px" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography style={{ fontFamily: "Playfair Display, serif", fontSize: "24px", color: "#fff", fontWeight: 600 }}>
                        Create Your <span style={{ color: "#c7956c" }}>Job Seeker</span> Profile
                    </Typography>
                    <IconButton onClick={handleClose} style={{ color: "rgba(255,255,255,0.6)" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent style={{ padding: "24px", maxHeight: "70vh", overflowY: "auto" }}>
                {error && (
                    <Box sx={{ mb: 3, p: 2, bgcolor: "rgba(255, 0, 0, 0.15)", border: "1px solid rgba(255, 0, 0, 0.3)", borderRadius: "10px", color: "#ff8a8a" }}>
                        {error}
                    </Box>
                )}

                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Full Name*"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                sx={fieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email Address*"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                sx={fieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Contact Number* (10 Digits)"
                                name="contact_no"
                                value={formik.values.contact_no}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.contact_no && Boolean(formik.errors.contact_no)}
                                helperText={formik.touched.contact_no && formik.errors.contact_no}
                                sx={fieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Designation / Role* (e.g. Hair Stylist)"
                                name="designation"
                                value={formik.values.designation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.designation && Boolean(formik.errors.designation)}
                                helperText={formik.touched.designation && formik.errors.designation}
                                sx={fieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Experience* (Years)"
                                name="experience"
                                value={formik.values.experience}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.experience && Boolean(formik.errors.experience)}
                                helperText={formik.touched.experience && formik.errors.experience}
                                sx={fieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Age"
                                name="age"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.age && Boolean(formik.errors.age)}
                                helperText={formik.touched.age && formik.errors.age}
                                sx={fieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth sx={fieldStyle} error={formik.touched.gender && Boolean(formik.errors.gender)}>
                                <InputLabel id="gender-select-label">Gender*</InputLabel>
                                <Select
                                    labelId="gender-select-label"
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    label="Gender*"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                backgroundColor: "#1a0a00",
                                                color: "#fff",
                                                border: "1px solid rgba(199, 149, 108, 0.25)"
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                                {formik.touched.gender && formik.errors.gender && (
                                    <FormHelperText>{formik.errors.gender}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={fieldStyle} error={formik.touched.qualification && Boolean(formik.errors.qualification)}>
                                <InputLabel id="qual-select-label">Qualification*</InputLabel>
                                <Select
                                    labelId="qual-select-label"
                                    name="qualification"
                                    value={formik.values.qualification}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    label="Qualification*"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                backgroundColor: "#1a0a00",
                                                color: "#fff",
                                                border: "1px solid rgba(199, 149, 108, 0.25)"
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="10th">High School (10th)</MenuItem>
                                    <MenuItem value="12th">Intermediate (12th)</MenuItem>
                                    <MenuItem value="graduate">Graduate</MenuItem>
                                </Select>
                                {formik.touched.qualification && formik.errors.qualification && (
                                    <FormHelperText>{formik.errors.qualification}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Previous Employer"
                                name="previous_employer"
                                value={formik.values.previous_employer}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={fieldStyle}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                options={skills}
                                getOptionLabel={(option) => option.name}
                                value={formik.values.skills}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue("skills", newValue);
                                }}
                                PaperProps={{
                                    style: {
                                        backgroundColor: "#1a0a00",
                                        color: "#fff",
                                        border: "1px solid rgba(199, 149, 108, 0.25)"
                                    }
                                }}
                                sx={{
                                    "& .MuiChip-root": {
                                        color: "#fff !important",
                                        backgroundColor: "rgba(199, 149, 108, 0.2) !important",
                                        border: "1px solid rgba(199, 149, 108, 0.4) !important",
                                        fontFamily: "Inter, sans-serif",
                                        "& .MuiChip-deleteIcon": {
                                            color: "rgba(255, 255, 255, 0.7) !important",
                                            "&:hover": {
                                                color: "#ff8a8a !important"
                                            }
                                        }
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Your Skills"
                                        placeholder="Skills"
                                        sx={fieldStyle}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Hobbies"
                                name="hobbies"
                                value={formik.values.hobbies}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={fieldStyle}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Profile Description / About Me"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={fieldStyle}
                            />
                        </Grid>

                        {/* Resume selector */}
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                flexDirection={{ xs: "column", sm: "row" }}
                                alignItems={{ xs: "stretch", sm: "center" }}
                                gap={2}
                                sx={{
                                    p: 2,
                                    border: "1px dashed rgba(199, 149, 108, 0.3)",
                                    borderRadius: "12px",
                                    backgroundColor: "rgba(255, 255, 255, 0.02)"
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<UploadFileIcon />}
                                    sx={{
                                        borderColor: "rgba(199, 149, 108, 0.4)",
                                        color: "#c7956c",
                                        "&:hover": {
                                            borderColor: "#c7956c",
                                            backgroundColor: "rgba(199, 149, 108, 0.08)"
                                        }
                                    }}
                                >
                                    Upload Resume (Optional)
                                    <input
                                        type="file"
                                        hidden
                                        accept=".pdf,.doc,.docx"
                                        onChange={(event) => {
                                            const file = event.target.files[0];
                                            if (file) {
                                                formik.setFieldValue("resume", file);
                                                setFilename(file.name);
                                            }
                                        }}
                                    />
                                </Button>
                                <Typography style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                                    {filename ? `Selected File: ${filename}` : "No file chosen (PDF, DOC up to 5MB)"}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>

            <DialogActions style={{ borderTop: "1px solid rgba(199, 149, 108, 0.15)", padding: "16px 24px", gap: "12px" }}>
                <Button
                    onClick={handleClose}
                    variant="text"
                    style={{
                        color: "rgba(255,255,255,0.7)",
                        textTransform: "none",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => formik.handleSubmit()}
                    disabled={loading}
                    variant="contained"
                    style={{
                        background: "linear-gradient(135deg, #c7956c 0%, #a8724d 100%)",
                        color: "#fff",
                        borderRadius: "100px",
                        padding: "10px 32px",
                        textTransform: "none",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        boxShadow: "0 4px 15px rgba(199, 149, 108, 0.35)",
                        transition: "all 0.2s"
                    }}
                    className="es-modal-submit-btn"
                >
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Submit Profile"}
                </Button>
            </DialogActions>

            <style>{`
                .es-modal-submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(199, 149, 108, 0.5) !important;
                }
            `}</style>
        </Dialog>
    );
};

export default AddJobSeekerModal;
