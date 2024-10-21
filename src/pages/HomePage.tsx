import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Family Data Viewer
        </Typography>
        <Box sx={{ "& > *": { m: 1 } }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/"
          >
            Home
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/add-family"
          >
            Add New Family
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
