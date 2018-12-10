import React from 'react';

import { Query } from 'react-apollo';
import { GET_LOCATION, GET_ALL_MUSHROOMS, GET_LOCATION_MUSHROOMS } from '../../queries';
import Spinner from '../Spinner';
import MushroomItem from '../Mushroom/MushroomItem';

const LocationPage = ({ match }) => {
  const { _id } = match.params;

  return (
    <Query query={GET_LOCATION} variables={{ _id }}>
      {
        ({ data, loading, error }) => {
          if (loading) return <Spinner />
          if (error) return <div>Error</div>
          
          return (
            
            <div className="App">
              <div>
                <h2>{data.getLocation.locationname}</h2>
                <h5>{data.getLocation.address}</h5>
              </div>

              <Query query={GET_LOCATION_MUSHROOMS} variables={{locationname: data.getLocation.locationname}}>
                {({ data, loading, error }) => {
                  if (loading) return <Spinner />
                  if (error) return <div>Error</div>
                  // console.log(data)
                  // const { on } = this.state;
                  return (
                    <div className="cards"
                    >
                      {
                        data.getLocationMushrooms.map(mushroom => (
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
    </Query>
  )
}

export default LocationPage;
