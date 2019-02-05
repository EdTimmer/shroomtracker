import React from 'react';
import withAuth from '../withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_SELECTION_MUSHROOMS } from '../../queries';
import Spinner from '../Spinner';
import Error from '../Error';

// import templateMushrooms from '../templateMushrooms';
import mushrooms4 from '../../images/mushrooms4.jpg';


class SelectMushroom extends React.Component {
  state = {    
    user: '',
    locationname: this.props.location.state.locationname,
    location: this.props.location.state.location,
  }

  componentDidMount() { 
    this.setState({
      user: this.props.session.getCurrentUser._id,
    });
  }


  render() {
    // console.log(this.props.session.getCurrentUser)
    // if (!this.state.myMushroomsForList) {
    //   return null;
    // }

    const { locationname, location, user } = this.state;    

    return (
      <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, backgroundRepeat: "repeat" }}>

        <h1 className="main-title">
          <strong>Add To {locationname}</strong>
        </h1>        
        
        <h3>
          <Link to={{
            pathname: '/mushroom/newadd',
            state: {
              location,
              locationname
            }
          }}>
            Add New Mushroom
          </Link>
        </h3>        
          
        <h5>OR</h5>
        <h3>Choose A Mushroom:</h3>

        <Query query={GET_SELECTION_MUSHROOMS} variables={{user}}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <Error error={error} />

            return (
              
              <div className='all-mushrooms'>
                {              
                  data.getSelectionMushrooms.map(mushroom =>                
                    <li key={mushroom._id} className="mushroom">                
                      <Link to={{
                        pathname: mushroom.newMushroom ? ('/sighting/add') : ('/mushroom/add'), 
                        state: {
                          mushroom: mushroom._id,
                          commonname: mushroom.commonname, 
                          latinname: mushroom.latinname,
                          imageUrl: mushroom.imageUrl, 
                          imageCredit: mushroom.imageCredit,
                          location: location, 
                          locationname: locationname
                        }
                      }}>
                        <img src={mushroom.imageUrl} style={{ height: '200px' }} alt="mushroom" />
                        <p>{mushroom.commonname}</p>                  
                      </Link>    
                    </li>
                  )
                }
              </div>
            )
          }}
        </Query>

      </div>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(SelectMushroom));
