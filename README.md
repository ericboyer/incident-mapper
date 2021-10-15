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
2) Incident files will be determined by setting an environment variable called `INCIDENT_FILE`. This file will be read and both location and time data parsed for centering the map and accessing weather data at the time of the incident. To start with I've copied the json files into the `data` folder.
3) Next step would be to display the incident on the map and show a popup that includes weather for that given incident. We'll query https://dev.meteostat.net as recommended. 