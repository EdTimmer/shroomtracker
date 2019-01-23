import { gql } from 'apollo-boost';

/* User Queries */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      joinDate
      email      
      locations {
        _id
        locationname
        address
      } 
      sightings {
        _id
        date
        latitude
        longitude
      }
      mushrooms {
        _id
        commonname
        latinname
        imageUrl
        imageCredit
        user {
          _id
        }
      }
    }
  }
`;

/* Location Queries */

export const GET_MY_LOCATIONS = gql`
  query($user: ID!) {
    getMyLocations(user: $user) {
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
      sightings {
        _id        
        date
        latitude
        longitude          
      }
      mushrooms {
        _id
        commonname
        latinname
        imageUrl
        imageCredit
      }
      user {
        _id
      }
    }
  }  
`;

/* Sighting Queries */

export const GET_SIGHTING = gql`
  query($_id: ID!) {
    getSighting(_id: $_id) {
      _id
      date
      latitude
      longitude
      location {
        _id
        locationname
      }
      mushroom {
        _id
        commonname
        latinname
        imageUrl
        imageCredit
      }
    }
  }  
`;

export const GET_MY_SIGHTINGS = gql`
  query($user: ID!) {
    getMySightings(user: $user) {
      _id
      date
      latitude
      longitude
      location {
        _id
        locationname
      }
      mushroom {
        _id
        commonname
        latinname
        imageUrl
        imageCredit
      }
    }
  }
`;

/* MUSHROOM QUERIES */

export const GET_MUSHROOM = gql`
  query($_id: ID!) {
    getMushroom(_id: $_id) {
      _id
      commonname
      latinname
      imageUrl
      imageCredit
    }
  }  
`;

export const GET_MY_MUSHROOMS = gql`
  query($user: ID!) {
    getMyMushrooms(user: $user) {
      _id
      commonname
      latinname
      imageUrl
      imageCredit
      user {
        _id
      }
    }
  }
`;


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
    $user: ID!,
    $locationname: String!,
    $address: String!    
  ) {
    addLocation(
      user: $user,
      locationname: $locationname
      address: $address
    ) {
      _id
      locationname
      address
    }
  }
`;

export const DELETE_LOCATION = gql`
  mutation($_id: ID!, $user: ID!) {
    deleteLocation(_id: $_id, user: $user) {
      _id
    }
  }
`;

/* Sighting Mutations */

export const ADD_SIGHTING = gql`
  mutation(
    $user: ID!,
    $location: ID!,
    $mushroom: ID!,
    $date: String!,
    $latitude: String!,
    $longitude: String!
  ) {
    addSighting(
      user: $user,
      location: $location,
      mushroom: $mushroom,
      date: $date,
      latitude: $latitude,
      longitude: $longitude
    ) {
      _id
      date
      latitude
      longitude
    }
  }
`;

export const DELETE_SIGHTING = gql`
  mutation($_id: ID!, $user: ID!, $location: ID!) {
    deleteSighting(_id: $_id, user: $user, location: $location) {
      _id
    }
  }
`;

export const UPDATE_SIGHTING = gql`
  mutation(
    $_id: ID!, 
    $location: ID!,
    $mushroom: ID!,    
    $date: String!,
    $latitude: String,
    $longitude: String
  ) {
    updateSighting(
      _id: $_id, 
      location: $location,
      mushroom: $mushroom,      
      date: $date,
      latitude: $latitude,
      longitude: $longitude
    )
      {
        _id        
        date
        latitude
        longitude
      }
  }  
`;

/* Mushroom Mutations */

export const ADD_MUSHROOM = gql`
  mutation(
    $user: ID!,
    $location: ID!,
    $commonname: String!,
    $latinname: String,
    $imageUrl: String!, 
    $imageCredit: String   
  ) {
    addMushroom(
      user: $user,
      location: $location,
      commonname: $commonname,
      latinname: $latinname,
      imageUrl: $imageUrl,  
      imageCredit: $imageCredit    
    ) {
      _id,
      commonname
      latinname
      imageUrl
      imageCredit
    }
  }
`;

export const DELETE_MUSHROOM = gql`
  mutation($_id: ID!, $user: ID!, $location: ID!, $sighting: ID!) {
    deleteSighting(_id: $_id, user: $user, location: $location, sighting: $sighting) {
      _id
    }
  }
`;