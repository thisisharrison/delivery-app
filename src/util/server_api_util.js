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
/**
 * @returns
 * HTTP/1.1 500 Internal Server Error
 * Internal Server Error
 */

// POST /mock/route/success
export const testSubmitSuccess = () => {
  return axios.post(apiUrl + "/mock/route/success");
};
/**
 * @returns
 * HTTP/1.1 200 OK
 * { "token": "9d3503e0-7236-4e47-a62f-8b01b5646c16" }
 */

// GET /mock/route/inprogress
export const testGetRouteInProgress = () => {
  return axios.get(apiUrl + "/mock/route/inprogress");
};
/**
 * @returns
 * HTTP/1.1 200 OK
 * { "status": "in progress" }
 */

// GET /mock/route/failure
export const testGetRouteFailure = () => {
  return axios.get(apiUrl + "/mock/route/failure");
};
/**
 * @returns
 * HTTP/1.1 200 OK
 * {
 *   "status": "failure",
 *   "error": "Location not accessible by car"
 * }
 */

// GET /mock/route/success
export const testGetRouteSuccess = () => {
  return axios.get(apiUrl + "/mock/route/success");
};
/**
 * @returns
 * HTTP/1.1 200 OK
 * {
 *  "status": "success",
 *  "path": [
 *    ["22.372081", "114.107877"],
 *    ["22.326442", "114.167811"],
 *    ["22.284419", "114.159510"]
 *  ],
 *  "total_distance": 20000,
 *  "total_time": 1800
 * }
 */
