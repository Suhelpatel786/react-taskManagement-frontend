import { Avatar, Box, Typography } from "@mui/material";

import { colors } from "../constants";

import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: "1rem",
        color: "#fff",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: colors.MainDarkColor,
          borderRadius: "10px",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
        }}
      >
        <Typography
          variant="body2"
          px={2}
          sx={{
            cursor: "pointer",
            margin: "1rem",
            fontSize: "18px",
            fontWeight: "600",
            color: location.pathname == "/" ? "black" : "white",
          }}
          onClick={() => navigate("/")}
        >
          Home
        </Typography>
        <Typography
          variant="body2"
          px={2}
          sx={{
            cursor: "pointer",
            margin: "1rem",
            fontSize: "18px",
            fontWeight: "600",
            color: location.pathname == "/tasks" ? "black" : "white",
          }}
          onClick={() => navigate("/tasks")}
        >
          Tasks
        </Typography>
        <Typography
          variant="body2"
          px={2}
          sx={{
            cursor: "pointer",
            margin: "1rem",
            fontSize: "18px",
            fontWeight: "600",

            color: location.pathname == "/contact" ? "black" : "white",
          }}
          onClick={() => navigate("/contact")}
        >
          Contact
        </Typography>
      </Box>

      <Box position={"absolute"} right={20} top={5}>
        <Avatar
          sx={{
            cursor: "pointer",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
          }}
          onClick={() => navigate("/profile")}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
