import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function CarDialog({ title, submitText, open, cancelFunction, submitFunction }) {
  const [carPlate, setCarPlate] = useState("");
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
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelFunction}>Cancel</Button>
          <Button type="submit" onClick={() => submitFunction({ plateNumber: carPlate }, open)}>
            {submitText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
