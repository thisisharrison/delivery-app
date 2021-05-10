// api settings imported for ease of use for development and production
import apiUrl from "../apiConfig";
import axios from "axios";

// POST /route
export const postRoute = (data) => {
  return axios.post(apiUrl + "/route", data);
};

// GET /route/:token
export const getRoute = (token) => {
  return axios.get(apiUrl + `/route/${token}`);
};

// For testing
// POST /mock/route/500
export const testServerError = () => {
  return axios.post(apiUrl + "/mock/route/500");
};

// POST /mock/route/success
export const testSubmitSuccess = () => {
  return axios.post(apiUrl + "/mock/route/success");
};

// GET /mock/route/inprogress
export const testGetRouteInProgress = () => {
  return axios.get(apiUrl + "/mock/route/inprogress");
};

// GET /mock/route/failure
export const testGetRouteFailure = () => {
  return axios.get(apiUrl + "/mock/route/failure");
};

// GET /mock/route/success
export const testGetRouteSuccess = () => {
  return axios.get(apiUrl + "/mock/route/success");
};
