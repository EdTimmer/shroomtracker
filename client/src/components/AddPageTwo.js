import React from 'react';
import withAuth from './withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import mushrooms from './mushrooms';

import Spinner from './Spinner';

import { Query } from 'react-apollo';
import { GET_ALL_SIGHTINGS } from '../queries';
import Error from './Error';
import mushrooms4 from '../images/mushrooms4.jpg';

class AddPageTwo extends React.Component {
  state = {
    username: '',
    locationname: this.props.location.state.passedlocationname
  }

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  render() {
    const { username, locationname } = this.state;

    return (
      <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, backgroundRepeat: "repeat" }}>
        <h1 className="main-title">
          <strong>Add To {locationname}</strong>
        </h1>

        <div>
          <div>
            <h3>
              <Link to={{ pathname: '/sighting/add', state: { passedlocationname: locationname } }}>
                Add New Mushroom
              </Link>
            </h3>
          </div>
          <div>
            <h5>OR</h5>
            <h3>Choose A Mushroom:</h3>
          </div>
        </div>


        <Query query={GET_ALL_SIGHTINGS} variables={{ username }}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <Error error={error} />
            // console.log('username is', username)
            // const { on } = this.state;
            const combinedMushroomArrays = data.getAllSightings.concat(mushrooms);
            const filteredSightings = combinedMushroomArrays.filter(sighting => {
              if (data.getAllSightings[sighting.commonname]) {
                return false;
              }
              data.getAllSightings[sighting.commonname] = true;
              return true;
            });
            filteredSightings.sort((a, b) => (a.commonname > b.commonname) ? 1 : ((b.commonname > a.commonname) ? -1 : 0));
            console.log(mushrooms)
            console.log(filteredSightings)

            
            return (
              <div>
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
                                  passedcommonname: sighting.commonname, passedlatinname: sighting.latinname,
                                  passedimageUrl: sighting.imageUrl, passedimageCredit: sighting.imageCredit, passedlocationname: locationname
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
          }}

        </Query>


      </div>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddPageTwo));
