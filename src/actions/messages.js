export const ADD_MSSG = "ADD_MSSG";
export const REMOVE_MSSG = "REMOVE_MSSG";

export const addMssg = (mssg) => ({
  type: ADD_MSSG,
  mssg,
});

export const removeMssg = () => ({
  type: REMOVE_MSSG,
});
