import { gql } from 'apollo-boost';

/* User Queries */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      _id
      locations {
        locationname
        address
      } 
      sightings {
        commonname
      }
    }
  }
`;

/* Location Queries */

// export const GET_ALL_LOCATIONS = gql`
//   query($username: String!) {
//     getAllLocations(username: $username) {
//       _id
//       locationname
//       address
//       username
//     }
//   }
// `;

export const GET_LOCATION = gql`
  query($_id: ID!) {
    getLocation(_id: $_id) {
      _id
      locationname
      address
    }
  }  
`;

/* Sighting Queries */

export const GET_SIGHTING = gql`
  query($_id: ID!) {
    getSighting(_id: $_id) {
      _id
      locationname
      commonname
      latinname
      imageUrl
      imageCredit
      date
      latitude
      longitude
    }
  }  
`;

// export const GET_ALL_SIGHTINGS = gql`
//   query($username: String!) {
//     getAllSightings(username: $username) {
//       _id
//       locationname
//       commonname
//       latinname
//       imageUrl
//       date
//       latitude
//       longitude
//     }
//   }
// `;

// export const GET_LOCATION_SIGHTINGS = gql`
//   query($locationname: String!, $username: String!) {
//     getLocationSightings(locationname: $locationname, username: $username) {
//       _id
//       locationname
//       commonname
//       latinname
//       imageUrl
//       date
//       latitude
//       longitude
//     }
//   }
// `;

// export const GET_LOCATION_MUSHROOM_SIGHTINGS = gql`
//   query($locationname: String!, $commonname: String!, $username: String!) {
//     getLocationMushroomSightings(locationname: $locationname, commonname: $commonname, username: $username) {
//       _id
//       locationname
//       commonname
//       latinname
//       imageUrl
//       date
//       latitude
//       longitude
//     }
//   }
// `;

/*SEARCH*/
// export const SEARCH_SIGHTINGS = gql`
//   query($searchTerm: String, $username: String) {
//     searchSightings(searchTerm: $searchTerm, username: $username) {
//       _id
//       commonname
//       locationname
//       date
//     }
//   }
// `;

/* Mushroom Queries */

// export const GET_MUSHROOM = gql`
//   query($_id: ID!) {
//     getMushroom(_id: $_id) {
//       _id
//       commonname
//       latinname
//       imageUrl
//     }
//   }  
// `;

// export const GET_ALL_MUSHROOMS = gql`
//   query($username: String!) {
//     getAllMushrooms(username: $username) {
//       _id
//       commonname
//       latinname
//       imageUrl
//     }
//   }
// `;

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

/* Location Mutations */

export const ADD_LOCATION = gql`
  mutation(
    $_id: ID!,
    $locationname: String!,
    $address: String!    
  ) {
    addLocation(
      _id: $_id,
      locationname: $locationname,
      address: $address      
    ) {
      _id
      locationname
      address
    }
  }
`;

/* Sighting Mutations */

export const ADD_SIGHTING = gql`
  mutation(
    $_id: ID!,
    $commonname: String!,
    $latinname: String,
    $imageUrl: String!,  
    $imageCredit: String,  
    $date: String!,
    $latitude: String!,
    $longitude: String!
  ) {
    addSighting(
      _id: $_id,
      commonname: $commonname,
      latinname: $latinname,
      imageUrl: $imageUrl,
      imageCredit: $imageCredit   
      date: $date,
      latitude: $latitude,
      longitude: $longitude
    ) {
      _id
      locationname
      commonname
      latinname
      imageUrl
      imageCredit
      date
      latitude
      longitude
    }
  }
`;

export const DELETE_SIGHTING = gql`
  mutation($_id: ID!) {
    deleteSighting(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_SIGHTING = gql`
  mutation(
    $_id: ID!, 
    $locationname: String!,
    $commonname: String!,
    $latinname: String,
    $imageUrl: String,
    $imageCredit: String,
    $date: String!,
    $latitude: String,
    $longitude: String
  ) {
    updateSighting(
      _id: $_id, 
      locationname: $locationname,
      commonname: $commonname,
      latinname: $latinname,
      imageUrl: $imageUrl,
      imageCredit: $imageCredit,
      date: $date,
      latitude: $latitude,
      longitude: $longitude
    )
      {
        _id
        locationname
        commonname
        latinname
        imageUrl
        imageCredit
        date
        latitude
        longitude
      }
  }  
`;

/* Mushroom Mutations */

export const ADD_MUSHROOM = gql`
  mutation(
    $username: String!,
    $commonname: String!,
    $latinname: String,
    $imageUrl: String!,    
  ) {
    addMushroom(
      username: $username,
      commonname: $commonname,
      latinname: $latinname,
      imageUrl: $imageUrl,      
    ) {
      _id,
      commonname
      latinname
      imageUrl
    }
  }
`;
