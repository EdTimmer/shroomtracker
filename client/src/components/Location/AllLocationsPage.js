import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';

// import { Query } from 'react-apollo';
// import { GET_ALL_LOCATIONS } from '../../queries';

import withAuth from '../withAuth';
// import LocationItem from './LocationItem';
// import Spinner from '../Spinner';
// import Error from '../Error';
// import mushrooms2 from '../../images/mushrooms2.jpg';
import mushrooms4 from '../../images/mushrooms4.jpg';

class AllLocationsPage extends Component {

  state = {
    // username: '',
    locations: []
  }

  componentDidMount() {
    this.setState({
      // username: this.props.session.getCurrentUser.username,
      locations: this.props.session.getCurrentUser.locations
    });
  }

  render() {
    const { locations } = this.state;
    console.log('current user:', this.props.session.getCurrentUser.locations)
    // const {currentUserLocations} = this.props.session.getCurrentUser ? this.props.session.getCurrentUser.locatoins : 'test';
    if (!locations) {
      return null;
    }
    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
        <h1 className="main-title">
          <strong>My Locations</strong>
        </h1>
        <div>
          {
            locations.map(location => {
              return (                
                <Link to={`/locations/${location._id}`}><h4 style={{color: 'white'}}>{location.locationname}</h4></Link>
              )
            })
          }
        </div>

      </div>

    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AllLocationsPage));
