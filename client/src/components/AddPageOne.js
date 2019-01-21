import React from 'react';
import withAuth from './withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_MY_LOCATIONS } from '../queries';
import Spinner from './Spinner';
import Error from './Error';
import MyLocationsList from './Location/MyLocationsList'

import mushrooms4 from '../images/mushrooms4.jpg';

class AddPageOne extends React.Component {
  state = {
    locations: '',
    user: '',
  }

  componentDidMount() {
    this.setState({      
      locations: this.props.session.getCurrentUser.locations,
      user: this.props.session.getCurrentUser._id
    });
  }

  render() {
    const { locations, user } = this.state;
    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
      
        <h1 className="main-title">
          <strong>Add A Mushroom Sighting</strong>
        </h1>
        
        <ul>
          <li>
              <h3>New Location?</h3>
              <h4><NavLink to="/location/add" exact>Add A New Location</NavLink></h4>
          </li>
          <li>
              <h3>New Mushroom?</h3>
              <h4><NavLink to="/mushroom/add" exact>Add A New Mushroom</NavLink></h4>
          </li>
          <li>
              <h3>To A Saved Location:</h3>
          </li>
        </ul>

            <MyLocationsList user={user} />

        {/*<div>                          
          {
            locations.length ? (
              <ul>                  
                {
                  locations.map(location => 
                    <li key={location._id} value={location.locationname}> 
                    
                      <Link to={{ pathname: '/addpagetwo', state: { location: location._id, locationname: location.locationname } }}>
                        {location.locationname} 
                      </Link>                          
                    
                    </li>)
                }
              </ul>
            ) : (<div><p>You have no saved locations</p></div>)            
          }
        </div>*/}

  
      </div>
    )
  }
} 
  


export default withAuth(session => session && session.getCurrentUser)(withRouter(AddPageOne));