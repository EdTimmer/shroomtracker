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
    _id: ID
    locationname: String!
    address: String!
    sightings: [Sighting]
  }

  type Sighting {
    _id: ID
    commonname: String!
    latinname: String
    imageUrl: String
    imageCredit: String   
    date: String!
    latitude: String
    longitude: String
   }



  type Query {

    getLocation(_id: ID!): Location

    getSighting(_id: ID!): Sighting

    searchSightings(searchTerm: String, userId: String): [Sighting]
    
    getCurrentUser: User
   

  }

  type Token {
    token: String!
  }

  type Mutation {

    addLocation(
      userId: String!
      locationname: String!
      address: String!      
    ): Location

    addSighting(
      userId: String!
      locationId: String!
      commonname: String!
      latinname: String
      imageUrl: String
      imageCredit: String
      date: String!
      latitude: String
      longitude: String      
    ): Sighting


    deleteSighting(_id: ID!): Sighting

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
      password: String!,
      
    ) : Token

    signinUser(
      username: String!,
      password: String!
    ) : Token
  }
`;
