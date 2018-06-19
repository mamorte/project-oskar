import delay from "./delay";

const assets = [
  {
    id: "1",
    ticker: "KLPAIKS:NO",
    name: "KLP AksjeVerden Indeks",
    url: "https://www.bloomberg.com/quote/KLPAIKS:NO"
  },
  {
    id: "2",
    ticker: "KLPAMI2:NO",
    name: "KLP AksjeFremvoksende Markeder Indeks II",
    url: "https://www.bloomberg.com/quote/KLPAMI2:NO"
  },
  {
    id: "3",
    ticker: "KLPANII:NO",
    name: "KLP AksjeNorge Indeks II VPFO",
    url: "https://www.bloomberg.com/quote/KLPANII:NO"
  },
  {
    id: "4",
    ticker: "KLAEIII:NO",
    name: "KLP AksjeEuropa Indeks III",
    url: "https://www.bloomberg.com/quote/KLAEIII:NO"
  },
  {
    id: "5",
    ticker: "MSFT",
    name: "Microsoft",
    url: "https://finance.yahoo.com/quote/MSFT/chart?p=MSFT"
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = asset => {
  return asset.name.toLowerCase();
};

class AssetApi {
  static getAllAssets() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign([], assets));
      }, delay);
    });
  }

  static saveAsset(asset) {
    asset = Object.assign({}, asset); // to avoid manipulating object passed in.
    return new Promise(resolve => {
      setTimeout(() => {
        if (asset.id) {
          const existingAssetIndex = assets.findIndex(a => a.id == asset.id);
          assets.splice(existingAssetIndex, 1, asset);
        } else {
          asset.id = generateId(asset);
          assets.push(asset);
        }

        resolve(asset);
      }, delay);
    });
  }

  static deleteAsset(assetId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const indexOfAssetToDelete = assets.findIndex(asset => {
          asset.id == assetId;
        });
        assets.splice(indexOfAssetToDelete, 1);
        resolve(assetId);
      }, delay);
    });
  }
}

export default AssetApi;
