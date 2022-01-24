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
import { getUserData } from "../../../utils/helpers";

import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import "./index.css";

export default function data(cars, deleteCar, showViolations, openDialog, openEditDialog) {
  const user = getUserData();
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
  let showAllViolations = !cars.currentShownPlate;
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
          onClick={() => {
            if (car.showViolations) return;
            showViolations(car.plateNumber);
          }}
        >
          {car.showViolations ? "Violations Shown..." : "Show violations"}
        </Button>
      ),
      edit: (
        <Button
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
          disabled={user.level != 1}
          onClick={() => openEditDialog(car.plateNumber)}
        >
          edit
        </Button>
      ),
      "delete car": (
        <Button
          component="a"
          variant="caption"
          className={user.level == 1 ? "delete-car" : ""}
          fontWeight="medium"
          disabled={user.level != 1}
          onClick={() => deleteCar(car.plateNumber)}
        >
          Delete
        </Button>
      ),
    });
  }
  (user.level == 1 || user.level == 2) &&
    rows.push({
      "car plate": (
        <MDButton
          component="a"
          rel="noreferrer"
          variant="gradient"
          color="info"
          fullWidth
          disabled={user.level != 1}
          onClick={openDialog}
        >
          add car
        </MDButton>
      ),
      "show violations": (
        <Button
          component="a"
          variant="caption"
          className={showAllViolations ? "shown-violations" : "show-violations"}
          fontWeight="medium"
          onClick={() => {
            if (showAllViolations) return;
            showViolations(undefined);
          }}
        >
          {showAllViolations ? "Violations Shown..." : "Show violations"}
        </Button>
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
