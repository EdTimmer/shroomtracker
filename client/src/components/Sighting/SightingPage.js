import React from 'react';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';
import withAuth from '../withAuth';

import { Query } from 'react-apollo';
import { GET_SIGHTING } from '../../queries';
import Spinner from '../Spinner';
// import { get } from 'https';
import mushrooms4 from '../../images/mushrooms4.jpg';


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
            <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px', color: 'brown'}}>
              <div className="container">
                <div
                  style={{ background: `url(${data.getSighting.imageUrl}) center center / cover no-repeat` }}
                  className="sighting-image">
                </div>
                <div className="bottom-left">
                  {
                    data.getSighting.imageCredit ? (<p>Photograph credit: {data.getSighting.imageCredit}</p>) : (null)
                  }
                </div>
              </div>

              <div className="sighting">
                <div className="sighting-header">
                  
                  <h2 className="sighting-name">
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
                  <div>

                    {
                      data.getSighting.latitude && data.getSighting.longitude ? (
                        <div>

                          <a href={`http://www.google.com/maps/place/${data.getSighting.latitude},${data.getSighting.longitude}`} rel="noopener noreferrer" target="_blank"><h5><strong>Map Link</strong></h5></a>

                          <p><i>Coordinates: </i> {data.getSighting.latitude} by {data.getSighting.longitude}</p>

                        </div>
                      ) : (<h5><i>No recorded coordinates</i></h5>)
                    }

                  </div>

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
