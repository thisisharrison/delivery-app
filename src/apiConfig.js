let apiUrl;
const apiUrls = {
  // placeholder for production URL
  production: "#",
  development: process.env.REACT_APP_MOCK_API,
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;
