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
import { endPoint } from "../../../utils/API";
import avatar from "assets/images/avatar.png";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import "./index.css";

export default function data(users, deleteUser, openDialog, openEditDialog) {
  const levels = { 1: "Admin", 2: "Desk Operator", 3: "Car Operator" };
  const loggedUser = getUserData();
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
  for (let user of users.users) {
    rows.push({
      user: (
        <Author
          image={user?.imageUrl ? endPoint + user?.imageUrl : avatar}
          name={user?.name}
          email={user?.email}
        />
      ),
      function: <Job title={user?.position} description="" />,
      type: (
        <MDTypography component="a" variant="button" color="text" fontWeight="medium">
          {levels[user?.level]}
        </MDTypography>
      ),
      mobile: (
        <MDTypography component="a" variant="button" color="text" fontWeight="medium">
          {user?.phone || "N/A"}
        </MDTypography>
      ),
      edit: (
        <Button
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
          disabled={loggedUser.level != 1}
          onClick={() => openEditDialog(car.plateNumber)}
        >
          edit
        </Button>
      ),
      "delete user": (
        <Button
          component="a"
          variant="caption"
          className={loggedUser.level == 1 ? "delete-car" : ""}
          fontWeight="medium"
          disabled={loggedUser.level != 1}
          onClick={() => deleteCar(car.plateNumber)}
        >
          Delete
        </Button>
      ),
    });
  }

  return {
    columns: [
      { Header: "user", accessor: "user", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "type", accessor: "type", align: "left" },
      { Header: "mobile", accessor: "mobile", align: "center" },
      { Header: "edit", accessor: "edit", align: "center" },
      { Header: "delete user", accessor: "delete user", align: "center" },
    ],

    rows,
  };
}
