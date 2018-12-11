import React, { Component } from 'react';
import '../App.css';

import { Query } from 'react-apollo';
import { GET_ALL_LOCATIONS } from '../queries';

import LocationItem from './LocationItem';
import Spinner from '../Spinner';

class AllLocationsPage extends Component {

  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          My <strong>Shrooms</strong> Locations
        </h1>
        <Query query={GET_ALL_LOCATIONS}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>

            return (
              <div>
                {
                  data.getAllLocations.map(location => (
                    <LocationItem key={location._id} {...location} />
                  ))
                }
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default AllLocationsPage;
