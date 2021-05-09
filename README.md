# Delivery App

## Demo
[![](http://img.youtube.com/vi/FxHRUyJWSWI/0.jpg)](http://www.youtube.com/watch?v=FxHRUyJWSWI "")

## Starting the application

1. **Git clone**

    With zip file (bundle file), you can `git clone <path_to_bundle_file>`.

    Or `git clone https://github.com/thisisharrison/delivery-app.git`

2. **Install dependencies**

    In main directory, install node packages with npm package manager. 
    
    ```bash
    npm install
    ```

3. **Set enivronment variables**

    Create a `.env` file in main directory and set the following variables.

    ```
    REACT_APP_MAPS_API_KEY={YOUR GOOGLE MAP API KEY}
    REACT_APP_MOCK_API={YOUR DEVELOPMENT API URL}
    REACT_APP_PROD_API={YOUR PRODUCTION API URL}
    ```

4. **Development**

    Run the app in the development mode with below command.\
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    ```
    yarn start
    ```    
5. **Tests**

    Launch the test runner in the interactive watch mode.
    ```
    yarn test
    ```

## Instructions on creating a production build

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Therefore, we can run `yarn build` with `react-scripts` to create a build directory with `build/static` containing the JavaScript code and CSS files. 

To change this behaviour, we can update npm `scripts` in `package.json` file. We would want to use a module bundler such as webpack and create a `webpack.prod.js` and then update `scripts` to:

```
  "build": "webpack --config webpack.prod.js"
```

In this `webpack.prod.js` file, we would want to set mode to `production` as webpack will minify our code. We also want to generate sourcemaps in production, `devtools: "source-map"`, this is slow but it is recommended choice for production builds. 

For JavaScript compiler, we also want to add Babel, which converts our modern JavaScript to run in older browsers. We want to add to our webpack configuration: loader, `"babel-loader"`, and presets, `"@babel/env", "@babel/react"`.

## Features

### Search Form

User can pickup and drop-off points and submit. Search Form renders `Message` component based on API responses. 

If backend is busy, it will continue to retry the API call. We can accomplish this using `async/await`. 

```js
postRoute(data)
  // asynchronous callback
  .then(async (res) => {
    // if postRoute Promise resolved, 
    // make an API call with the token and destructure the response
    let { data } = await getRoute(res.data.token);
    // retry logic while status is in progress
    while (data.status === "in progress") {
      // ...
      let response = await getRoute(res.data.token);
      // update data variable
      data = response.data;
    }
    // ...
  })
  .catch((e) => {
    // ...
  })
```

### Map

Application has a global state using Context Provider. Upon successful API calls, Search Form component will call `setPath` with the response data.

```js
const [path, setPath] = React.useState(null);
return (
  <PathContext.Provider value={{ path, setPath }}>
    {children}
  </PathContext.Provider>
);
```

In the Map element, we receive path from Context and call `displayRoute` with Google's `DirectionsService` and `DirectionsRenderer`. We map over array from API response and create `waypoints` in Google's LatLng geographical coordinates. We call `DirectionsService.route()` and passing it literal containing input terms, including travel mode of Driving, and successful callback to render the directions. 

```js
directionsService.route(
  {
    origin: waypts[0].location,
    destination: waypts[pts - 1].location,
    waypoints: waypts.slice(1, pts - 1),
    optimizeWaypoints: true,
    travelMode: "DRIVING",
  },
  (response, status) => {
    if (status === "OK" && response) {
      directionsRenderer.setDirections(response);
    } 
  // ...
```