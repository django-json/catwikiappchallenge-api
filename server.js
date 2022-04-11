const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const axios = require("axios");
const { param } = require("express-validator");

// Require dotenv in development
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const dbo = require("./database/connection");
const breeds = require("./controllers/breeds");

const app = express();
const PORT = process.env.PORT || 3001;
const TheCatAPIClient = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: {
    "x-api-key": process.env.CAT_API_KEY,
  },
});

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.get(
  "/breeds/:name",
  [param("name").isLength({ min: 1 }).trim().escape()],
  breeds.searchBreedsByName(TheCatAPIClient)
);

app.get("/image/:id", breeds.getBreedImage(TheCatAPIClient));

app.get("/images/:id", breeds.getBreedImages(TheCatAPIClient));

app.get("/popular-breeds", breeds.getPopularBreeds(dbo));

app.post("/popular-breeds", breeds.addOrUpdatePopularBreeds(dbo));

app.listen(PORT, (error) => {
  if (error) throw error;
  // Perform database connection when server starts
  dbo.connectToServer((error) => {
    if (error) throw new Error(error);
  });

  console.log(`App is listening to port ${PORT}`);
});
