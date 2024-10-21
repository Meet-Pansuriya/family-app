import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
import { AppContextProvider } from "./contexts/AppContext";
import AddFamilyPage from "./pages/AddFamilyPage";
import FamilyDetailPage from "./pages/FamilyDetailPage";
import FilterFamiliesPage from "./pages/FilterFamiliesPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#27374D", // Dark navy for headers, buttons, and primary elements
    },
    background: {
      default: "#DDE6ED", // Light blue-gray background for the main content
      paper: "#FFFFFF", // White background for cards and tables
    },
    text: {
      primary: "#27374D", // Dark navy for primary text
      secondary: "#526D82", // Medium blue-gray for secondary text
    },
    divider: "#9DB2BF", // Light blue-gray for dividers
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#27374D", // Dark navy for headings
      marginBottom: "2px",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#27374D", // Dark navy for body text
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      color: "#526D82", // Medium blue-gray for secondary text
    },
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          backgroundColor: "#FFFFFF", // White background for the table
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#F4F6F8", // Softer light gray for text fields
          borderRadius: "8px", // Slight rounding for a modern look
          borderColor: "#9DB2BF", // Light gray-blue for border color
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#E2E8F0", // Form background is slightly darker than the page
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow for differentiation
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "16px 24px", // Generous padding for better spacing
          color: "#27374D", // Dark navy for cell text
          borderBottom: `1px solid #9DB2BF`, // Light blue-gray divider between rows
        },
        head: {
          backgroundColor: "#27374D", // Dark navy for table headers
          color: "#FFFFFF", // White text for headers
          fontWeight: "600",
          fontSize: "1rem",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#F4F7FB", // Very light gray-blue for alternating rows
          },
          "&:hover": {
            backgroundColor: "#DDE6ED", // Slightly darker hover effect
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <CssBaseline />
        <Router>
          <Layout />
          <LoadingScreen />
          <Routes>
            <Route path="/" element={<FilterFamiliesPage />} />
            <Route path="/family/:id" element={<FamilyDetailPage />} />
            <Route path="/add-family" element={<AddFamilyPage />} />
          </Routes>
        </Router>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
