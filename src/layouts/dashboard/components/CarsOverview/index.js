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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function CarsOverview(props) {
  const { cars, setCars } = props;
  console.log(cars);
  return (
    <Card sx={{ height: "500px", overflow: "auto" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Cars overview
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        {Object.keys(cars).map((key, i, { length }) => (
          <TimelineItem
            color={cars[key].color}
            title={key}
            key={key}
            tracked={cars[key].isTracked}
            lastItem={length - 1 === i ? true : false}
            cars={cars}
            setCars={setCars}
          />
        ))}
      </MDBox>
    </Card>
  );
}

export default CarsOverview;
