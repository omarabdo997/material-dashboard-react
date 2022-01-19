import { RECIEVE_ANALYTICS } from "../actions/analytics";
import _ from "lodash";

const analytics = (
  state = {
    analyticsAvg: {
      sun: 0,
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    },
    analyticsCount: {
      sun: 0,
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    },
    from: undefined,
    to: undefined,
  },
  action
) => {
  switch (action.type) {
    case RECIEVE_ANALYTICS: {
      const { analyticsCount, analyticsAvg, from, to } = action;
      return {
        ...state,
        analyticsAvg,
        analyticsCount,
        from,
        to,
      };
    }
    default:
      return state;
  }
};
export default analytics;
