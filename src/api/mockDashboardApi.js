import delay from "./delay";

class DashboardApi {
  static aggregateTrackings(trackings) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign([], trackings));
      }, delay);
    });
  }
}

export default DashboardApi;
