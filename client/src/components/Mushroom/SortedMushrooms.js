import React from 'react';
import withAuth from '../withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import templateMushrooms from '../mushrooms';

import { Query } from 'react-apollo';
import { GET_MY_MUSHROOMS } from '../../queries';
import Spinner from '../Spinner';
import Error from '../Error';

// import mushrooms4 from '../images/mushrooms4.jpg';


const SortedMushrooms = ({ myMushrooms, location, locationname }) => {
  // console.log('myMushrooms are', myMushrooms)
  // // const userMushrooms = user.mushrooms
  // const combinedMushroomArrays = myMushrooms.concat(mushrooms).sort((a, b) => (a.commonname > b.commonname) ? 1 : ((b.commonname > a.commonname) ? -1 : 0));;
  // console.log('mushrooms are:', mushrooms);
  // console.log('combinedMushroomArrays are:', combinedMushroomArrays)

  return (
    <div>
      <h4><i>From My Previously Found Mushrooms</i></h4>
      {                
        <ul className="all-mushrooms">                
          {
            myMushrooms.map(mushroom =>
              <li key={mushroom._id} className="mushroom">

                <Link to={{
                  pathname: '/mushroom/add', state: {
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
      }     

      <h4><i>From Mushroom Templates</i></h4>
      {                
        <ul className="all-mushrooms">                
          {
            templateMushrooms.map(mushroom =>
              <li key={mushroom._id} className="mushroom">

                <Link to={{
                  pathname: '/mushroom/add', state: {
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
      }     
    </div>
  )
}

export default withRouter(SortedMushrooms);