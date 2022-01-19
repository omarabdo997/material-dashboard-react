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

// @mui material components
import Grid from "@mui/material/Grid";

import { handleRecieveAnalytics } from "../../actions";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Google Map
import GoogleMapReact from "google-map-react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

// Data
import reportsChartData from "layouts/dashboard/data/reportsChartData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
import { connect } from "react-redux";

import CarsOverview from "layouts/dashboard/components/CarsOverview";

function Dashboard(props) {
  const { cars, violations, analytics } = props;
  console.log("from dashboard", cars);
  const [center, setCenter] = useState({
    lat: 30.033333,
    lng: 31.233334,
  });

  const [zoom] = useState(13);

  for (const car of cars.cars) {
    if (car.isTracked === true && (center.lat !== car.lastLat || center.lng !== car.lastLng)) {
      if (car.lastLat && car.lastLng) {
        setCenter({
          lat: car.lastLat,
          lng: car.lastLng,
        });
      }

      break;
    }
  }
  const handleChangeFrom = (value) => {
    value.setUTCHours(0, 0, 0, 0);
    console.log("datae is ", new Date(value).toJSON(), JSON.stringify(value));
    props.dispatch(handleRecieveAnalytics(value.toJSON(), analytics.to));
  };

  const handleChangeTo = (value) => {
    value.setUTCHours(0, 0, 0, 0);
    props.dispatch(handleRecieveAnalytics(analytics.from, value.toJSON()));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <MDBox mb={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              {/* <Projects /> */}
              <div style={{ height: "500px", width: "100%" }}>
                <GoogleMapReact
                  // bootstrapURLKeys={{ key: "AIzaSyCLO6WuIVl8_mdU7PSd9xUWUV_hCbF7o6c" }}
                  center={center}
                  zoom={zoom}
                >
                  {cars.cars.map((car) => (
                    <DirectionsCarFilledIcon
                      sx={{ color: car.color }}
                      lat={car.lastLat}
                      lng={car.lastLng}
                      fontSize="medium"
                      key={car.plateNumber}
                    />
                  ))}
                </GoogleMapReact>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <CarsOverview />
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="dangerous"
                title="All Violations"
                count={violations.totalViolations}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={8} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="speed"
                title="Speed Violations"
                count={violations.totalSpeedViolations}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={8} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="phone_disabled"
                title="Distarcted Driver Violations"
                count={violations.totalDistractedViolations}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={1}>
            <Grid item xs={2} md={2} lg={2}>
              <MDBox mb={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="From"
                    inputFormat="MM/dd/yyyy"
                    color="warning"
                    value={analytics.from}
                    onChange={handleChangeFrom}
                    renderInput={(params) => {
                      console.log("the params are", params);
                      params.inputProps.readOnly = true;
                      return <TextField {...params} value="12/10/1997" />;
                    }}
                  />
                </LocalizationProvider>
              </MDBox>
            </Grid>

            <Grid item xs={2} md={2} lg={2}>
              <MDBox mb={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="To"
                    inputFormat="MM/dd/yyyy"
                    color="primary"
                    value={analytics.to}
                    onChange={handleChangeTo}
                    renderInput={(params) => {
                      console.log("the params are", params);
                      params.inputProps.readOnly = true;
                      return <TextField {...params} value="12/10/1997" />;
                    }}
                  />
                </LocalizationProvider>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="error"
                  title="All Violations Count By Day"
                  description=""
                  // date=""
                  chart={reportsChartData(analytics.analyticsCount).days}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="error"
                  title="All Violations Count By Month"
                  description=""
                  date="updated 4 mins ago"
                  chart={reportsChartData(analytics.analyticsCount).months}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="error"
                  title="daily violations"
                  description=""
                  date="updated 4 min ago"
                  chart={reportsChartData(analytics.analyticsAvg).days}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="error"
                  title="Monthly violations"
                  description=""
                  date="just updated"
                  chart={reportsChartData(analytics.analyticsAvg).months}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}
const stateToProps = ({ cars, violations, analytics }) => {
  return { cars, violations, analytics };
};
export default connect(stateToProps)(Dashboard);
