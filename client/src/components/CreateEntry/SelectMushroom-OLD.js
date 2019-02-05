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
    filteredMushrooms: '',
    myMushrooms: '',
  }

  componentDidMount() { 
      
      let myMushrooms = this.props.session.getCurrentUser.mushrooms.filter(mushroom => {
        return mushroom.newMushroom === true;
      });
      

      let myMushroomsForList = myMushrooms ? myMushrooms : []
      console.log('myMushroomsForList:', myMushroomsForList)
          
      const combined =  myMushroomsForList.concat(templateMushrooms); 
      // console.log('combined in SelectLocation is:', combined);
      
      this.setState({
        myMushrooms,
        filteredMushrooms: combined
      }) 
      // const filterFunc = async () => {
      //   filtered = combinedMushroomArrays.filter(mushroom => {
      //     if (myMushrooms[mushroom.commonname]) {
      //       return false;
      //     }
      //     myMushrooms[mushroom.commonname] = true;
      //     return true;
      //   })  
      //   return filtered;  
      // }
      // filterFunc().then(() => {
      //   console.log('filterFunc run')
      //   this.setState({
      //     filteredMushrooms: filtered
      //   }) 
      // })
  }


  render() {
    console.log(this.props.session.getCurrentUser)
    // if (!this.state.myMushroomsForList) {
    //   return null;
    // }

    const { locationname, location, filteredMushrooms } = this.state;    

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
                  <p>{mushroom.commonname}</p>                  
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
