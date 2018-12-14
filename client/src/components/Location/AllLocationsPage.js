import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

import { Query } from 'react-apollo';
import { GET_ALL_LOCATIONS } from '../../queries';

import withAuth from '../withAuth';
import LocationItem from './LocationItem';
import Spinner from '../Spinner';

class AllLocationsPage extends Component {

  state = {
    username: ''
  }

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  render() {
    const { username } = this.state;

    return (
      <div className="App">
        <h1 className="main-title">
          My <strong>Shrooms</strong> Locations
        </h1>
        <Query query={GET_ALL_LOCATIONS} variables={{username}}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>
              console.log(data)
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(AllLocationsPage));
