import React from 'react';
import withAuth from '../withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import mushrooms from '../mushrooms';

// import Spinner from './Spinner';

// import { Query } from 'react-apollo';
// import { GET_ALL_SIGHTINGS } from '../queries';
// import Error from './Error';
import mushrooms4 from '../../images/mushrooms4.jpg';
// import sortedSightings from './Sighting/SortedSightings';
import SortedMushrooms from '../Mushroom/SortedMushrooms';

class SelectMushroom extends React.Component {
  state = {
    sightings: '',
    locationname: '',
    location: '',
    myMushrooms: ''
  }

  componentDidMount() {
    this.setState({
      sightings: this.props.session.getCurrentUser.sightings,
      locationname: this.props.location.state.locationname,
      location: this.props.location.state.location,
      myMushrooms: this.props.session.getCurrentUser.mushrooms
    });
  }

  render() {
    const { locationname, location, sightings, myMushrooms } = this.state;
    
    console.log('location in SelectMushroom is:', location)
    if (!sightings) {
      return null;
    }

    
    // console.log('state in SelectMushroom is:', this.state)

    // const combinedMushroomArrays = sightings.concat(mushrooms);
    // const filteredSightings = combinedMushroomArrays.filter(sighting => {
    //   if (sightings[sighting.commonname]) {
    //     return false;
    //   }
    //   sightings[sighting.commonname] = true;
    //   return true;
    // });
    // const sortedSightings = filteredSightings.sort((a, b) => (a.commonname > b.commonname) ? 1 : ((b.commonname > a.commonname) ? -1 : 0));
    // console.log(mushrooms)
    // console.log(filteredSightings)

    // if (!sortedSightings) {
    //   return null;
    // }
   

    return (
      <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, backgroundRepeat: "repeat" }}>
        <h1 className="main-title">
          <strong>Add To {locationname}</strong>
        </h1>

        <div>
          <div>
            <h3>
              <Link to={{
                pathname: '/mushroom/add',
                state: {
                  location: this.state.location,
                  locationname: this.state.locationname
                }
              }}>
                Add New Mushroom
              </Link>
            </h3>
          </div>
          <div>
            <h5>OR</h5>
            <h3>Choose A Mushroom:</h3>
          </div>
        </div>
              <SortedMushrooms myMushrooms={myMushrooms} location={location} locationname={locationname}/>
              {/*<div>
              {                
                <ul className="all-mushrooms">                
                  {
                    sortedSightings.map(sighting =>
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
            </div>  */}        
          
      </div>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(SelectMushroom));
