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
// import sortedSightings from './Sighting/SortedSightings';
import SortedMushrooms from './Mushroom/SortedMushrooms';

class AddPageZero extends React.Component {
  state = {
    user: '',
  }

  componentDidMount() {
    this.setState({
      user: this.props.session.getCurrentUser._id,
      myMushrooms: this.props.session.getCurrentUser.mushrooms
    });
  }

  render() {
    const { user, myMushrooms } = this.state;
    
    console.log('myMushrooms are:', myMushrooms);

    if (!myMushrooms) {
      return null;
    }

    const combinedMushroomArrays = myMushrooms.concat(mushrooms).sort((a, b) => (a.commonname > b.commonname) ? 1 : ((b.commonname > a.commonname) ? -1 : 0));

    if (!combinedMushroomArrays) {
      return null;
    }

    return (
      <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, backgroundRepeat: "repeat" }}>
        <h1 className="main-title">
          <strong>My Mushroom Species</strong>
        </h1>

        <div>
          <div>
            <h3>
              <Link to={'/mushroom/add'}>
                Add New Mushroom
              </Link>
            </h3>
          </div>
          <div>
            <h5>OR</h5>
            <h3>Choose A Mushroom:</h3>
          </div>

        </div>
              {/*<SortedMushrooms myMushrooms={myMushrooms}/>*/}
              <div>
                {                
                  <ul className="all-mushrooms">                
                    {
                      combinedMushroomArrays.map(mushroom =>
                        <li key={mushroom._id} className="mushroom">
          
                          <Link to={{
                            pathname: '/sightingsavedmushroom/add', state: {
                              commonname: mushroom.commonname, latinname: mushroom.latinname,
                              imageUrl: mushroom.imageUrl, imageCredit: mushroom.imageCredit
                            }
                          }}>
                            <div>
                              <img src={mushroom.imageUrl} style={{ height: '200px' }} alt="mushroom" />
                            </div>
                            {mushroom.commonname}
                          </Link>
          
                        </li>
                      )
                    }
                  </ul>
                }     
              </div>
 
          
      </div>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddPageZero));
