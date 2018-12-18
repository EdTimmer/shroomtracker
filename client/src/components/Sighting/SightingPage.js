import React from 'react';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import withAuth from '../withAuth';

import { Query } from 'react-apollo';
import { GET_SIGHTING } from '../../queries';
import Spinner from '../Spinner';
// import { get } from 'https';


const SightingPage = ({ match }) => {
  const { _id } = match.params;  
  
  return (
    <Query query={GET_SIGHTING} variables={{ _id }}>
      {
        ({ data, loading, error }) => {

          if (loading) return <Spinner />
          if (error) return <div>Error</div>
          console.log(data.getSighting);
          return (
            <div className="App">
              <div 
                style={{ background: `url(${data.getSighting.imageUrl}) center center / cover no-repeat` }}
                className="recipe-image">              
              </div>

              <div className="recipe">
                <div className="recipe-header">
                  <h2 className="recipe-name">
                    <strong>{data.getSighting.commonname}</strong>
                  </h2>
                  <h5>
                    <strong><i>{data.getSighting.latinname}</i></strong>
                  </h5>
                  <h5>
                    <i>Location: </i> {data.getSighting.locationname}
                  </h5>
                  <h5>
                    <i>Found Date: </i> {data.getSighting.date}
                  </h5>
                  <h5>
                    <i>Coordinates: </i> {data.getSighting.latitude} by {data.getSighting.longitude}
                
                    <a href={`http://www.google.com/maps/place/${data.getSighting.latitude},${data.getSighting.longitude}`} rel="noopener noreferrer" target="_blank"><h5>Map Link</h5></a>
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(SightingPage));
