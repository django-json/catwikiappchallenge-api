function getPopularBreeds(db_connect) {
  return new Promise((resolve, reject) => {
    db_connect
      .collection("popular_breeds")
      .find({})
      .toArray((error, result) => {
        if (error) {
          reject(new Error("Failed to retrieve documents"));
        } else {
          resolve(result);
        }
      });
  });
}

function updatePopularBreeds(db_connect, query, newValues) {
  return new Promise((resolve, reject) => {
    db_connect
      .collection("popular_breeds")
      .updateOne(query, { $set: newValues }, function (error, result) {
        if (error) {
          reject(new Error("Updating document failed"));
        } else {
          resolve(result);
        }
      });
  });
}

function addPopularBreed(db_connect, document) {
  return new Promise((resolve, reject) => {
    db_connect
      .collection("popular_breeds")
      .insertOne(document, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
  });
}

function checkDocumentExist(db_connect, query) {
  return new Promise((resolve, reject) => {
    db_connect.collection("popular_breeds").findOne(query, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  getPopularBreeds,
  updatePopularBreeds,
  addPopularBreed,
  checkDocumentExist,
};
