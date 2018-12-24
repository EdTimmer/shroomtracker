import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from '../../queries';

import withAuth from '../withAuth';
import LocationItem from './LocationItem';
import Spinner from '../Spinner';
import Error from '../Error';
// import mushrooms2 from '../../images/mushrooms2.jpg';
import mushrooms4 from '../../images/mushrooms4.jpg';

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
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
        <h1 className="main-title">
          <strong>My Locations</strong>
        </h1>
        <Query query={GET_CURRENT_USER} variables={{username}}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <Error error={error} />
              console.log(data)
            return (
              <div>
                {
                  data.getCurrentUser.locations.map(location => (
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
