import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import '../App.css';

import { Query } from 'react-apollo';
import { GET_ALL_MUSHROOMS } from '../../queries';

import MushroomItem from './MushroomItem';
import Spinner from '../Spinner';

class AllMushroomsPage extends Component {
  ;
  render() {
    const username = this.props.session.getCurrentUser.username;
    // console.log(this.props.session.getCurrentUser.username)
    return (
      <div className="App">
        <h1 className="main-title">
          My <strong>Myshrooms</strong>
        </h1>
        <Query query={GET_ALL_MUSHROOMS} variables={{username}}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>

            return (
              <div>
                {
                  data.getAllMushrooms.map(mushroom => (
                    <MushroomItem key={mushroom._id} {...mushroom} />
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(AllMushroomsPage));
