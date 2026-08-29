/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

// color design tokens (kept for backward compatibility or direct imports if any)
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141b2d"
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#1f2a40",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509"
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922"
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f"
            },
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632"
            }
        } : {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0"
            },
            primary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#f2f0f0",
                500: "#141b2d",
                600: "#434957",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5"
            },
            greenAccent: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee"
            },
            redAccent: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb"
            },
            blueAccent: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#e1e2fe"
            }
        })
});

//mui Theme Settings
export const themeSettings = (mode) => {
    const gold = "#c7956c";
    const charcoal = "#1a0f08";
    const darkObsidian = "#0f0a07";
    const creamBg = "#FAF8F5";
    const sandTan = "#e2d5c5";

    return {
        palette: {
            mode: mode,
            primary: {
                main: gold,
                contrastText: mode === "dark" ? "#1a0f08" : "#ffffff",
            },
            secondary: {
                main: mode === "dark" ? sandTan : charcoal,
            },
            background: {
                default: mode === "dark" ? darkObsidian : creamBg,
                paper: mode === "dark" ? "#18120e" : "#ffffff",
            },
            text: {
                primary: mode === "dark" ? "#fdfbfa" : charcoal,
                secondary: mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#6b5749",
            },
            neutral: {
                dark: "#292929",
                main: "#666666",
                light: "#FAF6F0"
            }
        },
        typography: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12.5,
            h1: {
                fontFamily: ["Playfair Display", "serif"].join(","),
                fontSize: 42,
                fontWeight: 700,
                lineHeight: 1.2,
            },
            h2: {
                fontFamily: ["Playfair Display", "serif"].join(","),
                fontSize: 32,
                fontWeight: 600,
                lineHeight: 1.25,
            },
            h3: {
                fontFamily: ["Playfair Display", "serif"].join(","),
                fontSize: 24,
                fontWeight: 600,
                lineHeight: 1.3,
            },
            h4: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 18,
                fontWeight: 600,
                lineHeight: 1.4,
            },
            h5: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 15,
                fontWeight: 500,
                lineHeight: 1.4,
            },
            h6: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 13,
                fontWeight: 500,
                lineHeight: 1.4,
            },
            button: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.05em",
            }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: "30px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        fontWeight: 600,
                        padding: "10px 24px",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: "0 6px 20px rgba(199, 149, 108, 0.3)",
                        }
                    },
                    containedPrimary: {
                        background: "linear-gradient(135deg, #c7956c, #a8724d)",
                        color: "#ffffff",
                        "&:hover": {
                            background: "linear-gradient(135deg, #a8724d, #c7956c)",
                        }
                    }
                }
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            transition: "all 0.3s ease",
                            backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(26, 10, 0, 0.01)",
                            "& fieldset": {
                                borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(199, 149, 108, 0.25)",
                            },
                            "&:hover fieldset": {
                                borderColor: "#c7956c",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#c7956c",
                                borderWidth: "1.5px",
                            }
                        },
                        "& .MuiInputLabel-root": {
                            color: mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "#6b5749",
                            "&.Mui-focused": {
                                color: "#c7956c",
                            }
                        }
                    }
                }
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        borderRadius: "16px !important",
                        marginBottom: "12px",
                        border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(199, 149, 108, 0.15)",
                        background: mode === "dark" ? "rgba(24, 18, 14, 0.6)" : "#ffffff",
                        "&:before": {
                            display: "none"
                        },
                        boxShadow: "0 4px 20px rgba(26, 10, 0, 0.02)",
                        transition: "all 0.3s ease",
                        "&.Mui-expanded": {
                            boxShadow: "0 10px 30px rgba(199, 149, 108, 0.06)",
                            borderColor: "#c7956c",
                        }
                    }
                }
            },
            MuiAccordionSummary: {
                styleOverrides: {
                    root: {
                        borderRadius: "16px",
                        padding: "0 24px",
                        "& .MuiAccordionSummary-content": {
                            margin: "20px 0",
                        }
                    }
                }
            },
            MuiRating: {
                styleOverrides: {
                    iconFilled: {
                        color: gold,
                    },
                    iconHover: {
                        color: "#a8724d",
                    }
                }
            }
        }
    };
};

//Context for Color Mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode(prev => (prev === "light" ? "dark" : "light"));
            }
        }), []);

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
};
