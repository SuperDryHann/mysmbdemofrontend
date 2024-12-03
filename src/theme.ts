import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#398E3D", // Sets the main primary color
      dark: "#2f7d33", // Darker shade for primary
      light: "#4daf51", // Lighter shade for primary
    },
    secondary: {
      main: "#f5f5f5", // Sets the main secondary color
      dark: "#dedede", // Darker shade for secondary
      light: "#fafafa", // Lighter shade for secondary
    },
    // Customizing other palette options
    background: {
      default: "#f7f7f7", // Default background color
      paper: "#ffffff", // Background color for paper elements
    },
    text: {
      primary: "#333333", // Primary text color
      secondary: "#666666", // Secondary text color
    },
    // Additional palette customization (error, warning, info, success)
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
    allVariants: {
      textTransform: "none",
    },
    h1: {
      fontSize: "28px",
      fontWeight: 700,
    },
    // More typography customizations for different variants
  },
  spacing: 8, // Defines spacing unit, used with margin and padding
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
