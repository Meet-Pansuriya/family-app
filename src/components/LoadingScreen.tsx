import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useAppContext } from "../contexts/AppContext";

const LoadingScreen: React.FC = () => {
  const { isLoading } = useAppContext(); // Get the loading state from context

  if (!isLoading) return null; // Don't render anything if not loading

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Ensure the loading screen is on top of everything
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default LoadingScreen;
