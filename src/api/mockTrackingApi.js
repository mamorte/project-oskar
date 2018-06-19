import delay from "./delay";
import { getFormattedDateTime } from "../utils/dateHelper";

const trackings = [
  {
    id: "1",
    assetId: "2",
    costPrice: "21",
    marketPrice: "34",
    trackingTime: getFormattedDateTime()
  },
  {
    id: "2",
    assetId: "1",
    costPrice: "23",
    marketPrice: "37",
    trackingTime: getFormattedDateTime()
  },
  {
    id: "3",
    assetId: "3",
    costPrice: "13",
    marketPrice: "43",
    trackingTime: getFormattedDateTime()
  },
  {
    id: "4",
    assetId: "4",
    costPrice: "76",
    marketPrice: "87",
    trackingTime: getFormattedDateTime()
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = () => {
  return Math.floor(Math.random() * 1001).toString();
};

class TrackingApi {
  static getAllTrackings() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign([], trackings));
      }, delay);
    });
  }

  static saveTracking(tracking) {
    tracking = Object.assign({}, tracking); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTrackingPrice = 1;
        if (tracking.costPrice < minTrackingPrice) {
          reject("Price must be higher than 0");
        }

        if (tracking.id) {
          const existingTrackingIndex = trackings.findIndex(
            a => a.id == tracking.id
          );
          trackings.splice(existingTrackingIndex, 1, tracking);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          tracking.id = generateId(tracking);
          tracking.trackingTime = getFormattedDateTime();
          trackings.push(tracking);
        }

        resolve(tracking);
      }, delay);
    });
  }

  static deleteTracking(trackingId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const indexOfTrackToDelete = trackings.findIndex(
          t => t.id == trackingId
        );
        trackings.splice(indexOfTrackToDelete, 1);
        resolve(trackingId);
      }, delay);
    });
  }
}

export default TrackingApi;
