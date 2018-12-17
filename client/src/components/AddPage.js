import React from 'react';
import withAuth from './withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import Spinner from './Spinner';

import { Query } from 'react-apollo';
import { GET_ALL_LOCATIONS } from '../queries';
import Error from './Error';

class AddPage extends React.Component {
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

        <h4 style={{marginTop: '20px'}}>Add A Mushroom Sighting</h4>

        <ul>
          <li>
              <h3><NavLink to="/location/add" exact>To A New Location</NavLink></h3>
          </li>
          <li>
              <h3>To A Saved Location:</h3>
          </li>
        </ul>

        <Query query={GET_ALL_LOCATIONS} variables={{username}}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>

            return (
              <div>                          
                {

                  data.getAllLocations.length ? (
                    <ul>                  
                      {
                        data.getAllLocations.map(location => 
                          <li key={location._id} value={location.locationname}> 
                          
                            <Link to={{ pathname: '/addpagetwo', state: { passedlocationname: location.locationname } }}>
                              {location.locationname} 
                            </Link>                          
                          
                          </li>)
                      }
                    </ul>
                  ) : (<div><p>You have no saved locations</p></div>)
                  
                }
              </div>
            )
          }}
        </Query>
  
      </div>
    )
  }
} 
  


export default withAuth(session => session && session.getCurrentUser)(withRouter(AddPage));