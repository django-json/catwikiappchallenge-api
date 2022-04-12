### catwikiappchallenge-api

The backend server for "catwikiappchallenge" project.

### How to use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/django-json/catwikiappchallenge-api

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## How to start using MongoDB

Please follow the guide [How to Use MERN Stack: A Complete Guide](https://www.mongodb.com/languages/mern-stack-tutorial).

## How to Fix "ReplicaSetNoPrimary and MongoServerSelectionError error while connecting MongoDB with Node.js"

Please follow the guide [Getting ReplicaSetNoPrimary and MongoServerSelectionError error while connecting MongoDB with nodejs](https://stackoverflow.com/questions/60063820/getting-replicasetnoprimary-and-mongoserverselectionerror-error-while-connecting).

## Available Routes

```
GET       "/"                   - to test the connection status of the API
GET       "/breeds/:name"       - to fetch breeds by name
GET       "/image/:id"          - to fetch breed's details with one image
GET       "/images/:id"         - to fetch breed's images (fix 8 images but may be lesser)
GET       "/popular-breeds"     - to fetch popular searched breeds
POST      "/popular-breeds      - to add or update popular searched breeds.
```
