import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import '../App.css';

import { Query } from 'react-apollo';
import { GET_ALL_SIGHTINGS } from '../../queries';

import SightingItem from './SightingItem';
import Spinner from '../Spinner';

class AllSightingsPage extends Component {
  ;
  render() {
    const username = this.props.session.getCurrentUser.username;
    // console.log(this.props.session.getCurrentUser.username)
    return (
      <div className="App">
        <h1 className="main-title">
          My <strong>Mushroom</strong> Sightings 
        </h1>
        <Query query={GET_ALL_SIGHTINGS} variables={{username}}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>

            return (
              <div>
                {
                  data.getAllSightings.map(sighting => (
                    <SightingItem key={sighting._id} {...sighting} />
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(AllSightingsPage));
