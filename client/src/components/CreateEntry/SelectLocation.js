import React from 'react';
import withAuth from '../withAuth';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_MY_MUSHROOMS } from '../../queries';
import Spinner from '../Spinner';
import Error from '../Error';
import MyLocationsList from '../Location/MyLocationsList'

import mushrooms4 from '../../images/mushrooms4.jpg';
import templateMushrooms from '../templateMushrooms';

class SelectLocation extends React.Component {
  state = {
    locations: '',
    user: '',
    // myMushrooms: ''
  }

  componentDidMount() {
    // const myMushrooms = this.props.session.getCurrentUser.mushrooms
    this.setState({      
      locations: this.props.session.getCurrentUser.locations,
      user: this.props.session.getCurrentUser._id,
      // myMushrooms: this.props.getCurrentUser.mushrooms
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
      
        <h1 className="main-title">
          <strong>Select Location</strong>
        </h1>
        
        <ul>
          <li>
              <h3>My Saved Locations:</h3>
          </li>
        </ul>

          <Query query={GET_MY_MUSHROOMS} variables={{ user }}>
            {
              ({ data, loading, error }) => {
                if (loading) return <Spinner />
                if (error) return <Error error={error} />

                const myMushrooms = data.getMyMushrooms;
                const combinedMushroomArrays = myMushrooms.concat(templateMushrooms);   
                const filteredMushrooms = combinedMushroomArrays.filter(mushroom => {
                  if (myMushrooms[mushroom.commonname]) {
                    return false;
                  }
                  myMushrooms[mushroom.commonname] = true;
                  return true;
                });

                return (  
                  <div>          
                    <div>
                      <MyLocationsList user={user} filteredMushrooms={filteredMushrooms}/>
                    </div>    
                      <h4>or</h4> 
                    <div>              
                      <h3>
                        <NavLink style={{color: 'white'}} to={{
                          pathname: "/location/add",
                          state: {
                            filteredMushrooms
                          }                    
                        }}>
                          Add A New Location
                        </NavLink>
                      </h3>
                    </div>
                  </div>               
                )
              }
            }
          </Query>
        

  
      </div>
    )
  }
} 
  


export default withAuth(session => session && session.getCurrentUser)(withRouter(SelectLocation));