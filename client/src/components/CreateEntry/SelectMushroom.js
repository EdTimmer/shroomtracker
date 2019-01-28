import React from 'react';
import withAuth from '../withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import templateMushrooms from '../templateMushrooms';
import mushrooms4 from '../../images/mushrooms4.jpg';

class SelectMushroom extends React.Component {
  state = {    
    locationname: this.props.location.state.locationname,
    location: this.props.location.state.location,
    filteredMushrooms: [],
  }

  filter() {
    let myMushrooms = this.props.session.getCurrentUser.mushrooms;    
    const combinedMushroomArrays =  myMushrooms.concat(templateMushrooms); 
    
    combinedMushroomArrays.filter(mushroom => {
      if (myMushrooms[mushroom.commonname]) {
        return false;
      }
      myMushrooms[mushroom.commonname] = true;
      return true;
    });
    
    this.setState({
      filteredMushrooms: combinedMushroomArrays
    })    
  }
  
  componentDidMount() {
      if (this.state.filteredMushrooms.length === 0) {
        this.filter()
      }
  }

  render() {
    const { locationname, location, filteredMushrooms } = this.state;

    console.log('location in SelectMushroom is:', location)

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
                                 
        <ul className="all-mushrooms">                
          {              
            filteredMushrooms.map(mushroom =>                
              <li key={mushroom._id} className="mushroom">                
                <Link to={{
                  pathname: mushroom.user ? ('/sighting/add') : ('/mushroom/add'), 
                  state: {
                    mushroom: mushroom._id,
                    commonname: mushroom.commonname, 
                    latinname: mushroom.latinname,
                    imageUrl: mushroom.imageUrl, 
                    imageCredit: mushroom.imageCredit,
                    location: location, locationname: locationname
                  }
                }}>
                  <img src={mushroom.imageUrl} style={{ height: '200px' }} alt="mushroom" />
                  {mushroom.commonname}
                </Link>    
              </li>
            )
          }
        </ul>  

      </div>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(SelectMushroom));
