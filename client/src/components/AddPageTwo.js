import React from 'react';
import withAuth from './withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
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
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>

        <h1 className="main-title">
          Add To {locationname}
        </h1>
        
        <ul>
          <li>
              <h3>
              <Link to={{ pathname: '/sighting/add', state: { passedlocationname: locationname } }}>
                Add New Mushroom 
              </Link> 

              </h3>
          </li>
          <li>
              <h3>Choose A Mushroom:</h3>
          </li>
        </ul>

        <Query query={GET_ALL_SIGHTINGS} variables={{username}}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>
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

            return (              
              <div>                
                {
                  filteredSightings.length ? (                  
                    <ul>
                      {
                        filteredSightings.map(sighting => 
                            <li key={sighting._id}> 

                              <Link to={{ pathname: '/sightingsavedmushroom/add', state: { passedcommonname: sighting.commonname, passedlatinname: sighting.latinname,
                              passedimageUrl: sighting.imageUrl, passedimageCredit: sighting.imageCredit, passedlocationname: locationname } }}>
                                <div>
                                  <img src={sighting.imageUrl} style={{width: '200px'}}/>                    
                                </div>
                                  {sighting.commonname}
                              </Link>

                            </li>)                                    
                      }
                    </ul>
                  
                  ) : (<div><p>You have no saved mushrooms</p></div>)
                } 
                
                {/*<p>For A Preset Mushroom:</p>
                <ul>
                  {

                    mushrooms.map(mushroom => 
                        <li key={mushroom._id}> 

                          <Link to={{ pathname: '/sightingsavedmushroom/add', state: { passedcommonname: mushroom.commonname, passedlatinname: mushroom.latinname,
                          passedimageUrl: mushroom.imageUrl, passedimageCredit: mushroom.imageCredit, passedlocationname: locationname } }}>
                          <div>
                            <img src={mushroom.imageUrl} style={{width: '200px'}}/>                    
                          </div>
                            {mushroom.commonname}
                          </Link>

                        </li>)                                    
                  }
                </ul>*/}
              </div>
            )
          }}

        </Query>
  
      </div>
    )
  }
} 

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddPageTwo));
