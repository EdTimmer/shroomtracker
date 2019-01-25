import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import { Link } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_MUSHROOM } from '../../queries';
import Spinner from '../Spinner';
import Error from '../Error';


const MushroomPage = ({ match }) => {
  const { _id } = match.params;  

  return (
    <Query query={GET_MUSHROOM} variables={{ _id }}>
      {
        ({ data, loading, error }) => {

          if (loading) return <Spinner />
          if (error) return <Error error={error} />
          // console.log(data);
          return (
            <div className="App">
              <div 
                style={{ background: `url(${data.getMushroom.imageUrl}) center center / cover no-repeat` }}
                className="sighting-image">              
              </div>

              <div className="sighting">
                <div className="sighting-header">
                  <h2 className="sighting-name">
                    <strong>{data.getMushroom.commonname}</strong>
                  </h2>
                  <h5>
                    <strong><i>{data.getMushroom.latinname}</i></strong>
                  </h5>
                  {
                    data.getMushroom.sightings.map(sighting => (
                      <div key={sighting._id}>
                        <Link to={`/locations/${sighting.location._id}`}>{sighting.location.locationname}</Link>
                        on
                        <Link to={`/sightings/${sighting._id}`}>{sighting.date}</Link>
                      </div>
                      )
                    )
                  }      
                </div>

              </div>

            </div>
          )
        }
      }
    </Query>
  )
};

export default withAuth(session => session && session.getCurrentUser)(withRouter(MushroomPage));
