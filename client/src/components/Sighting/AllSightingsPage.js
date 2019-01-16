import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import '../App.css';

// import { Query } from 'react-apollo';
// import { GET_ALL_SIGHTINGS } from '../../queries';

import SightingItem from './SightingItem';
// import Spinner from '../Spinner';
// import Error from '../Error';
import mushrooms4 from '../../images/mushrooms4.jpg'

class AllSightingsPage extends Component {

  render() {
    const sightings = this.props.session.getCurrentUser.sightings;
    // console.log(this.props.session.getCurrentUser.username)
    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
        <h1 className="main-title">
          <strong>My Mushroom Sightings</strong> 
        </h1>

        <div className="cards">
          {
            sightings.map(sighting => (
              <SightingItem key={sighting._id} {...sighting} />
            ))
          }
        </div>

      </div>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AllSightingsPage));
