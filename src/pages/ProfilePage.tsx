import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { colors } from "../constants";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";

interface DeleteAccountProps {
  open: boolean;
  handleClose: any;
  handleActionFunction: any;
}
const AlertDeleteAccountModal = ({
  open,
  handleActionFunction,
  handleClose,
}: DeleteAccountProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Account</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure? you want to{" "}
          <span style={{ fontWeight: "bold" }}>delete</span> your account
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "red" }}
          onClick={() => handleActionFunction()}
          autoFocus
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  //user credentials
  let jsonText: any = localStorage.getItem("user");
  const data: any = JSON.parse(jsonText);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const ProfileSchema = Yup.object({
    userName: Yup.string()
      .required("Please Enter your name")
      .min(3, "Must 3 character or more")
      .max(20, "Must 20 character or less"),
    email: Yup.string()
      .required("Please enter your Email")
      .matches(emailPattern, "Invalid email format"),
    password: Yup.string()
      .required("Please enter your Password")
      .min(6, "Must be 6 characters or more")
      .max(8, "Must be 8 characters or less"),
  });

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/user/update/${data?._id}`,
        {
          ...values,
        }
      );

      toast.success(response?.data?.message || "Details Updated successfully", {
        position: "top-right",
        autoClose: 10,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => {
          setIsUpdate(!isUpdate);
        },
      });

      localStorage.setItem("user", JSON.stringify(response.data?.data));

      console.log(response.data);
    } catch (error: any) {
      console.log("USER UPDATE API ", error);
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

  const deleteAccount = async () => {
    const resposen = await axios.delete(
      `http://localhost:3000/user/delete/${data?._id}`
    );

    console.log(resposen.data);

    navigate("/sign-up");
  };

  //modal hanfle function
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { errors, values, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userName: data?.userName,
      email: data?.email,
      password: data?.password,
    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => handleUpdate(),
  });

  function printStars(str: any) {
    const length = str.length;
    const stars = "*".repeat(length);
    return stars;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <Box mt={"5rem"}>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          width={"50%"}
          py={"1rem"}
          sx={{
            backgroundColor: isUpdate ? "transparent" : colors.MainDarkColor,
            borderRadius: "10px",
            boxShadow: !isUpdate
              ? "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
              : "",
          }}
        >
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            {!isUpdate && (
              <button
                className="login-button"
                style={{ marginRight: ".5rem" }}
                type="submit"
                onClick={() => setIsUpdate(!isUpdate)}
              >
                Edit Profile Details
              </button>
            )}

            {!isUpdate && (
              <button
                className="login-button"
                style={{ marginRight: ".5rem" }}
                type="submit"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            )}

            {!isUpdate && (
              <button
                className="login-button"
                style={{ marginRight: ".5rem" }}
                type="submit"
                onClick={() => handleClickOpen()}
              >
                Remove Account
              </button>
            )}
          </Box>

          {isUpdate ? (
            <Box width={"100%"} mt={"2rem"}>
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
                    name="userName"
                    value={values.userName}
                    style={{ marginBottom: "2rem" }}
                    autoComplete="off"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />

                  {touched.userName && errors.userName && (
                    <p style={{ marginTop: ".5rem" }} className="error-p">
                      {String(errors.userName)}
                    </p>
                  )}

                  <input
                    // type="email"
                    style={{ marginBottom: "2rem" }}
                    className="task-input"
                    name="email"
                    value={values.email}
                    autoComplete="off"
                    onChange={handleChange}
                    placeholder="Enter email"
                  />

                  {touched.email && errors.email ? (
                    <p style={{ marginTop: ".5rem" }} className="error-p">
                      {String(errors.email)}
                    </p>
                  ) : null}

                  <input
                    style={{ marginBottom: "2rem" }}
                    className="task-input"
                    name="password"
                    value={values.password}
                    autoComplete="off"
                    onChange={handleChange}
                    placeholder="Enter Passoword"
                  />

                  {touched.email && errors.email ? (
                    <p style={{ marginTop: ".5rem" }} className="error-p">
                      {String(errors.password)}
                    </p>
                  ) : null}

                  <Box>
                    <button
                      className="login-button"
                      style={{ marginTop: "1rem", marginRight: "1rem" }}
                      type="submit"
                    >
                      Update
                    </button>

                    <button
                      className="login-button"
                      style={{ marginTop: "1rem" }}
                      type="submit"
                      onClick={() => setIsUpdate(!isUpdate)}
                    >
                      Cancel
                    </button>
                  </Box>
                </Box>
              </form>
            </Box>
          ) : (
            <Box>
              <Box
                display={"flex"}
                sx={{
                  px: "2rem",
                  py: ".5rem",
                  mt: "2rem",
                  borderRadius: "5px",
                }}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"1rem"}
              >
                <Icon
                  sx={{ fontSize: "35px", fontWeight: 600, color: "white" }}
                >
                  <CiUser />
                </Icon>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "25px",
                    fontWeight: "500",
                  }}
                >
                  {values.userName}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                sx={{
                  px: "2rem",
                  py: ".5rem",
                  borderRadius: "5px",
                }}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"1rem"}
              >
                <Icon
                  sx={{ fontSize: "35px", fontWeight: 600, color: "white" }}
                >
                  <AiOutlineMail />
                </Icon>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "25px",
                    fontWeight: "500",
                  }}
                >
                  {values.email}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                sx={{
                  px: "2rem",
                  py: ".5rem",
                  borderRadius: "5px",
                }}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"1rem"}
              >
                <Icon
                  sx={{ fontSize: "35px", fontWeight: 600, color: "white" }}
                >
                  <RiLockPasswordLine />
                </Icon>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "25px",
                    fontWeight: "500",
                  }}
                >
                  {printStars(values.password)}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <AlertDeleteAccountModal
        open={open}
        handleActionFunction={deleteAccount}
        handleClose={handleClose}
      />
      <ToastContainer />
    </Box>
  );
};

export default ProfilePage;
