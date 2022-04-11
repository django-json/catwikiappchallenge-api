const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

global._db;

function connectToServer(callback) {
  client.connect((error, db) => {
    if (db) {
      _db = db.db(`${process.env.DATABASE_NAME}`);

      console.log("Successfully connected to MongoDB");
    }

    return callback(error);
  });
}

function getDb() {
  return _db;
}

module.exports = {
  connectToServer,
  getDb,
};
