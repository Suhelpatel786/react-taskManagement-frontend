import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { colors } from "../constants";
import TaskStatusDragDrop from "./TaskStatusDragDrop";
import CreateTask from "./CreateTask";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TaskListPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box mt={"1.5rem"}>
      <Box mx={"2rem"} mt={"2rem"}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            sx={{
              color: colors.MainDarkColor,
              fontWeight: 600,
              fontSize: "18px",
              letterSpacing: "1px",
              // textShadow: "0px 1px 3px rgba(1, 0, 0, 1)",
            }}
            label="Create Task"
          />
          <Tab
            sx={{
              color: colors.MainDarkColor,
              letterSpacing: "1px",
              fontWeight: 600,
              fontSize: "18px",
              // textShadow: "0px 1px 3px rgba(1, 0, 0, 1)",
            }}
            label="Tasks List"
          />
        </Tabs>
      </Box>

      <Box>
        <CustomTabPanel value={value} index={0}>
          <CreateTask />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TaskStatusDragDrop />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default TaskListPage;
