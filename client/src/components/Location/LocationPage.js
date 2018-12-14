import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';

import { Query } from 'react-apollo';
import { GET_LOCATION, GET_LOCATION_SIGHTINGS } from '../../queries';
import Spinner from '../Spinner';
import SightingItem from '../Sighting/SightingItem';

const LocationPage = ({ match }) => {
  const { _id } = match.params;
  
  return (
    <Query query={GET_LOCATION} variables={{ _id }}>
      {
        ({ data, loading, error }) => {
          if (loading) return <Spinner />
          if (error) return <div>Error</div>
          // console.log(data.getLocation.username);
          return (
            
            <div className="App">
              <div>
                <h2>{data.getLocation.locationname}</h2>
                <h5>{data.getLocation.address}</h5>
              </div>

              <Query query={GET_LOCATION_SIGHTINGS} variables={{locationname: data.getLocation.locationname, username: data.getLocation.username}}>
                {({ data, loading, error }) => {
                  if (loading) return <Spinner />
                  if (error) return <div>Error</div>
                  console.log(data)
                  // const { on } = this.state;
                  return (
                    <div className="cards"
                    >
                      {
                        data.getLocationSightings.map(sighting => (
                          <SightingItem key={sighting._id} {...sighting} />
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
    </Query>
  )
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(LocationPage));
