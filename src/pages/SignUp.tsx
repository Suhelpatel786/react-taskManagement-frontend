import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { colors } from "../constants";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  const LoginValidationSchema = Yup.object({
    userName: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Please Enter your Username"),

    password: Yup.string()
      .required("Please enter your Password")
      .min(6, "Must be 6 characters or more")
      .max(8, "Must be 8 characters or less"),
    email: Yup.string()
      .required("Please enter your Email")
      .matches(emailPattern, "Invalid email format"),
  });

  const { errors, handleSubmit, handleChange, values, touched } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: (values) => handleLogin(),
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        ...values,
      });

      console.log("Response status:", response.status);
      console.log("Response data:", response.data?.message);

      toast.success(response?.data?.message || "User registered successfully", {
        position: "top-right",
        autoClose: 100,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => {
          if (response.status === 201) {
            navigate("/login");
          }
        },
      });
    } catch (error: any) {
      console.log("Sign-UP API error:", error);

      toast.error(error?.response?.data?.error || "Unknown error", {
        position: "top-right",
        autoClose: 3000,
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

  return (
    <Box
      display={"flex"}
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <form onSubmit={handleSubmit}>
        <Box
          height={"430px"}
          width={"430px"}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          p={"1rem"}
          borderRadius={"10px"}
          sx={{
            backgroundColor: colors.MainDarkColor,
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
          }}
        >
          <Box>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "25px",
                color: "white",
                letterSpacing: "1.5px",
                lineHeight: "5rem",
              }}
              variant="h1"
            >
              Sign-Up
            </Typography>
          </Box>
          <input
            // type="email"
            name="userName"
            className="login-input"
            autoComplete="off"
            onChange={handleChange}
            placeholder="Enter your Username"
          />
          {touched.userName && errors.userName ? (
            <p className="error-p">{errors.userName}</p>
          ) : null}
          <input
            // type="email"
            name="email"
            className="login-input"
            autoComplete="off"
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {touched.email && errors.email ? (
            <p className="error-p">{errors.email}</p>
          ) : null}
          <input
            name="password"
            type="password"
            autoComplete="off"
            className="login-input"
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {touched.password && errors.password ? (
            <p className="error-p">{errors.password}</p>
          ) : null}

          <button className="login-button" type="submit">
            Sign-Up
          </button>
        </Box>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default SignUp;
