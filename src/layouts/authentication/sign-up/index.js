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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { addUser } from "../../../utils/API";
import { useState } from "react";

function Cover() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [info, setInfo] = useState("");
  const [level, setLevel] = useState("Desk Operator");
  const [errorMessageName, setErrorMessageName] = useState("");
  const [errorMessagePhone, setErrorMessagePhone] = useState("");
  const [errorMessagePosition, setErrorMessagePosition] = useState("");
  const [errorMessageInfo, setErrorMessageInfo] = useState("");
  const [errorMessageLevel, setErrorMessageLevel] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const levels = { Admin: 1, "Desk Operator": 2, "Car Operator": 3 };

  const setErrorMessages = (message, type = "") => {
    if (type === "name") {
      setErrorMessageName(message);
    }
    if (type === "phone") {
      setErrorMessagePhone(message);
    }
    if (type === "position") {
      setErrorMessagePosition(message);
    }
    if (type === "info") {
      setErrorMessageInfo(message);
    }
    if (type === "level") {
      setErrorMessageLevel(message);
    }
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
    const res = await addUser(name, email, password, phone, position, info, levels[level]);
    setSuccessMessage("");
    setErrorMessageName("");
    setErrorMessagePhone("");
    setErrorMessagePosition("");
    setErrorMessageInfo("");
    setErrorMessageLevel("");
    setErrorMessageEmail("");
    setErrorMessagePassword("");
    setErrorMessage("");
    if (res.success) {
      setSuccessMessage("User was added successfully!");
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
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Add User
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Please fill out the following fields
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Typography mt={1} variant="h6" color="error" sx={{ fontWeight: 100 }} component="h2">
                {errorMessageName}
              </Typography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
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
                variant="standard"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography mt={1} variant="h6" color="error" sx={{ fontWeight: 100 }} component="h2">
                {errorMessagePassword}
              </Typography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Phone"
                variant="standard"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Typography mt={1} variant="h6" color="error" sx={{ fontWeight: 100 }} component="h2">
                {errorMessagePhone}
              </Typography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Position"
                variant="standard"
                fullWidth
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
              <Typography mt={1} variant="h6" color="error" sx={{ fontWeight: 100 }} component="h2">
                {errorMessagePosition}
              </Typography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                multiline
                rows={4}
                label="Info"
                variant="standard"
                fullWidth
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
              <Typography mt={1} variant="h6" color="error" sx={{ fontWeight: 100 }} component="h2">
                {errorMessageInfo}
              </Typography>
            </MDBox>
            <MDBox mb={2}>
              <Autocomplete
                disableClearable
                options={["Admin", "Desk Operator", "Car Operator"]}
                onChange={(event, newValue) => {
                  setLevel(newValue);
                }}
                defaultValue={"Desk Operator"}
                size="small"
                sx={{ width: "200px" }}
                renderInput={(params) => <MDInput {...params} label="User Type" />}
              />
              <Typography mt={1} variant="h6" color="error" sx={{ fontWeight: 100 }} component="h2">
                {errorMessageLevel}
              </Typography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                Add User
              </MDButton>
              <Typography mt={1} variant="h6" color="error" sx={{ fontWeight: 100 }} component="h2">
                {errorMessage}
              </Typography>
              <Typography
                mt={1}
                variant="h6"
                color="success"
                sx={{ fontWeight: 100, color: "green" }}
                component="h2"
              >
                {successMessage}
              </Typography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
