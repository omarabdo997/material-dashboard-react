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
import { addUser, editUser } from "../../../utils/API";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { getAllCarsApi, endPoint } from "utils/API";
import { getUserData } from "utils/helpers";
import { connect } from "react-redux";
import {
  handleAddUser,
  handleUpdateUser,
  handleClearMessage,
  handleRecieveUsers,
} from "../../../actions";

const Input = styled("input")({
  display: "none",
});

function Cover(props) {
  const { messages, dispatch, edit, user, onSubmit } = props;
  const loggedUser = getUserData();
  console.log("the passed user is", user);
  const levels = { Admin: 1, "Desk Operator": 2, "Car Operator": 3 };
  const levelsR = { 1: "Admin", 2: "Desk Operator", 3: "Car Operator" };
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [myPassword, setMyPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [position, setPosition] = useState(user?.position || "");
  const [info, setInfo] = useState(user?.info || "");
  const [level, setLevel] = useState(levelsR[user?.level || 2]);
  const [errorMessageName, setErrorMessageName] = useState("");
  const [errorMessagePhone, setErrorMessagePhone] = useState("");
  const [errorMessagePosition, setErrorMessagePosition] = useState("");
  const [errorMessageInfo, setErrorMessageInfo] = useState("");
  const [errorMessageLevel, setErrorMessageLevel] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [image, setImage] = useState(undefined);
  const [imageSrc, setImageSrc] = useState(user?.imageUrl ? endPoint + user?.imageUrl : "");
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(user?.car?.plateNumber || "No Option");
  const [carsSearch, setCarsSearch] = useState("");

  console.log("cars state", cars);
  useEffect(() => {
    const searchWord = carsSearch;
    setTimeout(async () => {
      if (searchWord === carsSearch) {
        const cars = await getAllCarsApi(1, carsSearch);
        console.log("cars are", cars);
        let carsNew = [];
        if (cars?.cars) {
          carsNew = cars?.cars.map((car) => car?.plateNumber);
          carsNew.push("No Option");
          setCars(carsNew);
          return;
        }
        carsNew.push("No Option");
        setCars(carsNew);
      }
    }, 300);
  }, [carsSearch]);

  useEffect(() => {
    if (messages?.userSuccess) {
      if (!edit) {
        setSuccessMessage(messages?.userSuccess);
        setName("");
        setPhone("");
        setPosition("");
        setInfo("");
        setLevel("Desk Operator");
        setCar("No Option");
        setEmail("");
        setMyPassword("");
        setPassword("");
        setConfirmPassword("");
        setImage(undefined);
        setImageSrc("");
      } else {
        setSuccessMessage(messages?.userSuccess);
        setName("");
        setPhone("");
        setPosition("");
        setInfo("");
        setLevel("Desk Operator");
        setCar("No Option");
        setEmail("");
        setMyPassword("");
        setPassword("");
        setConfirmPassword("");
        setImage(undefined);
        setImageSrc("");
        onSubmit();
      }
    } else {
      if (messages?.userValidators) {
        for (let validator of messages?.userValidators) {
          setErrorMessages(validator.msg, validator.param);
        }
      } else {
        setErrorMessages(messages?.userError);
      }
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      console.log("cleaning up...");
      dispatch(handleClearMessage());
    };
  }, []);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessagePassword("Passwords mismatch!");
      setErrorMessageConfirmPassword("Passwords mismatch!");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("email", email);
    formData.append("myPassword", myPassword);
    password && formData.append("password", password);
    formData.append("phone", phone);
    formData.append("position", position);
    formData.append("info", info);
    formData.append("level", levels[level]);
    console.log("the car is", car);
    car !== "No Option" && formData.append("carId", car);
    if (edit) {
      dispatch(handleUpdateUser(formData, user?.id));
    } else {
      dispatch(handleAddUser(formData));
    }

    setSuccessMessage("");
    setErrorMessageName("");
    setErrorMessagePhone("");
    setErrorMessagePosition("");
    setErrorMessageInfo("");
    setErrorMessageLevel("");
    setErrorMessageEmail("");
    setErrorMessagePassword("");
    setErrorMessageConfirmPassword("");
    setErrorMessage("");
  };
  if (!edit) {
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
                <label htmlFor="icon-button-file">
                  <Stack direction="row" spacing={2}>
                    <Avatar src={imageSrc} sx={{ width: 100, height: 100 }} />
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={handleImageUpload}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      sx={{ color: "#2196f3" }}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </Stack>
                </label>
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Name"
                  variant="standard"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
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
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
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
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
                  {errorMessagePassword}
                </Typography>
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Confirm Password"
                  variant="standard"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
                  {errorMessageConfirmPassword}
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
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
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
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
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
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
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
                  size="middle"
                  sx={{ width: "200px" }}
                  renderInput={(params) => <MDInput {...params} label="User Type" />}
                />
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
                  {errorMessageLevel}
                </Typography>
              </MDBox>
              <MDBox mb={2}>
                <Autocomplete
                  disableClearable
                  options={cars}
                  onChange={(event, newValue) => {
                    setCar(newValue);
                  }}
                  // defaultValue={cars?.length > 0 ? cars[0] : ""}
                  size="middle"
                  sx={{ width: "200px" }}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Car Plate Number"
                      onChange={(e) => setCarsSearch(e.target.value)}
                    />
                  )}
                />
                {/* <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
                  {errorMessageLevel}
                </Typography> */}
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                  Add User
                </MDButton>
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
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
  } else {
    return (
      <div style={{ padding: "30px" }}>
        <Card p={2}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={3}
            p={3}
            mb={1}
            textAlign="center"
            mx={{ width: "350px" }}
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Edit User
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Please fill out the following fields
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <label htmlFor="icon-button-file">
                  <Stack direction="row" spacing={2}>
                    <Avatar src={imageSrc} sx={{ width: 100, height: 100 }} />
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={handleImageUpload}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      sx={{ color: "#2196f3" }}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </Stack>
                </label>
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Name"
                  variant="standard"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
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
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
                  {errorMessageEmail}
                </Typography>
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="My Current Password (if changing the password)"
                  variant="standard"
                  fullWidth
                  value={myPassword}
                  onChange={(e) => setMyPassword(e.target.value)}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password(optional)"
                  variant="standard"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
                  {errorMessagePassword}
                </Typography>
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Confirm Password"
                  variant="standard"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
                  {errorMessageConfirmPassword}
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
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
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
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
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
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
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
                  defaultValue={level}
                  disabled={user?.id == loggedUser.id || loggedUser?.level != 1}
                  size="middle"
                  sx={{ width: "200px" }}
                  renderInput={(params) => <MDInput {...params} label="User Type" />}
                />
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
                  {errorMessageLevel}
                </Typography>
              </MDBox>
              <MDBox mb={2}>
                <Autocomplete
                  disableClearable
                  options={cars}
                  onChange={(event, newValue) => {
                    setCar(newValue);
                  }}
                  defaultValue={car}
                  disabled={loggedUser?.level != 1}
                  size="middle"
                  sx={{ width: "200px" }}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Car Plate Number"
                      onChange={(e) => setCarsSearch(e.target.value)}
                    />
                  )}
                />
                {/* <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
                  {errorMessageCar}
                </Typography> */}
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                  Edit User
                </MDButton>
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
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
      </div>
    );
  }
}

const stateToProps = ({ messages }, { edit, user, onSubmit }) => {
  return { messages, edit, user, onSubmit };
};
export default connect(stateToProps)(Cover);
