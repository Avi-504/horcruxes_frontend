import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import { signin, signup } from "../../actions/auth";
import Input from "./Input";
// import { Icon } from "./icon";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles";

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  // signup or signin
  const [isSignup, setIsSignup] = useState(false);

  // form data (match name with input name inside the form)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // password visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // switch between signup and signin
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  // google login
  const googleSuccess = async (res) => {
    const result = jwt_decode(res?.credential);
    const token = res?.credential;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      // redirect to home page
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // if google login fails
  const googleFailure = (err) => {
    console.log(err);
    console.log("Google Sign In was unsuccessful. Try again later");
  };
  // if we want to setup custom button for login
  // const login = useGoogleLogin({
  //   onSuccess: (response) => {
  //     console.log(response);
  //   },
  //   onFailure: (error) => {
  //     console.log(error);
  //     console.log("Google Sign In was unsuccessful. Try again later");
  //   },
  //   flow: "auth-code",
  //   // clientId: "652530584405-ujc9apjcdgpd9k2pge652dc4cnv6cei2.apps.googleusercontent.com",
  // });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "SignUp" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                {/* name attribute of Input should match formData attributes for handleChange to work */}
                {/* if isSignup is true then show first name and last name */}
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {/*if isSignup is true then show confirm password*/}
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            <Button
              type="submit"
              className={classes.submit}
              color="primary"
              fullWidth
              variant="contained"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <Grid container justifyContent="space-evenly">
              <GoogleLogin
                onSuccess={googleSuccess}
                onError={googleFailure}
                shape="pill"
                size="large"
                logo_alignment="center"
                useOneTap
                theme="outline"
                // cookiePolicy="single_host_origin"
              />
            </Grid>
            {/* <Button
              className={classes.googleButton}
              color="primary"
              fullWidth
              onClick={login}
              variant="contained"
              startIcon={<Icon />}
            >
              Google Sign In
            </Button> */}
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account ? Sign In"
                  : "Don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
