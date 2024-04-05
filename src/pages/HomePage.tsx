import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Typewriter } from "react-simple-typewriter";
import { colors } from "../constants";
import { HomeCard } from "../components";

const HomePage = () => {
  const handleType = (count: number) => {
    // access word count number
    console.log(count);
  };

  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };

  return (
    <Box>
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
      <Box>
        <HomeCard />
      </Box>
    </Box>
  );
};

export default HomePage;
