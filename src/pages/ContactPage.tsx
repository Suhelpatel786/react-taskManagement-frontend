import { Box, Grid, Icon, Typography } from "@mui/material";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { colors } from "../constants";
import { CiLocationOn } from "react-icons/ci";

const ContactPage = () => {
  return (
    <Box
      mt={"5rem"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box width={"50%"} display={"flex"} justifyContent={"space-between"}>
        {/* contect text  */}
        <Box>
          <Typography
            lineHeight={"5.5rem"}
            variant="h1"
            color={colors.MainDarkColor}
            className="indie-flower-regular"
          >
            Want to <br /> Start <br />
            a new <br />
            project?
          </Typography>
        </Box>

        {/* contact credentials  */}
        <Box>
          <Box
            display={"flex"}
            sx={{
              px: "2rem",
              py: ".5rem",
              mt: "2rem",
              color: colors.MainDarkColor,
              borderRadius: "5px",
            }}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"1rem"}
          >
            <Icon sx={{ fontSize: "35px" }}>
              <AiOutlinePhone color={colors.MainDarkColor} />
            </Icon>
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "500",
              }}
            >
              +91 9723993196
            </Typography>
          </Box>

          <Box
            display={"flex"}
            sx={{
              px: "2rem",
              py: ".5rem",
              mt: "2rem",
              color: colors.MainDarkColor,
              borderRadius: "5px",
            }}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"1rem"}
          >
            <Icon sx={{ fontSize: "35px" }}>
              <CiLocationOn color={colors.MainDarkColor} />
            </Icon>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Ahmedabad - 380004, GUJRAT, INDIA.
            </Typography>
          </Box>
          <Box
            display={"flex"}
            sx={{
              px: "2rem",
              py: ".5rem",
              mt: "2rem",

              color: colors.MainDarkColor,

              borderRadius: "5px",
            }}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"1rem"}
          >
            <Icon sx={{ fontSize: "35px" }}>
              <AiOutlineMail color={colors.MainDarkColor} />
            </Icon>
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "500",
              }}
            >
              suhelpatel6356@gmail.com
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactPage;
