const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const User = require('./models/User');
const Location = require('./models/Location');
const Mushroom = require('./models/Mushroom');
const Sighting = require('./models/Sighting');

// Bring in GraphQL-Express middlewarequire

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

//create schema

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

//Connect to database 

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB is connected'))
  .catch(err => console.error(err))

//Initialize application 

const app = express();

app.use(cors('*'));

// Set up JWT authentication middleware

app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

// Create GraphiQL application 

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

//Connect schemas with GraphQL

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      User,
      Location,
      Mushroom,
      Sighting,
      currentUser
    }
  }))
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

