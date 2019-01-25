import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_SIGHTING } from '../../queries';
// import withAuth from '../withAuth';
import Spinner from '../Spinner';
import Error from '../Error';


const SightingItemForLocation = ({ _id, date }) => {
  return (   

      <Query query={GET_SIGHTING} variables={{ _id }}>
        {
          ({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <Error error={error} />
            // console.log('data.getLocation is:', data.getLocation);
            return (
              
              <div style={{ background: `url(${data.getSighting.mushroom.imageUrl}) center center / cover no-repeat`}}
              className="card"
              >
                <div className="card-text">
                  <Link to={`/sightings/${_id}`}><h4>{data.getSighting.mushroom.commonname} on {date}</h4></Link>
                </div>             
              </div>
            )
          }
        }
      </Query>
  )  
}


export default SightingItemForLocation;