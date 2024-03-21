import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner: React.FC = () => {
  const spinnerStyle: React.CSSProperties = {
    margin: "100px auto",
    color: "#1976d2", // Replace with your desired color
  };

  return (
    <div style={spinnerStyle}>
      <CircularProgress size={50} thickness={5} />
    </div>
  );
};

export default Spinner;
