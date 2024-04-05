import React from "react";
import { Box, Icon, Typography } from "@mui/material";
import { Typewriter } from "react-simple-typewriter";
import { cardDetail, colors } from "../constants";
import { HomeCard } from "../components";
import { TiSocialLinkedin } from "react-icons/ti";
import { TiSocialGithubCircular } from "react-icons/ti";

const HomePage = () => {
  const handleType = (count: number) => {
    // access word count number
    console.log(count);
  };

  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"100vw"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography
          variant="h3"
          sx={{
            pt: "5rem",
            margin: "auto 0",
            fontWeight: "700",
            color: "black",
            lineHeight: "5rem",
          }}
          style={{ paddingTop: "5rem", margin: "auto 0", fontWeight: "normal" }}
        >
          Welcome to our task management platform
        </Typography>
        <Typography variant="h2" color={colors.MainDarkColor}>
          <Typewriter
            cursorBlinking={false}
            cursorColor={colors.MainDarkColor}
            words={[
              "Stay organized",
              "Boost productivity",
              "Take control",
              "Achieve goals",
              "Streamline workflow",
              "Never miss deadlines",
              "Seamless collaboration",
              "Transform tasks",
              "Empower success",
            ]}
            loop={5}
            cursor
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={70}
            delaySpeed={1000}
            onLoopDone={handleDone}
            onType={handleType}
          />
        </Typography>
      </Box>

      {/* Cards  */}
      <Box
        mt={"5rem"}
        mb={"5rem"}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        {cardDetail.map((card, index) => (
          <HomeCard
            key={index}
            title={card.title}
            IconCompo={card.icon}
            content={card.content}
          />
        ))}
      </Box>

      <Box
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        gap={".5rem"}
        justifyContent={"center"}
      >
        <Icon
          sx={{
            ":hover": {
              color: "white",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
            },
            color: colors.MainDarkColor,
            fontSize: "50px",
          }}
        >
          <a
            href="https://github.com/Suhelpatel786/react-taskManagement-frontend"
            target="_blank"
          >
            <TiSocialGithubCircular />
          </a>
        </Icon>
        <Icon
          sx={{
            ":hover": {
              color: "white",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
            },
            color: colors.MainDarkColor,
            fontSize: "50px",
          }}
        >
          <a
            href="https://www.linkedin.com/in/suhel-patel-54624227b/"
            target="_blank"
          >
            <TiSocialLinkedin />
          </a>
        </Icon>
      </Box>

      <Box
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography sx={{ color: colors.MainDarkColor, fontWeight: "500" }}>
          &copy; 2024 Suhel Patel. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
