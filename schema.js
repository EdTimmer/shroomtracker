// const { gql } = require('apollo-server-express');

exports.typeDefs = `

  type User {
    _id: ID!
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
    user: User!
    sightings: [Sighting!]!
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

    getCurrentUser: User

    getLocation(_id: ID!): Location

    getSighting(_id: ID!): Sighting

    getLocationMushroomSightings(_id: ID!, commonname: String!): [Sighting]

    searchSightings(_id: ID!, searchTerm: String): [Sighting]
    
    getMushroom(_id: ID!): Mushroom    

  }

  type Token {
    token: String!
  }

  type Mutation {

    addLocation(
      user: ID!
      locationname: String!
      address: String!    
    ): Location

    deleteLocation(_id: ID, user: ID!): Location

    addSighting(
      user: ID!
      location: ID!    
      commonname: String!
      latinname: String
      imageUrl: String
      imageCredit: String
      date: String!
      latitude: String
      longitude: String
    ): Sighting

    deleteSighting(_id: ID, user: ID!, location: ID!): Sighting

    updateSighting(
      _id: ID! 
      user: ID!
      location: ID!
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
