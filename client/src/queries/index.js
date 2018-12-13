import { gql } from 'apollo-boost';

/* User Queries */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
    }
  }
`;

/* Location Queries */

export const GET_ALL_LOCATIONS = gql`
  query($username: String!) {
    getAllLocations(username: $username) {
      _id
      locationname
      address
      username
    }
  }
`;

export const GET_LOCATION = gql`
  query($_id: ID!) {
    getLocation(_id: $_id) {
      _id
      locationname
      address
      username
    }
  }  
`;

/* Mushroom Queries */

export const GET_ALL_MUSHROOMS = gql`
  query($username: String!) {
    getAllMushrooms(username: $username) {
      _id
      commonname
      latinname
      imageUrl
      username
    }
  }
`;

export const GET_MUSHROOM = gql`
  query($_id: ID!) {
    getMushroom(_id: $_id) {
      _id
      commonname
      latinname
      imageUrl
      username
    }
  }  
`;

export const GET_LOCATION_MUSHROOMS = gql`
  query($locationname: String!, $username: String!) {
    getLocationMushrooms(locationname: $locationname, username: $username) {
      _id
      commonname
      imageUrl
      username
    }
  }
`;

/* Sighting Queries */

export const GET_ALL_LOCATION_MUSHROOM_SIGHTINGS = gql`
  query($locationname: String!, $commonname: String!, $username: String!) {
    getAllLocationMushroomSightings(locationname: $locationname, commonname: $commonname, username: $username) {
      _id

    }
  }
`;



// GET_ALL_MUSHROOM_SIGHTINGS,


/* Location Mutations */

export const ADD_LOCATION = gql`
  mutation(
    $locationname: String!,
    $address: String!,
    $username: String!
  ) {
    addLocation(
      locationname: $locationname,
      address: $address,
      username: $username
    ) {
      _id
      locationname
      address
      username
    }
  }
`;

/* Mushroom Mutations */

export const ADD_MUSHROOM = gql`
  mutation(
    $commonname: String!,
    $latinname: String,
    $imageUrl: String!,
    $username: String!
  ) {
    addMushroom(
      commonname: $commonname,
      latinname: $latinname,
      imageUrl: $imageUrl,
      username: $username
    ) {
      _id,
      commonname,
      latinname,
      imageUrl,
      username
    }
  }
`;

/* Sighting Mutations */

export const ADD_SIGHTING = gql`
  mutation(
    $commonname: String!,
    $locationname: String!,
    $username: String!,
    $date: String!,
    $latitude: String!,
    $longitude: String!
  ) {
    addSighting(
      commonname: $commonname,
      locationname: $locationname,
      username: $username,
      date: $date,
      latitude: $latitude,
      longitude: $longitude
    ) {
      _id,
      locationname,
      date,
      latitude,
      longitude
    }
  }
`;

/* User Mutations */

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;


