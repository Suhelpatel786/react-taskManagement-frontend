import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { colors } from "../constants";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { BsArrowsFullscreen } from "react-icons/bs";

interface TaskCardProps {
  title: string;
  content: string;
  time: string;
  id: string | number;
  onClickFunction?: any;
  handleClickOpen?: any;
}

interface TaskDetailModalProps {
  handleClose: any;
  open: boolean;
  task: any;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const TaskDetailModal = ({ handleClose, open, task }: TaskDetailModalProps) => {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <Box minWidth={"400px"}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {task?.title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <ImCancelCircle />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>{task?.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Box>
    </BootstrapDialog>
  );
};

// Task card component
const TaskCard: React.FC<TaskCardProps> = ({
  time,
  title,
  content,
  onClickFunction,
  handleClickOpen,
}) => {
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
      <Box display={"flex"} width={"100%"} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            ":hover": { backgroundColor: "white" },
            mr: "1rem",
          }}
          onClick={() => handleClickOpen(title, content)}
        >
          <BsArrowsFullscreen fontSize={"25px"} color={colors.MainDarkColor} />
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            ":hover": { backgroundColor: "white" },
          }}
          onClick={() => onClickFunction()}
        >
          <AiOutlineDelete fontSize={"25px"} color={colors.MainDarkColor} />
        </Button>
      </Box>
      <div>
        {title?.length >= 20 ? title?.substring(0, 20) + "...." : title}
      </div>
      <div>
        {content?.length >= 120
          ? content?.substring(0, 120) + "....."
          : content}
      </div>
      <Box display="flex" width="100%" justifyContent="flex-end">
        {time}
      </Box>
    </Box>
  );
};

const TaskStatusDragDrop: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [dataForModal, setDataForModal] = useState<any>({
    title: "",
    content: "",
  });

  const handleClickOpen = (title: String, content: String) => {
    setDataForModal({ title: title, content: content });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [todoList, setTodoList] = useState<TaskCardProps[]>([
    // { title: "Task 1", content: "Task 1 content.....", time: "21:05", id: "1" },
    // { title: "Task 2", content: "Task 2 content.....", time: "21:10", id: "2" },
    // { title: "Task 3", content: "Task 3 content.....", time: "21:15", id: "3" },
  ]);

  const [inProgressList, setInProgressList] = useState<TaskCardProps[]>([]);

  const [completedList, setCompletedList] = useState<TaskCardProps[]>([]);

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

  const deleteTask = async (id: any) => {
    const jsonText: any = localStorage.getItem("user");
    const data: any = JSON.parse(jsonText);

    try {
      const deleteTask = await axios.delete(
        `http://localhost:3000/delete/task/${id}`
      );

      getTodoTasks();

      console.log(deleteTask.data?.data);
    } catch (error) {
      console.log("DELETE TASK API", error);
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
                        <TaskCard
                          {...task}
                          onClickFunction={() => deleteTask(task?.id)}
                          handleClickOpen={handleClickOpen}
                        />
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

      <TaskDetailModal
        open={open}
        task={dataForModal}
        handleClose={handleClose}
      />
      <ToastContainer />
    </DragDropContext>
  );
};

export default TaskStatusDragDrop;
