const request = require("postman-request");

const forecast = (latitude, longitude, callback, units) => {
  const url =
    //Query String                //starts with a ?
    "http://api.weatherstack.com/current?access_key=4e0773ecc3f2d20b94d2792b12ed7e30&query=" +
    latitude +
    "," +
    longitude +
    "&units=" +
    units;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions}, It is currently ${body.current.temperature} degress out.`
      );
    }
  });
};

module.exports = forecast;
