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

const reportsChartData = (analyticsCount) => ({
  days: {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: {
      label: "Violations",
      data: [
        analyticsCount.sun,
        analyticsCount.mon,
        analyticsCount.tue,
        analyticsCount.wed,
        analyticsCount.thu,
        analyticsCount.fri,
        analyticsCount.sat,
      ],
    },
  },
  months: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      label: "Violations",
      data: [
        analyticsCount.jan,
        analyticsCount.feb,
        analyticsCount.mar,
        analyticsCount.apr,
        analyticsCount.may,
        analyticsCount.jun,
        analyticsCount.jul,
        analyticsCount.aug,
        analyticsCount.sep,
        analyticsCount.oct,
        analyticsCount.nov,
        analyticsCount.dec,
      ],
    },
  },
});

export default reportsChartData;
