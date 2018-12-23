// const { gql } = require('apollo-server-express');

exports.typeDefs = `

  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    joinDate: String
    locations: [Location]
    sightings: [Sighting]
  }

  type Location {
    _id: ID!
    locationname: String!
    address: String!
    sightings: [Sighting]
  }

  type Sighting {
    _id: ID!
    commonname: String!
    latinname: String
    imageUrl: String
    imageCredit: String   
    date: String!
    latitude: String
    longitude: String
   }

  type Mushroom {
    _id: ID!
    commonname: String!
    latinname: String!
    imageUrl: String
    locations: [Location]
    sighting: [Sighting]
  }

  type Query {

    getLocation(_id: ID!): Location

    getSighting(_id: ID!): Sighting

    location: [Location]

    sightings: [Sighting]

    getLocationSightings(_id: ID!): [Sighting]

    searchSightings(searchTerm: String, username: String): [Sighting]
    
    getMushroom(_id: ID!): Mushroom

    mushrooms: [Mushroom]

    getCurrentUser: User

  }

  type Token {
    token: String!
  }

  type Mutation {

    addLocation(
      locationname: String!,
      address: String!
    ): Location

    addSighting(
      commonname: String!
      latinname: String
      imageUrl: String
      imageCredit: String
      date: String!
      latitude: String
      longitude: String
    ): Sighting

    addMushroom(
      commonname: String!
      latinname: String,
      imageUrl: String,
    ): Mushroom

    deleteSighting(_id: ID): Sighting

    updateSighting(
      _id: ID! 
      commonname: String!
      latinname: String
      imageUrl: String
      imageCredit: String
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
