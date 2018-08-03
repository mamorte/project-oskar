import delay from "./delay";
import trackings from "./trackings";

//This would be performed on the server in a real app. Just stubbing in.
const generateId = () => {
  return Math.floor(Math.random() * 1001).toString();
};

class TrackingApi {
  static getAllTrackings() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(trackings);
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
