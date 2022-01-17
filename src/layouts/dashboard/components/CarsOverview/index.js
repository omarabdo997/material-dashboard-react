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
import MDPagination from "components/MDPagination";
import Icon from "@mui/material/Icon";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

import { handleRecieveCars, handleSetTracked } from "../../../../actions";

import { connect } from "react-redux";
import { useState } from "react";
import { ModeCommentTwoTone } from "@mui/icons-material";

function CarsOverview(props) {
  const { cars } = props;
  const [search, setSearch] = useState(cars.currentSearch);
  const pageCount = Math.floor((cars.totalCount - 1) / 10) + 1;
  console.log("page count is", pageCount);
  const pageIndex = cars.currentPage - 1;
  const pageOptions = [...Array(pageCount).keys()];
  const nextPage = () => {
    props.dispatch(handleRecieveCars(pageIndex + 2));
  };
  const previousPage = () => {
    props.dispatch(handleRecieveCars(pageIndex));
  };
  const gotoPage = (page) => {
    if (page < 0 || page + 1 > pageCount) return;
    props.dispatch(handleRecieveCars(page + 1));
  };
  const setTracked = (plateNumber) => {
    props.dispatch(handleSetTracked(plateNumber));
  };
  const handleInputPagination = ({ target: { value } }) =>
    value > pageCount || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  const lastUpdated = (time) => {
    if (!time) return "Wasn't updated";
    let diff = new Date() - new Date(time);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hrs = Math.floor(diff / 1000 / 60 / 60);
    const mins = Math.floor(diff / 1000 / 60);
    if (days > 0) return `Last updated ${days} day(s) ago`;
    if (hrs > 0) return `Last updated ${hrs} hour(s) ago`;
    if (mins > 0) return `Last updated ${mins} minute(s) ago`;
    if (mins <= 0) return `Last updated few seconds ago`;
  };
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));
  console.log(cars);
  return (
    <Card sx={{ height: "500px", overflow: "hidden" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Cars overview
        </MDTypography>
      </MDBox>
      <MDBox width="12rem" ml="auto" mr="30px">
        <MDInput
          placeholder="Search..."
          value={search}
          size="small"
          fullWidth
          onChange={({ currentTarget }) => {
            setSearch(currentTarget.value);
            const valueNow = currentTarget.value;
            setTimeout(() => {
              console.log("test search", currentTarget.value, valueNow);
              if (currentTarget.value === valueNow)
                props.dispatch(handleRecieveCars(1, currentTarget.value));
            }, 1000);
          }}
        />
      </MDBox>

      <MDBox p={2} sx={{ height: "500px", overflow: "auto" }}>
        {cars.cars.map((car, i, { length }) => (
          <TimelineItem
            color={car.color}
            title={car.plateNumber}
            key={car.plateNumber}
            tracked={car.isTracked}
            lastItem={length - 1 === i ? true : false}
            time={car.updateCoordTime}
            setTracked={() => setTracked(car.plateNumber)}
          />
        ))}
      </MDBox>
      <MDBox
        p={3}
        px={3}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        {pageCount > 1 && (
          <MDPagination variant={"gradient"} color={"info"}>
            {pageIndex > 0 && (
              <MDPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            )}
            {pageCount > 6 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{ type: "number", min: 1, max: pageCount }}
                  value={pageIndex + 1}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {pageCount > pageIndex + 1 && (
              <MDPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </Card>
  );
}
const stateToProps = ({ cars, violations }) => {
  return { cars, violations };
};
export default connect(stateToProps)(CarsOverview);
