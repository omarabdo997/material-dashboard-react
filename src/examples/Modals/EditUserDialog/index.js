import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { useState, useEffect } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { connect } from "react-redux";
import SignUp from "../../../layouts/authentication/sign-up";

const EditUserDialog = (props) => {
  // const exitFunction = () => {
  //   setOpen(false);
  // };
  return (
    <div>
      <Dialog open={props.open} onClose={props.closeEdit}>
        <SignUp edit user={props.user} onSubmit={props.closeEdit} />
      </Dialog>
    </div>
  );
};

export default EditUserDialog;
