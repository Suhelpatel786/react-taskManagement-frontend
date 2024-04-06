import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { colors } from "../constants";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface TaskCardProps {
  title: string;
  content: string;
  time: string;
  id?: any;
}

// Task card component
const TaskCard: React.FC<TaskCardProps> = ({ time, title, content }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="flex-start"
      width="400px"
      height="200px"
      p=".5rem"
      m="1rem"
      bgcolor="white"
      borderRadius="10px"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
      color={colors.MainDarkColor}
    >
      <Typography>{title}</Typography>
      <Typography>{content}</Typography>
      <Box display="flex" width="100%" justifyContent="flex-end">
        {time}
      </Box>
    </Box>
  );
};

const TaskStatusDragDrop: React.FC = () => {
  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedData: any = [...data];

      const sourseIndex = source.index;

      const [removedData] = reorderedData.splice(sourseIndex, 1);

      const destinationIndex = destination.index;

      reorderedData.splice(destinationIndex, 0, removedData);

      return setData(reorderedData);
    }
  };

  // Task data
  const tasksData: any = [
    { title: "Task 1", content: "Task 1 content.....", time: "21:05", id: 1 },
    { title: "Task 2", content: "Task 2 content.....", time: "21:10", id: 2 },
    { title: "Task 3", content: "Task 3 content.....", time: "21:15", id: 3 },
    { title: "Task 4", content: "Task 4 content.....", time: "21:20", id: 4 },
    { title: "Task 5", content: "Task 5 content.....", time: "21:25", id: 5 },
    { title: "Task 6", content: "Task 6 content.....", time: "21:30", id: 6 },
  ];

  const [data, setData] = useState<any>(tasksData);

  return (
    <DragDropContext onDragEnd={(result) => handleDragDrop(result)}>
      <Grid container mt={5} columns={3}>
        <Grid item lg={1}>
          <Droppable droppableId="ROOT" type="group" direction="vertical">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                mx="2rem"
                mt="2rem"
                sx={{ backgroundColor: "red" }}
              >
                {data.map((data: any, index: number) => (
                  <Draggable
                    draggableId={data.id.toString()}
                    key={data.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          time={data.time}
                          title={data.title}
                          content={data.content}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Grid>
        <Grid item lg={1}>
          <Droppable droppableId="ROOT1" type="group1" direction="vertical">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                mx="2rem"
                mt="2rem"
                sx={{ backgroundColor: "red" }}
              >
                {data.map((data: any, index: number) => (
                  <Draggable
                    draggableId={data.id.toString()}
                    key={data.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          time={data.time}
                          title={data.title}
                          content={data.content}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Grid>
        <Grid item lg={1}>
          <Droppable droppableId="ROOT2" type="group2" direction="vertical">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                mx="2rem"
                mt="2rem"
                sx={{ backgroundColor: "red" }}
              >
                {data.map((data: any, index: number) => (
                  <Draggable
                    draggableId={data.id.toString()}
                    key={data.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          time={data.time}
                          title={data.title}
                          content={data.content}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default TaskStatusDragDrop;
