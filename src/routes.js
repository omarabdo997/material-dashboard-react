import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import Icon from "@mui/material/Icon";

import { signOut } from "./utils/helpers";
import { changeToken } from "./utils/Sockets";

import { Navigate, Outlet } from "react-router-dom";
import { isAuth, isLoggedIn } from "./utils/helpers";
import React from "react";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    levels: [1, 2],
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    levels: [1, 2, 3],
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    unauth: true,
    icon: <Icon fontSize="small">login</Icon>,
    route: "/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Add User",
    key: "add-user",
    levels: [1],
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/add-user",
    component: <SignUp />,
  },
  {
    type: "button",
    name: "Sign Out",
    key: "sign-out",
    levels: [1, 2, 3],
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/sign-out",
    onClick: () => {
      signOut();
      changeToken();
    },
    component: <SignIn />,
  },
];

export const AuthRoute = ({ levels }) => {
  // Add your own authentication on the below line.
  return isAuth(levels) ? <Outlet /> : <Navigate to="/sign-in" />;
};

export const UnauthRoute = () => {
  // Add your own authentication on the below line.
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default routes;
