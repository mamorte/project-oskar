import delay from "./delay";

const trackings = [
  {
    id: "1",
    assetId: "2",
    costPrice: "21",
    marketPrice: "34",
    trackingTime: new Date("2018-02-22")
  },
  {
    id: "2",
    assetId: "2",
    costPrice: "22",
    marketPrice: "35",
    trackingTime: new Date("2018-02-28")
  },
  {
    id: "3",
    assetId: "2",
    costPrice: "26",
    marketPrice: "39",
    trackingTime: new Date("2018-03-14")
  },
  {
    id: "4",
    assetId: "1",
    costPrice: "23",
    marketPrice: "37",
    trackingTime: new Date("2015-03-25")
  },
  {
    id: "5",
    assetId: "3",
    costPrice: "13",
    marketPrice: "43",
    trackingTime: new Date("2015-03-25")
  },
  {
    id: "6",
    assetId: "4",
    costPrice: "76",
    marketPrice: "87",
    trackingTime: new Date("2015-03-25")
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

  static aggregateTrackings() {
    let aggregates = [trackings[1]];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign([], aggregates));
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
