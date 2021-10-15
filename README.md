# Getting Started with incident-mapper

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# Background

I'm obviously not an experienced front-end developer. With that being said, here's a quick high-level approach I believe would be best to solve this problem if time allowed for more learning through this process.

1) I'm choosing to use MapBox as the frontend mapping technology. They have a nice JS library (and React wrapper) and documentation that's available [here](https://docs.mapbox.com/mapbox-gl-js/example/simple-map/). Adding that to Map.js in my project.

2) Incident files will be determined by setting an environment variable called `INCIDENT_FILE`. This file will be read and both location and time data parsed for centering the map and accessing weather data at the time of the incident. To start with I've copied the json files into the `data` folder and added an import in Map.js. 

3) Next step would be to display the incident on the map and show a popup that includes weather for that given incident. Weather data will come from https://dev.meteostat.net as recommended. Here's a snippet using jQuery that could be used to access point data from incident in `F01705150050.json`:

    ```
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://meteostat.p.rapidapi.com/point/hourly?lat=37.541885&lon=-77.440624&start=2017-05-15&end=2017-05-15&alt=113",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "meteostat.p.rapidapi.com",
            "x-rapidapi-key": "4594948cdfmsh0a2045819672ea7p195b51jsn35fbbd88c0d2"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    ```

    It returns weather data for each hour in the day, so the correct timeframe would be selected from the response to display in the popup (see step 4).

4) Now that we have determined the location and weather at time of incident, we can display the weather result in a popup. I'd start by following this [example](https://docs.mapbox.com/mapbox-gl-js/example/popup/). Something like this:

    ```
    const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat([lng, lat])
    .setHTML('<h1>My weather html segment</h1>')
    .addTo(map);
    ```

5) Now that the incident is plotted along with weather at the time of the incident, we could begin to add improvements. I'd start with the following:
 
  - Refactor app components to follow React/JS best practices
  - Add a file upload mechanism which allows user to upload their own incident files as opposed to setting an environment env
  - Externalize any configuration data that's hard-coded (ex: rapidapi-key)
  - Add more intuitive styling for weather in the popup, perhaps use icons for sunny, windy, raining, etc.
  - Containerize the app using a hardened NGINX runtime