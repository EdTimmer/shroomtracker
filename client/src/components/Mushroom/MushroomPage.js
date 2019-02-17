import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import { Link } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_MUSHROOM } from '../../queries';
import Spinner from '../Spinner';
import Error from '../Error';
import mushrooms4 from '../../images/mushrooms4.jpg';


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
            <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, height: '900px', color: 'brown' }}>
              <div
                style={{ background: `url(${data.getMushroom.imageUrl}) center center / cover no-repeat` }}
                className="sighting-image">
              </div>

              <div className="sighting">
                <div className="sighting-header">
                  <h2 className="sighting-name">
                    <strong>{data.getMushroom.commonname}</strong>
                  </h2>
                  <h5 style={{ color: "brown" }}>
                    <strong><i>{data.getMushroom.latinname}</i></strong>
                  </h5>
                  {
                    data.getMushroom.sightings.map(sighting => (
                      <div key={sighting._id}>
                        <p style={{ color: "brown" }}>
                          <Link to={`/locations/${sighting.location._id}`} style={{ color: "brown" }}>{sighting.location.locationname}</Link>
                          <span style={{ paddingLeft: "5px", paddingRight: "5px" }}>on</span>

                          <Link to={`/sightings/${sighting._id}`} style={{ color: "brown" }}>{sighting.date}</Link>
                        </p>
                      </div>
                    )
                    )
                  }
                </div>

              </div>

              <Link to={{
                pathname: `/mushroomsedit/${_id}`,
                state: {
                  commonname: data.getMushroom.commonname,
                  latinname: data.getMushroom.latinname,
                  imageUrl: data.getMushroom.imageUrl,
                  imageCredit: data.getMushroom.imageCredit
                }
              }}
              >
                <button className="regular-button">Edit</button>
              </Link>

            </div>



          )
        }
      }
    </Query>
  )
};

export default withAuth(session => session && session.getCurrentUser)(withRouter(MushroomPage));
