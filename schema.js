// const { gql } = require('apollo-server-express');

exports.typeDefs = `

  type Location {
    _id: ID!
    locationname: String!
    address: String!
  }

  type Mushroom {
    _id: ID!
    commonname: String!
    latinname: String
    locationname: String!
    imageUrl: String!
    date: String!
    coordinates: String
  }

  type Query {

    getAllLocations: [Location]
    getLocation(_id: ID!): Location

    getAllMushrooms: [Mushroom]
    getMushroom(_id: ID!): Mushroom

    searchMushrooms(searchTerm: String): [Mushroom]
  }

  type Mutation {

    addLocation(
      locationname: String!
      address: String!
    ): Location

    addMushroom(
      commonname: String!
      latinname: String
      locationname: String!
      imageUrl: String!
      date: String!
      coordinates: String
    ): Mushroom
  }

`;