const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3001;
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Calvin Nelson",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Calvin Nelson",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Can we help you?.",
    title: "Help",
    name: "Calvin Nelson",
  });
});

app.get("/weather", (req, res) => {
  const { _, units } = req.query;
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(
        latitude,
        longitude,
        (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          });
        },
        units
      );
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Calvin Nelson",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Calvin Nelson",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3001.");
});
