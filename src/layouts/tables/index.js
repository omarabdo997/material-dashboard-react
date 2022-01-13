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

import { useEffect } from "react";

import { connect } from "react-redux";

import {
  handleRecieveCars,
  handleDeleteCar,
  handleShowViolations,
  handleRecieveViolations,
  handleIssueViolation,
  handleDeleteViolation,
} from "../../actions";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables(props) {
  const { violations, cars } = props;
  const deleteCar = (plateNumber) => {
    props.dispatch(handleDeleteCar(plateNumber));
  };
  const recieveCars = (page) => {
    props.dispatch(handleRecieveCars(page));
  };
  const recieveViolations = (page, type) => {
    props.dispatch(handleRecieveViolations(page, type));
  };
  const deleteViolation = (id) => {
    props.dispatch(handleDeleteViolation(id));
  };
  const issueViolation = (id) => {
    props.dispatch(handleIssueViolation(id));
  };
  const showViolations = (plateNumber) => {
    props.dispatch(handleShowViolations(plateNumber));
  };
  const { columns, rows } = authorsTableData(cars, deleteCar, showViolations);
  const { columns: pColumns, rows: pRows } = projectsTableData(
    violations,
    deleteViolation,
    issueViolation
  );

  useEffect(() => {
    console.log("in effect");
    props.dispatch(handleRecieveCars(cars.currentPage));
    props.dispatch(handleRecieveViolations(violations.currentPage, violations.currentType));
  }, []);
  return (
    <DashboardLayout>
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
                  pageCount={Math.floor((props.cars.totalCount - 1) / 10) + 1}
                  pageNumber={cars.currentPage}
                  showTotalEntries={true}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  recieveData={recieveCars}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
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
                  Violations Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  pageCount={Math.floor((props.violations.totalCount - 1) / 10) + 1}
                  pageNumber={violations.currentPage}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  recieveData={recieveViolations}
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
const stateToProps = ({ cars, violations }) => {
  return { cars, violations };
};
export default connect(stateToProps)(Tables);
