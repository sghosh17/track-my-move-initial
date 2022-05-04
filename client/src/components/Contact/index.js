import React from "react";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import emailjs from "emailjs-com";
import "./contact.css";

require("dotenv").config();

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toastifySuccess = () => {
    toast("Form sent!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
    });
  };

  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;

    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Subject: ", subject);
    console.log("Message: ", message);

    try {
      const templateParams = {
        name,
        email,
        subject,
        message,
      };
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      );
      reset();
      toastifySuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ padding: "4em 0em" }}>
      <Typography
        variant="h6"
        gutterBottom
        className="align"
        style={{ marginBottom: "2rem" }}
      >
        Get in touch...
      </Typography>

      <form className="align" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3} style={{ width: "50vw" }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Name"
              name="name"
              {...register("name", {
                required: { value: true, message: "Enter Your Name" },
              })}
            />

            {errors.name && (
              <span className="errorMessage" style={{ color: "red" }}>
                {errors.name.message}
              </span>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Enter your Email Address"
              name="email"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
            />

            {errors.email && (
              <span className="errorMessage" style={{ color: "red" }}>
                Enter valid email
              </span>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Subject"
              name="subject"
              {...register("subject", {
                required: { value: true, message: "Enter a Subject" },
              })}
            />

            {errors.subject && (
              <span className="errorMessage" style={{ color: "red" }}>
                {errors.subject.message}
              </span>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Message"
              name="message"
              {...register("message", {
                required: { value: true, message: "Enter a Message" },
              })}
            />

            {errors.message && (
              <span className="errorMessage" style={{ color: "red" }}>
                {errors.message.message}
              </span>
            )}
          </Grid>

          <Grid item xs={12} className="align" style={{ padding: "5em 0em" }}>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Contact;
