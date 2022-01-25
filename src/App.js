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

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  handleRecieveCars,
  handleRecieveViolations,
  handleAddViolation,
  handleUpdateCoord,
  handleRecieveViolationsCount,
  handleRecieveAnalytics,
  handleRecieveUsers,
} from "./actions";

import Dashboard from "layouts/dashboard";

import ErrorDialog from "./examples/Modals/ErroDialog";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes, { AuthRoute, UnauthRoute } from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

import MDSnackbar from "components/MDSnackbar";

import { endPoint } from "./utils/API";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";

import { violationsListener, carListener, disconnectListener, changeToken } from "./utils/Sockets";

import { getUserData, signOut } from "./utils/helpers";

function App(props) {
  const navigate = useNavigate();
  const { violations, cars, users } = props;
  const user = getUserData();
  const filteredRouts = routes.filter((route) => {
    if (!route.levels && !route.unauth) return true;
    else if (user?.level && route?.levels?.includes(user.level)) return true;
    else if (!user && route.unauth) return true;
    else return false;
  });
  const [controller, dispatch] = useMaterialUIController();
  const [violationSB, setViolationSB] = useState(false);
  const [violation, setViolation] = useState({});

  const openViolationSB = () => setViolationSB(true);
  const closeViolationSB = () => setViolationSB(false);

  const renderViolationSB = (
    <MDSnackbar
      color="error"
      icon="dangerous"
      title={violation?.type === 1 ? "Speed Violation" : "Distracted Driver Violation"}
      content={
        <p>
          Speed: {violation?.speed} <br />
          Max Speed: {violation?.speedLimit}
        </p>
      }
      dateTime={violation?.issuer}
      open={violationSB}
      onClose={closeViolationSB}
      close={closeViolationSB}
      img={endPoint + violation?.imageUrl}
      bgWhite
    />
  );

  const onViolation = (violation) => {
    props.dispatch(handleAddViolation(violation));
    setViolation(violation);
    closeViolationSB();
    openViolationSB();
  };

  const onCarUpdate = (car) => {
    props.dispatch(handleUpdateCoord(car));
  };

  const tokenExpire = () => {
    signOut();
    changeToken();
    navigate("/sign-in");
  };

  useEffect(() => {
    console.log("in effect");
    props.dispatch(handleRecieveCars(cars.currentPage));
    props.dispatch(handleRecieveViolationsCount());
    props.dispatch(handleRecieveAnalytics());
    props.dispatch(handleRecieveUsers(users.currentPage, users.currentSearch));
    props.dispatch(
      handleRecieveViolations(
        violations.currentPage,
        violations.currentType,
        violations.currentPlateNumber
      )
    );
    violationsListener(onViolation);
    carListener(onCarUpdate);
    disconnectListener(tokenExpire);
  }, []);

  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  console.log("color is ", sidenavColor);
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      console.log("route is", route);
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.levels && route.route) {
        return (
          <Route exact path={route.route} element={<AuthRoute levels={route.levels} />}>
            <Route exact path={route.route} element={route.component} key={route.route} />
          </Route>
        );
      }
      if (user && route.unauth) {
        console.log("here omar");
        return (
          <Route exact path={route.route} element={<UnauthRoute />}>
            <Route exact path={route.route} element={route.component} key={route.route} />
          </Route>
        );
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Material Dashboard 2"
              routes={filteredRouts}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to={filteredRouts[0].route} />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Material Dashboard 2"
            routes={filteredRouts}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to={filteredRouts[0].route} />} />
      </Routes>
      {renderViolationSB}
      <ErrorDialog />
    </ThemeProvider>
  );
}

const stateToProps = ({ cars, violations, analytics, users }) => {
  return { cars, violations, analytics, users };
};
export default connect(stateToProps)(App);
