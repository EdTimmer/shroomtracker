// const { gql } = require('apollo-server-express');

exports.typeDefs = `

  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    joinDate: String
    locations: [Location!]!
    sightings: [Sighting!]!
  }

  type Location {
    _id: ID!
    locationname: String!
    address: String!
    username: String!
    user: User!
  }

  type Sighting {
    _id: ID!
    username: String!
    locationname: String!
    commonname: String!
    latinname: String
    imageUrl: String
    imageCredit: String   
    date: String!
    latitude: String
    longitude: String
    user: User!
    location: Location!
   }

  type Mushroom {
    _id: ID!
    username: String!
    commonname: String!
    latinname: String!
    imageUrl: String
  }

  type Query {

    getAllLocations(username: String!): [Location]

    getLocation(_id: ID!): Location

    getSighting(_id: ID!): Sighting

    getAllSightings(username: String!): [Sighting]

    getLocationSightings(locationname: String!, username: String!): [Sighting]

    getLocationMushroomSightings(locationname: String!, username: String!, commonname: String!): [Sighting]

    searchSightings(searchTerm: String, username: String): [Sighting]
    
    getMushroom(_id: ID!): Mushroom

    getAllMushrooms(username: String!): [Mushroom]

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

    addSighting(
      username: String!
      locationname: String!
      commonname: String!
      latinname: String
      imageUrl: String
      imageCredit: String
      date: String!
      latitude: String
      longitude: String
    ): Sighting

    addMushroom(
      username: String!
      commonname: String!
      latinname: String,
      imageUrl: String,
    ): Mushroom

    deleteSighting(_id: ID): Sighting

    updateSighting(
      _id: ID! 
      locationname: String!
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
