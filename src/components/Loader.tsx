import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { colors } from "../constants";

const Spinner: React.FC = () => {
  const spinnerStyle: React.CSSProperties = {
    margin: "100px auto",
    color: colors.MainDarkColor, // Replace with your desired color
  };

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      style={spinnerStyle}
    >
      <CircularProgress size={50} thickness={5} />
    </Box>
  );
};

export default Spinner;
