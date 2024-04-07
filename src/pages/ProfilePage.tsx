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
        <Button onClick={handleClose}>No</Button>
        <Button onClick={() => handleActionFunction()} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const ProfileSchema = Yup.object({
    name: Yup.string()
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

  const handleUpdate = () => {
    console.log(values);
  };

  const deleteAccount = async () => {
    const jsonText: any = localStorage.getItem("user");
    const data = JSON.parse(jsonText);

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
      name: "Suhel Patel",
      email: "suhel@gmail.com",
      password: "suhel@123",
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
            <button
              className="login-button"
              style={{ marginRight: ".5rem" }}
              type="submit"
              onClick={() => setIsUpdate(!isUpdate)}
            >
              {isUpdate ? "Cancel" : "Edit Profile Details"}
            </button>

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
                    name="name"
                    value={values.name}
                    style={{ marginBottom: "2rem" }}
                    autoComplete="off"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />

                  {touched.name && errors.name ? (
                    <p style={{ marginTop: ".5rem" }} className="error-p">
                      {errors.name}
                    </p>
                  ) : null}

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
                      {errors.email}
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
                      {errors.email}
                    </p>
                  ) : null}

                  <button
                    className="login-button"
                    style={{ marginTop: "1rem" }}
                    type="submit"
                  >
                    Update
                  </button>
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
                  {values.name}
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
    </Box>
  );
};

export default ProfilePage;
