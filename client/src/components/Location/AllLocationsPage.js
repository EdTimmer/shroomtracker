import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';

import { Query } from 'react-apollo';
import { GET_MY_LOCATIONS } from '../../queries';

import withAuth from '../withAuth';
import Spinner from '../Spinner';
import Error from '../Error';
import mushrooms4 from '../../images/mushrooms4.jpg';

class AllLocationsPage extends Component {

  state = {
    user: '',
    locations: []
  }

  componentDidMount() {
    this.setState({
      user: this.props.session.getCurrentUser._id,
      locations: this.props.session.getCurrentUser.locations
    });
  }

  render() {
    const { user } = this.state;

    // if (!locations) {
    //   return null;
    // }
    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
        <h2 className="main-title">
          <strong>My Locations</strong>
        </h2>

        <Query query={GET_MY_LOCATIONS} variables={{ user }}>
          {
            ({ data, loading, error }) => {
              if (loading) return <Spinner />
              if (error) return <Error error={error} />
              
              return (            
                  <div>
                    {
                      data.getMyLocations.length ? (
                        <ul>                  
                          {
                            data.getMyLocations.map(location => 
                              <li key={location._id} value={location.locationname}> 
                              
                                <Link to={`/locations/${location._id}`}>
                                  <h4>{location.locationname}</h4> 
                                </Link>                          
                              
                              </li>)
                          }
                        </ul>
                      ) : (<div><p>You have no saved locations</p></div>)            
                    }
                  </div>                       
              )
            }
          }
        </Query>
        {/*<div>
          {
            locations.map(location => {
              return (                
                <Link to={`/locations/${location._id}`} key={location._id}><h4 style={{color: 'white'}}>{location.locationname}</h4></Link>
              )
            })
          }
        </div>*/}

      </div>

    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AllLocationsPage));
