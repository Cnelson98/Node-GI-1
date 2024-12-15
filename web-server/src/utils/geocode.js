const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    address +
    "&access_token=pk.eyJ1IjoiY25lbHNvbi0xOTk4IiwiYSI6ImNtNHA5OHNvOTBxN2IycXEyaWlmb3B1dGYifQ.r_D-Be2nyU858QpNXAw4wQ&limit=1";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].properties.coordinates.latitude,
        longitude: response.body.features[0].properties.coordinates.longitude,
        location: response.body.features[0].properties.full_address,
      });
    }
  });
};

module.exports = geocode;
