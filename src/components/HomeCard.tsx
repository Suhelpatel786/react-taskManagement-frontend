import { Box, Icon, Typography } from "@mui/material";
import { BiCalendarCheck } from "react-icons/bi";
import { colors } from "../constants";

interface CardProps {
  title: String;
  IconCompo: any;
  content: String;
}

const HomeCard = ({ title, IconCompo, content }: CardProps) => {
  return (
    <Box
      sx={{
        height: "350px",
        width: "350px",
        backgroundColor: colors.MainDarkColor,
        borderRadius: "1rem",
        color: "white",
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
      }}
    >
      <Box
        height={"100%"}
        width={"100%"}
        padding={"1rem"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        {/* icon */}

        <Box>
          <Icon sx={{ fontSize: "55px" }}>
            <IconCompo
              style={{
                color: "#ffffff",
              }}
            />
          </Icon>
        </Box>

        {/* title  */}
        <Box>
          <Typography fontSize={"22px"} fontWeight={"600"}>
            {title}
          </Typography>
        </Box>

        {/* content  */}
        <Box textAlign={"justify"} fontSize={"16px"} fontWeight={"500"}>
          {content}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeCard;
