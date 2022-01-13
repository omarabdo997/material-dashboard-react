const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("Old state", store.getState());
  console.log("The action", action);
  next(action);
  console.log("The new State", store.getState());
  console.groupEnd();
};
export default logger;
