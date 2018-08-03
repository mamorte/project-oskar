import delay from "./delay";
import assets from "./assets";

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
