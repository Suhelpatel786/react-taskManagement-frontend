import { Box, Typography } from "@mui/material";
const HomeCard = () => {
  return (
    <Box sx={{ height: "350px", width: "350px", backgroundColor: "red" }}>
      <Box>
        {/* <img src={Task} width={200} height={200} /> */}
        <Box>
          <Typography>Effortless Task Management</Typography>
        </Box>
        <Box>
          Stay organized and focused with our powerful task management system.
          Easily create, prioritize, and track tasks to streamline your
          workflow. Boost productivity with our intuitive interface, ensuring
          nothing falls through the cracks. Achieve your goals with ease using
          our efficient task management solution.
        </Box>
      </Box>
    </Box>
  );
};

export default HomeCard;
