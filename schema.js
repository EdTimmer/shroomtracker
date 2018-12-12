// const { gql } = require('apollo-server-express');

exports.typeDefs = `

  type User {
    _id: ID
    username: String!
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
    imageUrl: String!
    username: String!
  }

  type Sighting {
    _id: ID!
    commonname: String!
    locationname: String!
    username: String!
    date: String!
    latitude: String
    longitude: String
  }

  type Query {

    getAllLocations(username: String!): [Location]

    getLocation(_id: ID!): Location

    getAllMushrooms(username: String!): [Mushroom]

    getMushroom(_id: ID!): Mushroom

    getLocationMushrooms(locationname: String!): [Mushroom]

    getAllMushroomSightings(commonname: String!): [Sighting]

    getLocationMushroomSightings(locationname: String! commonname: String!): [Sighting]

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
      imageUrl: String!,
      username: String!
    ): Mushroom

    addSighting(
      commonname: String!
      locationname: String!
      username: String!
      date: String!
      latitude: String
      longitude: String
    ): Sighting

    signupUser(
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