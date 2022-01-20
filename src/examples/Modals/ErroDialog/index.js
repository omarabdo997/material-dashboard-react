import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { useState, useEffect } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { connect } from "react-redux";

const ErrorDialog = (props) => {
  const [open, setOpen] = useState(false);
  const { messages } = props;
  const cancelFunction = () => {
    setOpen(false);
  };
  useEffect(() => {
    messages?.errorMessage && setOpen(true);
  }, [messages]);
  return (
    <div>
      <Dialog open={open} onClose={cancelFunction}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent sx={{ width: "400px" }}>
          {messages?.errorMessage ? (
            <Typography mt={1} variant="h5" color="error" sx={{ fontWeight: 100 }} component="h2">
              {messages.errorMessage}
            </Typography>
          ) : null}
          {messages?.validators
            ? messages.validators.map((validator) => (
                <Typography
                  mt={1}
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: 100 }}
                  component="h2"
                >
                  {validator.msg}
                </Typography>
              ))
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelFunction}>Ok</Button>
          {/* <Button type="submit" onClick={() => submitFunction({ plateNumber: carPlate }, open)}>
            {submitText}
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};
const stateToProps = ({ messages }) => {
  return { messages };
};
export default connect(stateToProps)(ErrorDialog);
