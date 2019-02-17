import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_LOCATION } from '../../queries';
import withAuth from '../withAuth';
import Spinner from '../Spinner';
import Error from '../Error';
import SightingItemForLocation from '../Sighting/SightingItemForLocation';
import mushrooms4 from '../../images/mushrooms4.jpg';

const LocationPage = ({ match }) => {
  const { _id } = match.params;

  return (
    <div>

      <Query query={GET_LOCATION} variables={{ _id }}>
        {
          ({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <Error error={error} />

            return (

              <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, height: '900px' }}>
                <div>
                  <h2>{data.getLocation.locationname}</h2>
                  <h5>{data.getLocation.address}</h5>
                </div>

                <div className="cards"
                >
                  {
                    data.getLocation.sightings.map(sighting => (
                      <SightingItemForLocation
                        key={sighting._id}
                        _id={sighting._id}
                        date={sighting.date}
                      />
                    ))
                  }
                </div>

                <Link to={{
                  pathname: `/locationsedit/${_id}`,
                  state: {
                    locationname: data.getLocation.locationname,
                    address: data.getLocation.address
                  }
                }}
                >
                  <button className="regular-button">
                    Edit
                  </button>
                </Link>

              </div>
            )
          }



        }

      </Query>

      <Link to={`/locationsedit/${_id}`}>

        <button>Edit</button>
      </Link>

    </div>
  )
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(LocationPage));
