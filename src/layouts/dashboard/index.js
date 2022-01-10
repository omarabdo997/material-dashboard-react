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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Google Map
import GoogleMapReact from "google-map-react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
import CarsOverview from "layouts/dashboard/components/CarsOverview";

function Dashboard(props) {
  const { cars, setCars } = props;
  console.log("from dashboard", cars);
  // const { sales, tasks } = reportsLineChartData;
  const [center, setCenter] = useState({
    lat: 30.033333,
    lng: 31.233334,
  });

  const [zoom] = useState(13);

  for (const [key, value] of Object.entries(cars)) {
    if (value.isTracked === true && (center.lat !== value.lat || center.lng !== value.lng)) {
      setCenter({
        lat: value.lat,
        lng: value.lng,
      });

      break;
    }
  }

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
                  bootstrapURLKeys={{ key: "AIzaSyCLO6WuIVl8_mdU7PSd9xUWUV_hCbF7o6c" }}
                  center={center}
                  zoom={zoom}
                >
                  {Object.keys(cars).map((key) => (
                    <DirectionsCarFilledIcon
                      sx={{ color: cars[key].color }}
                      lat={cars[key].lat}
                      lng={cars[key].lng}
                      fontSize="medium"
                      key={key}
                    />
                  ))}
                </GoogleMapReact>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <CarsOverview cars={cars} setCars={setCars} />
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
                count={281}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={8} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="speed"
                title="Speed Violations"
                count="2,300"
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={8} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="phone_disabled"
                title="Distarcted Driver Violations"
                count="34,000"
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
