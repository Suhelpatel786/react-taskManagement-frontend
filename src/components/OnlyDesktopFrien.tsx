import { Box, Typography } from "@mui/material";
import React from "react";
import { colors } from "../constants";

const OnlyDesktopFrien = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflowY: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: colors.MainDarkColor,
          padding: "2rem",
          margin: "2rem",
          borderRadius: "10px",
        }}
      >
        <Typography fontSize={"28px"} fontWeight={"700"} color={"white"}>
          Optimized for Desktop: Enjoy the Full Experience on Larger Screens
        </Typography>
      </Box>
    </Box>
  );
};

export default OnlyDesktopFrien;
