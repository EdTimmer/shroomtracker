import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_MY_LOCATIONS } from '../../queries';
import withAuth from '../withAuth';
import Spinner from '../Spinner';
import Error from '../Error';
// import SightingItemLocation from '../Sighting/SightingItemLocation';
// import mushrooms4 from '../../images/mushrooms4.jpg';

const MyLocationsList = ({ user }) => {
  
  return (
    <Query query={GET_MY_LOCATIONS} variables={{ user }}>
      {
        ({ data, loading, error }) => {
          if (loading) return <Spinner />
          if (error) return <Error error={error} />
          // console.log(data.getLocation.username);
          return (            
              <div>
                {
                  data.getMyLocations.length ? (
                    <ul>                  
                      {
                        data.getMyLocations.map(location => 
                          <li key={location._id} value={location.locationname}> 
                          
                            <Link to={{ 
                              pathname: '/selectmushroom', 
                              state: { 
                                location: location._id, 
                                locationname: location.locationname
                              } 
                            }}>
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
  )
}

// export default withAuth(session => session && session.getCurrentUser)(withRouter(MyLocationsList));
export default withRouter(MyLocationsList);