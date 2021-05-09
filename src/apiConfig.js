let apiUrl;
const apiUrls = {
  production: process.env.REACT_APP_PROD_API,
  development: process.env.REACT_APP_MOCK_API,
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;
