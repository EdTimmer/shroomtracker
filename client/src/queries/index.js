import { gql } from 'apollo-boost';

/* Location Queries */

export const GET_ALL_LOCATIONS = gql`
  query {
    getAllLocations {
      _id
      locationname
      address
    }
  }
`;

export const GET_LOCATION = gql`
  query($_id: ID!) {
    getLocation(_id: $_id) {
      _id
      locationname
      address
    }
  }  
`;

/* Mushroom Queries */

export const GET_ALL_MUSHROOMS = gql`
  query {
    getAllMushrooms {
      _id
      commonname
      latinname
      imageUrl
      date
      coordinates
    }
  }
`;

/* Location Mutations */

export const ADD_LOCATION = gql`
  mutation(
    $locationname: String!,
    $address: String!
  ) {
    addLocation(
      locationname: $locationname,
      address: $address,
    ) {
      _id
      locationname
      address
    }
  }
`;

/* Mushroom Mutations */

export const ADD_MUSHROOM = gql`
  mutation(
    $commonname: String!,
    $latinname: String,
    $locationname: String!,
    $imageUrl: String!,
    $date: String!,
    $coordinates: String
  ) {
    addMushroom(
      commonname: $commonname,
      latinname: $latinname,
      locationname: $locationname,
      imageUrl: $imageUrl,
      date: $date,
      coordinates: $coordinates
    ) {
      _id
      commonname,
      latinname,
      locationname,
      imageUrl,
      date,
      coordinates
    }
  }
`;



