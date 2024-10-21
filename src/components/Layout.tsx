import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { fetchAllFamilies } from "../apis/familiesApi";
import { useAppContext } from "../contexts/AppContext";

const Layout: React.FC = () => {
  const { setLoading, setFamilies } = useAppContext();

  useEffect(() => {
    const getAllFamilies = async () => {
      document.title = "Vaishnani Family";
      try {
        setLoading(true);
        const familyData = await fetchAllFamilies(); // Fetch family data from the API
        setFamilies(familyData); // Update state with the fetched data
        setLoading(false); // Mark loading as false
      } catch (err) {
        setLoading(false); // Stop loading on error
      }
    };
    getAllFamilies();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Vaishnani Family
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/add-family">
          Add Family
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Layout;
