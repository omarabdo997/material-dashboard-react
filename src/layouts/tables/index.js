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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useEffect, useState } from "react";

import { connect } from "react-redux";

import {
  handleRecieveCars,
  handleRecieveUsers,
  handleDeleteUser,
  handleAddCar,
  handleUpdateCar,
  handleDeleteCar,
  handleShowViolations,
  handleRecieveViolations,
  handleIssueViolation,
  handleDeleteViolation,
  handleUpdateCarSpeed,
} from "../../actions";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CarDialog from "examples/Modals/CarDialog";
import UserDialog from "examples/Modals/EditUserDialog";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { getUserData } from "utils/helpers";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import usersTableData from "layouts/tables/data/usersTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import EditUserDialog from "examples/Modals/EditUserDialog";
import Validator from "validator";

function Tables(props) {
  const { violations, cars, messages, users } = props;
  const [speed, setSpeed] = useState("");
  const [errorSpeed, setErrorSpeed] = useState("");
  const [addCarDialogOpen, setAddCarDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(undefined);
  const [editCarDialogOpen, setEditCarDialogOpen] = useState("");

  const user = getUserData();

  const changeSpeed = (value) => {
    setSpeed(value);
  };

  const changeCarSpeed = () => {
    if (!Validator.isInt(speed)) {
      setErrorSpeed("The speed should be an integer number!");
      return;
    }
    setErrorSpeed("");
    props.dispatch(handleUpdateCarSpeed(speed));
  };
  const openAddCarDialog = () => {
    setAddCarDialogOpen(true);
  };

  const openEditUserDialog = (user) => {
    setEditingUser(user);
    setEditUserDialogOpen(true);
  };

  const closeEditUserDialog = () => {
    setEditUserDialogOpen(false);
  };

  const openEditCarDialog = (plateNumber) => {
    setEditCarDialogOpen(plateNumber);
  };

  const addCar = async (car) => {
    props.dispatch(handleAddCar(car));
    setAddCarDialogOpen(false);
  };
  const editCar = (car, plateNumber) => {
    props.dispatch(handleUpdateCar(car, plateNumber));
    setEditCarDialogOpen(false);
  };
  const deleteCar = (plateNumber) => {
    props.dispatch(handleDeleteCar(plateNumber));
  };
  const deleteUser = (id) => {
    props.dispatch(handleDeleteUser(id));
  };
  const recieveCars = (page) => {
    props.dispatch(handleRecieveCars(page));
  };
  const recieveUsers = (page) => {
    props.dispatch(handleRecieveUsers(page));
  };

  const searchCars = (search) => {
    props.dispatch(handleRecieveCars(1, search));
  };
  const searchUsers = (search) => {
    props.dispatch(handleRecieveUsers(1, search));
  };
  const recieveViolations = (page, type, plateNumber) => {
    props.dispatch(handleRecieveViolations(page, type, plateNumber));
  };
  const changePageViolations = (page) => {
    props.dispatch(
      handleRecieveViolations(page, violations.currentType, violations.currentPlateNumber)
    );
  };
  const deleteViolation = (id) => {
    props.dispatch(handleDeleteViolation(id));
  };
  const issueViolation = (id) => {
    props.dispatch(handleIssueViolation(id));
  };
  const showViolations = (plateNumber) => {
    props.dispatch(handleShowViolations(plateNumber));
    recieveViolations(1, violations.currentType, plateNumber);
  };
  const changeType = (type) => {
    switch (type) {
      case "Speed": {
        return recieveViolations(1, 1, violations.currentPlateNumber);
      }
      case "Distracted Driver": {
        return recieveViolations(1, 3, violations.currentPlateNumber);
      }
      default: {
        return recieveViolations(1, undefined, violations.currentPlateNumber);
      }
    }
  };
  const { columns, rows } = authorsTableData(
    cars,
    deleteCar,
    showViolations,
    openAddCarDialog,
    openEditCarDialog,
    speed,
    changeSpeed,
    errorSpeed,
    changeCarSpeed
  );
  const { columns: ucolumns, rows: urows } = usersTableData(users, deleteUser, openEditUserDialog);
  const { columns: pColumns, rows: pRows } = projectsTableData(
    violations,
    deleteViolation,
    issueViolation
  );
  console.log(ucolumns, urows);
  console.log("the cars test now are", cars?.cars);
  console.log(
    "the chosen car is",
    cars?.cars?.filter((car) => car?.plateNumber == editCarDialogOpen)[0]
  );
  return (
    <DashboardLayout>
      <CarDialog
        title={"Add Car"}
        submitText={"Add"}
        open={addCarDialogOpen}
        cancelFunction={() => setAddCarDialogOpen(false)}
        submitFunction={addCar}
      />
      <CarDialog
        title={"Edit Car"}
        submitText={"Edit"}
        open={editCarDialogOpen}
        cancelFunction={() => setEditCarDialogOpen("")}
        submitFunction={editCar}
        car={cars?.cars?.filter((car) => car?.plateNumber == editCarDialogOpen)[0]}
      />
      <EditUserDialog
        user={editingUser}
        open={editUserDialogOpen}
        closeEdit={closeEditUserDialog}
      />
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Cars Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  canSearch={false}
                  currentSearch={cars.currentSearch}
                  pageCount={Math.floor((props.cars.totalCount - 1) / 10) + 1}
                  pageNumber={cars.currentPage}
                  showTotalEntries={true}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  recieveData={recieveCars}
                  searchFunctionality={searchCars}
                  canSearch
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          {user?.level == 1 ? (
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Users Table
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: ucolumns, rows: urows }}
                    isSorted={false}
                    canSearch={false}
                    currentSearch={users.currentSearch}
                    pageCount={Math.floor((props.users.totalCount - 1) / 10) + 1}
                    pageNumber={users.currentPage}
                    showTotalEntries={true}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    recieveData={recieveUsers}
                    searchFunctionality={searchUsers}
                    canSearch
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  {violations.currentPlateNumber ? "Car " + violations.currentPlateNumber : "All"}{" "}
                  Violations
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  pageCount={Math.floor((props.violations.totalCount - 1) / 10) + 1}
                  pageNumber={violations.currentPage}
                  entriesPerPage={true}
                  showTotalEntries={false}
                  recieveData={changePageViolations}
                  changeType={changeType}
                  currentType={violations.currentType}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
const stateToProps = ({ cars, violations, messages, users }) => {
  return { cars, violations, messages, users };
};
export default connect(stateToProps)(Tables);
