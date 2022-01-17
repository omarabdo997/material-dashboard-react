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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Button from "@mui/material/Button";
// import Icon from "@mui/material/Icon";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import "./index.css";

// Timeline context
import { useTimeline } from "examples/Timeline/context";

import { useEffect, useState } from "react";

// Custom styles for the TimelineItem
import timelineItem from "examples/Timeline/TimelineItem/styles";

function TimelineItem({ color, title, time, tracked, lastItem, setTracked }) {
  const lastUpdated = (time) => {
    if (!time) return "Wasn't updated";
    let diff = new Date() - new Date(time);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hrs = Math.floor(diff / 1000 / 60 / 60);
    const mins = Math.floor(diff / 1000 / 60);
    if (days > 0) return `Last updated ${days} day(s) ago`;
    if (hrs > 0) return `Last updated ${hrs} hour(s) ago`;
    if (mins > 0) return `Last updated ${mins} minute(s) ago`;
    if (mins <= 0) return `Last updated a few seconds ago`;
  };
  const [lastUpdatedValue, setLastUpdatedValue] = useState(lastUpdated(time));
  const isDark = useTimeline();
  console.log("color is", color);

  useEffect(() => {
    setLastUpdatedValue(lastUpdated(time));
    const interval = setInterval(() => {
      console.log("time is", time);
      setLastUpdatedValue(lastUpdated(time));
    }, 60000);
    return function cleanUp() {
      clearInterval(interval);
    };
  }, [time]);

  return (
    <MDBox position="relative" mb={3} sx={(theme) => timelineItem(theme, { lastItem, isDark })}>
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        width="2rem"
        height="2rem"
        borderRadius="50%"
        position="absolute"
        top="8%"
        left="2px"
        zIndex={2}
        sx={{ fontSize: ({ typography: { size } }) => size.sm, backgroundColor: color }}
      >
        <DirectionsCarFilledIcon fontSize="inherit" />
      </MDBox>
      <MDBox ml={5.75} pt={lastUpdatedValue ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
        <MDTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
          {title}
        </MDTypography>
        <MDBox mt={2} mb={1.5}>
          <MDTypography
            variant="button"
            color={isDark ? "white" : "dark"}
            fontWeight="small"
            fontSize="small"
          >
            {lastUpdatedValue}
          </MDTypography>
        </MDBox>
        <MDBox mt={0.5} ml={-3}>
          <Button
            onClick={setTracked}
            className={tracked ? "button-tracked" : "button-set-tracked"}
          >
            {tracked ? "Untrack Car" : "Track Car"}
          </Button>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of TimelineItem
TimelineItem.defaultProps = {
  color: "info",
  lastItem: false,
  description: "",
};

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  lastItem: PropTypes.bool,
};

export default TimelineItem;
