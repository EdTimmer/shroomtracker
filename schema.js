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
    mushrooms: [Mushroom!]!
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
    date: String!
    latitude: String
    longitude: String
    user: User!
    location: Location!
    mushroom: Mushroom!
   }

  type Mushroom {
    _id: ID!
    commonname: String!
    latinname: String!
    imageUrl: String
    imageCredit: String
    newMushroom: Boolean
    user: User!
    sightings: [Sighting!]!    
  }

  type Query {

    getCurrentUser: User

    getLocation(_id: ID!): Location

    getSighting(_id: ID!): Sighting

    getMushroom(_id: ID!): Mushroom    

    getMyLocations(user: ID!): [Location]

    getMySightings(user: ID!): [Sighting]

    getMyMushrooms(user: ID!): [Mushroom]

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

    deleteLocation(_id: ID, user: ID!, mushroom: ID!): Location

    addSighting(
      user: ID!
      location: ID! 
      mushroom: ID!     
      date: String!
      latitude: String
      longitude: String
    ): Sighting

    deleteSighting(_id: ID!, user: ID!, location: ID!, mushroom: ID!): Sighting

    updateSighting(
      _id: ID! 
      user: ID!
      location: ID!
      mushroom: ID!
      date: String!
      latitude: String
      longitude: String
    ): Sighting

    addMushroom(
      user: ID!
      location: ID!
      commonname: String!
      latinname: String
      imageUrl: String!
      imageCredit: String
      newMushroom: Boolean
    ): Mushroom

    deleteMushroom(_id: ID, user: ID!, location: ID!, sighting: ID!): Mushroom

    updateMushroom(
      _id: ID! 
      commonname: String!
      latinname: String
      imageUrl: String
      imageCredit: String
    ): Mushroom

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
