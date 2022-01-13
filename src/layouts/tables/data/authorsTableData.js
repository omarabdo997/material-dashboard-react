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

export default function data() {
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

  return {
    columns: [
      { Header: "car plate", accessor: "car plate", align: "left" },
      // { Header: "function", accessor: "function", align: "left" },
      // { Header: "status", accessor: "status", align: "center" },
      { Header: "show violations", accessor: "show violations", align: "center" },
      { Header: "edit", accessor: "edit", align: "center" },
      { Header: "delete car", accessor: "delete car", align: "center" },
    ],

    rows: [
      {
        "car plate": <Author image={team2} name="AA-123" email="" />,
        function: <Job title="Manager" description="Organization" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        "show violations": (
          <Button component="a" variant="caption" className="show-violations" fontWeight="medium">
            Show violations
          </Button>
        ),
        edit: (
          <Button component="a" variant="caption" color="text" fontWeight="medium">
            edit
          </Button>
        ),
        "delete car": (
          <Button component="a" variant="caption" className="delete-car" fontWeight="medium">
            Delete
          </Button>
        ),
      },
      {
        "car plate": <Author image={team2} name="AB-134" email="" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
        "show violations": (
          <Button component="a" variant="caption" className="shown-violations" fontWeight="medium">
            Violations Shown...
          </Button>
        ),
        edit: (
          <Button component="a" variant="caption" color="text" fontWeight="medium">
            edit
          </Button>
        ),
        "delete car": (
          <Button component="a" variant="caption" className="delete-car" fontWeight="medium">
            Delete
          </Button>
        ),
      },
      {
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
      },
    ],
  };
}
