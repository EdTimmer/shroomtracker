import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_LOCATION, GET_LOCATION_SIGHTINGS } from '../../queries';
import withAuth from '../withAuth';
import Spinner from '../Spinner';
import Error from '../Error';
import SightingItemLocation from '../Sighting/SightingItemLocation';
import mushrooms4 from '../../images/mushrooms4.jpg';

const LocationPage = ({ match }) => {
  const { _id } = match.params;
  
  return (
    <Query query={GET_LOCATION} variables={{ _id }}>
      {
        ({ data, loading, error }) => {
          if (loading) return <Spinner />
          if (error) return <Error error={error} />
          // console.log(data.getLocation.username);
          return (
            
            <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
              <div>
                <h2>{data.getLocation.locationname}</h2>
                <h5>{data.getLocation.address}</h5>
              </div>

              <Query query={GET_LOCATION_SIGHTINGS} variables={{locationname: data.getLocation.locationname, username: data.getLocation.username}}>
                {({ data, loading, error }) => {
                  if (loading) return <Spinner />
                  if (error) return <div>Error</div>
                  // console.log(data)
                  // const { on } = this.state;
                  return (
                    <div className="cards"
                    >
                      {
                        data.getLocationSightings.map(sighting => (
                          <SightingItemLocation key={sighting._id} {...sighting} />
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
