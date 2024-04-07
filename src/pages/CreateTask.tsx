import { Box, Typography } from "@mui/material";
import React from "react";
import { colors } from "../constants";
import * as Yup from "yup";
import { useFormik } from "formik";
import { title } from "process";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
const CreateTask = () => {
  //title
  //content
  //priority
  //time period

  const TaskSchema = Yup.object({
    title: Yup.string()
      .required("Please insert title of your task")
      .min(3, "Must be 3 characters of more")
      .max(80, "Must be 30 characters or less"),
    content: Yup.string()
      .required("Please insert content of your task")
      .min(10, "Must be 10 characters or more")
      .max(500, "Must be 500 characters or less"),
  });

  const handleTaskSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/create/task", {
        ...values,
      });

      console.log("Response status:", response.status);
      console.log("Response data:", response.data?.data);

      // resetForm();

      toast.success(response?.data?.message || "Task created successfully", {
        position: "top-right",
        autoClose: 100,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error: any) {
      console.log("Task create API error:", error);

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

  const { errors, touched, values, handleSubmit, handleChange, resetForm } =
    useFormik({
      initialValues: {
        title: "",
        content: "",
      },
      validationSchema: TaskSchema,
      onSubmit: () => handleTaskSubmit(),
    });

  return (
    <Box>
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography
          variant="h3"
          mb={"4rem"}
          fontWeight={700}
          color={colors.MainDarkColor}
        >
          Create Task
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <input
              // type="email"
              className="task-input"
              name="title"
              onChange={handleChange}
              placeholder="Enter title"
            />

            {touched.title && errors.title ? (
              <p style={{ marginTop: ".5rem" }} className="error-p">
                {errors.title}
              </p>
            ) : null}

            <textarea
              // type="email"
              rows={5}
              style={{ marginTop: "2rem" }}
              className="task-input"
              name="content"
              onChange={handleChange}
              placeholder="Enter content"
            />

            {touched.content && errors.content ? (
              <p style={{ marginTop: ".5rem" }} className="error-p">
                {errors.content}
              </p>
            ) : null}

            {/* <select
              style={{ marginTop: "2rem" }}
              name="status"
              onChange={handleChange}
              className="task-input"
            >
              <option value={""}>Select Priority</option>
              <option value={"high"}>High Priority</option>
              <option value={"medium"}>Medium Priority</option>
              <option value={"low"}>Low Priority</option>
            </select> */}

            <button
              className="login-button"
              style={{ marginTop: "2rem" }}
              type="submit"
            >
              Create
            </button>
          </Box>
        </form>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default CreateTask;
