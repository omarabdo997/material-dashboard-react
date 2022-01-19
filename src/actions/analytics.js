export const RECIEVE_ANALYTICS = "RECIEVE_ANALYTICS";

export const recieveAnalytics = (analyticsAvg, analyticsCount, from, to) => ({
  type: RECIEVE_ANALYTICS,
  analyticsAvg,
  analyticsCount,
  from,
  to,
});
