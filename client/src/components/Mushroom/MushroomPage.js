import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';

import { Query } from 'react-apollo';
import { GET_MUSHROOM } from '../../queries';
import Spinner from '../Spinner';


const MushroomPage = ({ match }) => {
  const { _id } = match.params;  
  
  return (
    <Query query={GET_MUSHROOM} variables={{ _id }}>
      {
        ({ data, loading, error }) => {

          if (loading) return <Spinner />
          if (error) return <div>Error</div>
          // console.log(data);
          return (
            <div className="App">
              <div 
                style={{ background: `url(${data.getMushroom.imageUrl}) center center / cover no-repeat` }}
                className="recipe-image">              
              </div>

              <div className="recipe">
                <div className="recipe-header">
                  <h2 className="recipe-name">
                    <strong>{data.getMushroom.commonname}</strong>
                  </h2>
                  <h5>
                    <strong><i>{data.getMushroom.latinname}</i></strong>
                  </h5>
                  <h5>
                    <i>Location: </i> {data.getMushroom.locationname}
                  </h5>
                  <h5>
                    <i>Found Date: </i> {data.getMushroom.date}
                  </h5>
                  <h5>
                    <i>Coordinates: </i> {data.getMushroom.coordinates}
                  </h5>
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
