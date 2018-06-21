import * as types from "./actionTypes";
import assetApi from "../api/mockAssetApi";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";
import { loadUpdatedAggregates } from "./dashboardActions";

export function loadAssetsSuccess(assets) {
  return { type: types.LOAD_ASSETS_SUCCESS, assets };
}

export function createAssetSuccess(createdAsset) {
  return { type: types.CREATE_ASSET_SUCCESS, createdAsset };
}

export function updateAssetSuccess(updatedAsset) {
  return { type: types.UPDATE_ASSET_SUCCESS, updatedAsset };
}

export function deleteAssetSuccess(deletedAsset) {
  return { type: types.DELETE_ASSET_SUCCESS, deletedAsset };
}

export function loadAssets() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return assetApi
      .getAllAssets()
      .then(assets => {
        dispatch(loadAssetsSuccess(assets));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveAsset(asset) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return assetApi
      .saveAsset(asset)
      .then(savedAsset => {
        asset.id
          ? dispatch(updateAssetSuccess(savedAsset))
          : dispatch(createAssetSuccess(savedAsset));
        dispatch(loadUpdatedAggregates());
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}

export function deleteAsset(asset) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return assetApi
      .deleteAsset(asset.id)
      .then(deletedAsset => {
          dispatch(deleteAssetSuccess(deletedAsset));
      dispatch(loadUpdatedAggregates());
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}
