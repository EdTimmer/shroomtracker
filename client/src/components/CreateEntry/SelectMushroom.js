import React from 'react';
import withAuth from '../withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import templateMushrooms from '../templateMushrooms';
import mushrooms4 from '../../images/mushrooms4.jpg';
// import sortedSightings from './Sighting/SortedSightings';
// import SortedMushrooms from '../Mushroom/SortedMushrooms';

class SelectMushroom extends React.Component {
  state = {    
    locationname: this.props.location.state.locationname,
    location: this.props.location.state.location,
    filteredMushrooms: [],
  }

  filter() {
    let myMushrooms = this.props.session.getCurrentUser.mushrooms;
    console.log('myMushrooms in SelectLocation', myMushrooms);

    const combinedMushroomArrays =  myMushrooms.concat(templateMushrooms); 
    console.log('combinedMushroomArrays in SelectMushroom is:', combinedMushroomArrays)

    combinedMushroomArrays.filter(mushroom => {
      if (myMushrooms[mushroom.commonname]) {
        return false;
      }
      myMushrooms[mushroom.commonname] = true;
      return true;
    });
    console.log('filteredMushrooms is:', combinedMushroomArrays)
    this.setState({
      filteredMushrooms: combinedMushroomArrays
    })
    // return filteredMushrooms
  }
  
  componentDidMount() {
    // if (this.state.filteredMushrooms.length === 0) {
    //   console.log('componentDidMount run')

      
      // console.log('filteredMushrooms in SelectMushroom is:', filteredMushrooms)

      if (this.state.filteredMushrooms.length === 0) {
        this.filter()
      }
      // this.setState({
      //   filteredMushrooms: this.filterMushrooms()
      // })      
    // }
  }
    
  

  render() {
    const { locationname, location, filteredMushrooms } = this.state;
    // console.log('filteredMushrooms in SelectLocation:', filteredMushrooms)

    return (
      <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, backgroundRepeat: "repeat" }}>

        <h1 className="main-title">
          <strong>Add To {locationname}</strong>
        </h1>

        <div>
          <div>
            <h3>
              <Link to={{
                pathname: '/mushroom/newadd',
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
          {/*<SortedMushrooms location={location} locationname={locationname} filteredMushrooms={filteredMushrooms} />*/}
        <div>                          
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
                    <div>
                      <img src={mushroom.imageUrl} style={{ height: '200px' }} alt="mushroom" />
                    </div>
                    {mushroom.commonname}
                  </Link>
    
                </li>
              )
            }
          </ul>           
        </div>                   
          
      </div>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(SelectMushroom));
