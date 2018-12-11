// const { gql } = require('apollo-server-express');

exports.typeDefs = `

  type User {
    _id: ID
    username: String! @unique 
    password: String!
    email: String!
    joinDate: String
  }

  type Location {
    _id: ID!
    locationname: String!
    address: String!
    username: String!
  }

  type Mushroom {
    _id: ID!
    commonname: String!
    latinname: String
    locationname: String!
    imageUrl: String!
    date: String!
    coordinates: String
    username: String!
  }

  type Query {

    getAllLocations: [Location]

    getLocation(_id: ID!): Location

    getAllMushrooms: [Mushroom]

    getMushroom(_id: ID!): Mushroom

    getLocationMushrooms(locationname: String!): [Mushroom]

    searchMushrooms(searchTerm: String): [Mushroom]

    getCurrentUser: User

  }

  type Token {
    token: String!
  }

  type Mutation {

    addLocation(
      locationname: String!,
      address: String!,
      username: String!
    ): Location

    addMushroom(
      commonname: String!,
      latinname: String,
      locationname: String!,
      imageUrl: String!,
      date: String!,
      coordinates: String,
      username: String!
    ): Mushroom

    singupUser(
      username: String!,
      email: String!,
      password: String!
    ) : Token

    signinUser(
      username: String!,
      password: String!
    ) : Token
  }
`;