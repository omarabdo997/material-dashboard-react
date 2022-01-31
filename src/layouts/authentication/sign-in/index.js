/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import { connect } from "react-redux";
import {
  handleRecieveCars,
  handleRecieveViolations,
  handleRecieveAnalytics,
  handleRecieveViolationsCount,
  handleRecieveUsers,
} from "../../../actions";

import { signIn } from "../../../utils/API";
import { changeToken } from "../../../utils/Sockets";

import { useNavigate } from "react-router-dom";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Typography from "@mui/material/Typography";

function Basic(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const setErrorMessages = (message, type = "") => {
    if (type === "email") {
      setErrorMessageEmail(message);
    }
    if (type === "password") {
      setErrorMessagePassword(message);
    }
    if (type === "") {
      setErrorMessage(message);
    }
  };

  const handleSubmit = async () => {
    const res = await signIn(email, password);
    setErrorMessageEmail("");
    setErrorMessagePassword("");
    setErrorMessage("");
    if (res.success) {
      changeToken();
      navigate("/");
      props.dispatch(handleRecieveCars(1));
      props.dispatch(handleRecieveViolationsCount());
      props.dispatch(handleRecieveAnalytics());
      props.dispatch(handleRecieveViolations(1));
      props.dispatch(handleRecieveUsers(1));
    } else {
      if (res.validators) {
        for (let validator of res.validators) {
          setErrorMessages(validator.msg, validator.param);
        }
      } else {
        setErrorMessages(res.message);
      }
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}></Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography mt={1} variant="h6" color="error" sx={{ fontWeight: 100 }} component="h2">
                {errorMessageEmail}
              </Typography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography mt={1} variant="h6" color="error" sx={{ fontWeight: 100 }} component="h2">
                {errorMessagePassword}
              </Typography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                sign in
              </MDButton>
              <Typography mt={1} variant="h6" color="error" sx={{ fontWeight: 100 }} component="h2">
                {errorMessage}
              </Typography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}
const stateToProps = ({ cars, violations, analytics }) => {
  return { cars, violations, analytics };
};
export default connect(stateToProps)(Basic);
