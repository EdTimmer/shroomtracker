import React from 'react';
import withAuth from '../withAuth';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import MyLocationsList from '../Location/MyLocationsList'

import mushrooms4 from '../../images/mushrooms4.jpg';
import templateMushrooms from '../templateMushrooms';

class SelectLocation extends React.Component {
  state = {
    locations: '',
    user: '',
  }

  componentDidMount() {
    this.setState({      
      locations: this.props.session.getCurrentUser.locations,
      user: this.props.session.getCurrentUser._id,
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
      
        <h1 className="main-title">
          <strong>Select Location</strong>
        </h1>
        
        <h3>My Saved Locations:</h3>  

        <div>          
          <MyLocationsList user={user} />             
          <h4>or</h4>                       
          <h3>
            <NavLink style={{color: 'white'}} to={{
              pathname: "/location/add"                                            
            }}>
              Add A New Location
            </NavLink>
          </h3>
        </div>

      </div>
    )
  }
} 
  


export default withAuth(session => session && session.getCurrentUser)(withRouter(SelectLocation));