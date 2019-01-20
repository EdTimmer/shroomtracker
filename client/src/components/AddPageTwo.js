import React from 'react';
import withAuth from './withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import mushrooms from './mushrooms';

// import Spinner from './Spinner';

// import { Query } from 'react-apollo';
// import { GET_ALL_SIGHTINGS } from '../queries';
// import Error from './Error';
import mushrooms4 from '../images/mushrooms4.jpg';

class AddPageTwo extends React.Component {
  state = {
    sightings: '',
    locationname: this.props.location.state.locationname,
    location: this.props.location.state.location
  }

  componentDidMount() {
    this.setState({
      sightings: this.props.session.getCurrentUser.sightings
    });
  }

  render() {
    const { locationname, location, sightings } = this.state;
    

    if (!sightings) {
      return null;
    }

    console.log('state in AddPageTwo is:', this.state)

    const combinedMushroomArrays = sightings.concat(mushrooms);
    const filteredSightings = combinedMushroomArrays.filter(sighting => {
      if (sightings[sighting.commonname]) {
        return false;
      }
      sightings[sighting.commonname] = true;
      return true;
    });
    filteredSightings.sort((a, b) => (a.commonname > b.commonname) ? 1 : ((b.commonname > a.commonname) ? -1 : 0));
    // console.log(mushrooms)
    // console.log(filteredSightings)

   

    return (
      <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, backgroundRepeat: "repeat" }}>
        <h1 className="main-title">
          <strong>Add To {locationname}</strong>
        </h1>

        <div>
          <div>
            <h3>
              <Link to={{ pathname: '/sighting/add', state: { location: location, locationname: locationname } }}>
                Add New Mushroom
              </Link>
            </h3>
          </div>
          <div>
            <h5>OR</h5>
            <h3>Choose A Mushroom:</h3>
          </div>
        </div>
          {                
            filteredSightings ? (
              <div>
              {                
                <ul className="all-mushrooms">
                  {
                    filteredSightings.map(sighting =>
                      <li key={sighting._id} className="mushroom">

                        <Link to={{
                          pathname: '/sightingsavedmushroom/add', state: {
                            commonname: sighting.commonname, latinname: sighting.latinname,
                            imageUrl: sighting.imageUrl, imageCredit: sighting.imageCredit, location: location
                          }
                        }}>
                          <div>
                            <img src={sighting.imageUrl} style={{ height: '200px' }} alt="mushroom" />
                          </div>
                          {sighting.commonname}
                        </Link>

                      </li>
                    )
                  }
                </ul>
              }              
            </div>
            ) : (null)
          }
      </div>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddPageTwo));
