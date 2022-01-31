import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Validator from "validator";

export default function CarDialog({
  title,
  submitText,
  open,
  cancelFunction,
  submitFunction,
  car,
}) {
  console.log("the car is", car);
  const [carPlate, setCarPlate] = useState(car?.plateNumber || "");
  const [endpoint, setEndpoint] = useState(car?.endpoint || "");
  const [errorPlate, setErrorPlate] = useState("");
  const [errorEndpoint, setErrorEndpoint] = useState("");
  const handleSubmit = () => {
    if (!Validator.isLength(carPlate, { min: 3, max: 10 })) {
      setErrorPlate("The plate number should be between 3 to 10 chars!");
      return;
    }
    // if (endpoint && !Validator.isDataURI(endpoint)) {
    //   setErrorEndpoint("Please enter a valid endpoint url!");
    //   return;
    // }
    setErrorPlate("");
    setErrorEndpoint("");
    const endpointData = endpoint || undefined;
    submitFunction({ plateNumber: carPlate, endpoint: endpointData }, open);
  };
  React.useEffect(() => {
    setCarPlate(car?.plateNumber || "");
    setEndpoint(car?.endpoint || "");
  }, [car]);
  return (
    <div>
      <Dialog open={open} onClose={cancelFunction}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="carPlate"
            name="carPlate"
            label="Plate Number"
            type="text"
            value={carPlate}
            onChange={(e) => setCarPlate(e.target.value)}
            fullWidth
            variant="standard"
            sx={{ width: "400px" }}
          />
          <Typography mt={1} variant="h6" color="error" sx={{ fontWeight: 100 }} component="h2">
            {errorPlate}
          </Typography>
          <TextField
            margin="dense"
            id="endpoint"
            name="endpoint"
            label="Endpoin(optional)"
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            fullWidth
            variant="standard"
            sx={{ width: "400px" }}
          />
          <Typography mt={1} variant="h6" color="error" sx={{ fontWeight: 100 }} component="h2">
            {errorEndpoint}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelFunction}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            {submitText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
