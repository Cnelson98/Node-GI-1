const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    //Query String                //starts with a ?
    "http://api.weatherstack.com/current?access_key=4e0773ecc3f2d20b94d2792b12ed7e30&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions}, It is currently ${response.body.current.temperature} degress out.`
      );
    }
  });
};

module.exports = forecast;
