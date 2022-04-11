const BreedsModel = require("../models/breeds");
const { validationResult } = require("express-validator");

const { isObjectEmpty } = require("../utils/utils");

function searchBreedsByName(TheCatAPIClient) {
  return async function (req, res) {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (!hasErrors) {
      const { name } = req.params;

      try {
        const response = await TheCatAPIClient.get(`breeds/search?q=${name}`);
        const breeds = await response.data;

        if (breeds.length > 0) {
          res.status(200).json(breeds);
        } else {
          res.send("No results found");
        }
      } catch (error) {
        res.status(400).json(error);
      }
    } else {
      res
        .status(400)
        .send(
          "An error occurred. Please make sure the input value is aphanumeric only."
        );
    }
  };
}

function getBreedImages(TheCatAPIClient) {
  return async function (req, res) {
    const { id } = req.params;

    try {
      const response = await TheCatAPIClient.get(
        `images/search?breed_id=${id}&limit=8`
      );
      const images = await response.data;

      if (images.length > 0) {
        res.status(200).json(images);
      } else {
        res.send("No results found");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

function getBreedImage(TheCatAPIClient) {
  return async function (req, res) {
    const { id } = req.params;

    try {
      const response = await TheCatAPIClient.get(`images/${id}`);
      // Only an image is returned by the api
      const image = await response.data;

      if (!isObjectEmpty(image)) {
        res.status(200).json(image);
      } else {
        res.send("No results found");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

function getPopularBreeds(dbo) {
  return async function (req, res) {
    const db_connect = dbo.getDb(`${process.env.DATABASE_NAME}`);
    const popularBreeds = await BreedsModel.getPopularBreeds(db_connect);

    if (popularBreeds.length > 0) {
      res.status(200).json(popularBreeds);
    } else {
      res.send("No results found");
    }
  };
}

function addOrUpdatePopularBreeds(dbo) {
  return function (req, res) {
    const { breed } = req.body;
    const db_connect = dbo.getDb(`${process.env.DATABASE_NAME}`);

    BreedsModel.getPopularBreeds(db_connect)
      .then((popularBreedsObj) => {
        if (popularBreedsObj.length > 0) {
          // Check if breed already exist in database
          // If exists, increment the breed search rank by 1
          BreedsModel.checkDocumentExist(db_connect, {
            reference_image_id: breed.reference_image_id,
          })
            .then((document) => {
              // Check if document (object) exist
              if (
                document &&
                Object.keys(document).length !== 0 &&
                Object.getPrototypeOf(document) === Object.prototype
              ) {
                const query = { reference_image_id: breed.reference_image_id };
                const newValues = { search_rank: document.search_rank + 1 };

                updatePopularBreeds({ req, res, db_connect, query, newValues });
              } else {
                const document = {
                  ...breed,
                  search_rank: 1,
                };

                addPopularBreed({ req, res, db_connect, document });
              }
            })
            .catch((error) => res.status(400).json(error));
        } else {
          const document = {
            ...breed,
            search_rank: 1,
          };

          addPopularBreed({ req, res, db_connect, document });
        }
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  };
}

async function addPopularBreed({ req, res, db_connect, document }) {
  try {
    const result = await BreedsModel.addPopularBreed(db_connect, document);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function updatePopularBreeds({ req, res, db_connect, query, newValues }) {
  try {
    const result = await BreedsModel.updatePopularBreeds(
      db_connect,
      query,
      newValues
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = {
  searchBreedsByName,
  getBreedImage,
  getBreedImages,
  getPopularBreeds,
  addOrUpdatePopularBreeds,
};
