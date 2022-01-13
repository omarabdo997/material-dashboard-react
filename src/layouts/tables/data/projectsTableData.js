/* eslint-disable react/prop-types */

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

import { endPoint } from "../../../utils/API";

import Button from "@mui/material/Button";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import speedICO from "assets/images/small-logos/speed.png";
import callICO from "assets/images/small-logos/call.svg";
import CardMedia from "@mui/material/CardMedia";

import homeDecor1 from "assets/images/home-decor-1.jpg";

import "./index.css";

export default function data(violations, deleteViolation, issueViolation) {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );
  const rows = [];

  for (let violation of violations.violations) {
    console.log("violations is", violation);
    rows.push({
      type: (
        <Project
          image={violation.type === 1 ? speedICO : callICO}
          name={violation.type === 1 ? "speed" : "Distarcted Driver"}
        />
      ),
      image: (
        <CardMedia
          src={endPoint + violation.imageUrl}
          component="img"
          title={"Violated Car"}
          sx={{
            maxWidth: "300px",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      ),
      "max speed": (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {violation.speedLimit || "N/A"}
        </MDTypography>
      ),
      speed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {violation.speed || "N/A"}
        </MDTypography>
      ),
      "issue violation": (
        <Button
          component="a"
          variant="caption"
          className={violation.issued ? "text" : "delete-car"}
          fontWeight="medium"
          onClick={() => issueViolation(violation.id)}
        >
          {violation.issued ? "issued" : "Issue violation"}
        </Button>
      ),
      "delete violation": (
        <Button
          component="a"
          variant="caption"
          className="delete-car"
          fontWeight="medium"
          onClick={() => deleteViolation(violation.id)}
        >
          delete violation
        </Button>
      ),
    });
  }

  return {
    columns: [
      { Header: "type", accessor: "type", align: "left" },
      { Header: "image", accessor: "image", align: "center" },
      { Header: "max speed", accessor: "max speed", align: "center" },
      { Header: "speed", accessor: "speed", align: "center" },
      { Header: "issue violation", accessor: "issue violation", align: "center" },
      { Header: "delete violation", accessor: "delete violation", align: "center" },
    ],

    rows,
  };
}
