/* eslint-disable react/prop-types */

// Soft UI Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import Button from "@mui/material/Button";

// Images
// import logoXD from "assets/images/small-logos/logo-xd.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoJira from "assets/images/small-logos/logo-jira.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team2 from "assets/images/team-2.jpg";
import MDButton from "components/MDButton";

import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import "./index.css";

export default function data(cars, deleteCar, showViolations) {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const rows = [];
  for (let car of cars.cars) {
    rows.push({
      "car plate": <Author image={team2} name={car.plateNumber} email="" />,
      "show violations": (
        <Button
          component="a"
          variant="caption"
          className={car.showViolations ? "shown-violations" : "show-violations"}
          fontWeight="medium"
          onClick={() => showViolations(car.plateNumber)}
        >
          {car.showViolations ? "Violations Shown..." : "Show violations"}
        </Button>
      ),
      edit: (
        <Button component="a" variant="caption" color="text" fontWeight="medium">
          edit
        </Button>
      ),
      "delete car": (
        <Button
          component="a"
          variant="caption"
          className="delete-car"
          fontWeight="medium"
          onClick={() => deleteCar(car.plateNumber)}
        >
          Delete
        </Button>
      ),
    });
  }
  rows.push({
    "car plate": (
      <MDButton
        component="a"
        href="https://www.creative-tim.com/product/material-dashboard-pro-react"
        target="_blank"
        rel="noreferrer"
        variant="gradient"
        color="info"
        fullWidth
      >
        add car
      </MDButton>
    ),
  });
  return {
    columns: [
      { Header: "car plate", accessor: "car plate", align: "left" },
      { Header: "show violations", accessor: "show violations", align: "center" },
      { Header: "edit", accessor: "edit", align: "center" },
      { Header: "delete car", accessor: "delete car", align: "center" },
    ],

    rows,
  };
}
