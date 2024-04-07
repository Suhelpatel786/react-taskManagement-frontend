import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { colors } from "../constants";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";

interface TaskCardProps {
  title: string;
  content: string;
  time: string;
  id: string | number;
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
      p="1rem"
      m="1rem"
      color="white"
      bgcolor={colors.MainDarkColor}
      borderRadius="10px"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
    >
      <div>{title}</div>
      <div>{content}</div>
      <Box display="flex" width="100%" justifyContent="flex-end">
        {time}
      </Box>
    </Box>
  );
};

const TaskStatusDragDrop: React.FC = () => {
  const [todoList, setTodoList] = useState<TaskCardProps[]>([
    // { title: "Task 1", content: "Task 1 content.....", time: "21:05", id: "1" },
    // { title: "Task 2", content: "Task 2 content.....", time: "21:10", id: "2" },
    // { title: "Task 3", content: "Task 3 content.....", time: "21:15", id: "3" },
  ]);

  const [inProgressList, setInProgressList] = useState<TaskCardProps[]>([]);

  const [completedList, setCompletedList] = useState<TaskCardProps[]>([]);

  console.log({ todoList });

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = getList(source.droppableId);
    const destinationList = getList(destination.droppableId);
    const [removed] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, removed);

    updateLists(
      sourceList,
      destinationList,
      source.droppableId,
      destination.droppableId
    );
  };

  const getList = (droppableId: string) => {
    switch (droppableId) {
      case "todo":
        return todoList;
      case "inProgress":
        return inProgressList;
      case "completed":
        return completedList;
      default:
        return [];
    }
  };

  const updateLists = (
    sourceList: TaskCardProps[],
    destinationList: TaskCardProps[],
    sourceDroppableId: string,
    destinationDroppableId: string
  ) => {
    switch (sourceDroppableId) {
      case "todo":
        setTodoList(sourceList);
        break;
      case "inProgress":
        setInProgressList(sourceList);
        break;
      case "completed":
        setCompletedList(sourceList);
        break;
      default:
        break;
    }

    switch (destinationDroppableId) {
      case "todo":
        setTodoList(destinationList);
        break;
      case "inProgress":
        setInProgressList(destinationList);
        break;
      case "completed":
        setCompletedList(destinationList);
        break;
      default:
        break;
    }
  };

  // task status = Todo
  const getTodoTasks = async () => {
    try {
      const todoArray: any = [];
      const tasks = await axios.get("http://localhost:3000/task/TODO");
      const data = tasks.data;

      console.log(data);
      for (let i = 0; i < tasks.data?.length; i++) {
        todoArray.push({
          id: data[i]?._id,
          title: data[i]?.title,
          content: data[i]?.content,
          time: "45:12",
        });
      }

      setTodoList(todoArray);
      console.log(tasks.data);
    } catch (error: any) {
      console.log({ error });

      toast.error(error?.response?.data?.error || "Unknown error", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    getTodoTasks();
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container mt={5} spacing={2}>
        <Grid item xs={4}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Typography
              sx={{
                mr: "2.5rem",
                fontSize: "20px",
                fontWeight: "700",
                bgcolor: "white",
                px: "2rem",
                py: ".5rem",
                borderRadius: "5px",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
                color: colors.MainDarkColor,
              }}
            >
              TODO
            </Typography>
          </Box>

          <Droppable droppableId="todo">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {todoList.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id?.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard {...task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
        <Grid item xs={4}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Typography
              sx={{
                mr: "2.5rem",
                fontSize: "20px",
                fontWeight: "700",
                bgcolor: "white",
                px: "2rem",
                py: ".5rem",
                borderRadius: "5px",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
                color: colors.MainDarkColor,
              }}
            >
              In-Progress
            </Typography>
          </Box>
          <Droppable droppableId="inProgress">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {inProgressList.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id?.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard {...task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
        <Grid item xs={4}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Typography
              sx={{
                mr: "2.5rem",
                fontSize: "20px",
                fontWeight: "700",
                bgcolor: "white",
                px: "2rem",
                py: ".5rem",
                borderRadius: "5px",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
                color: colors.MainDarkColor,
              }}
            >
              Completed
            </Typography>
          </Box>
          <Droppable droppableId="completed">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {completedList.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id?.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard {...task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
      </Grid>
      <ToastContainer />
    </DragDropContext>
  );
};

export default TaskStatusDragDrop;
