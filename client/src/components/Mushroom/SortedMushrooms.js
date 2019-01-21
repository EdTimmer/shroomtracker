import React from 'react';
import withAuth from '../withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import mushrooms from '../mushrooms';

import { Query } from 'react-apollo';
import { GET_MY_MUSHROOMS } from '../../queries';
import Spinner from '../Spinner';
import Error from '../Error';

// import mushrooms4 from '../images/mushrooms4.jpg';


const SortedMushrooms = ({ myMushrooms }) => {
  console.log('myMushrooms are', myMushrooms)
  // const userMushrooms = user.mushrooms
  const combinedMushroomArrays = myMushrooms.concat(mushrooms).sort((a, b) => (a.commonname > b.commonname) ? 1 : ((b.commonname > a.commonname) ? -1 : 0));;
  console.log('mushrooms are:', mushrooms);
  console.log('combinedMushroomArrays are:', combinedMushroomArrays)

  return (
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
  )
}

export default withRouter(SortedMushrooms);