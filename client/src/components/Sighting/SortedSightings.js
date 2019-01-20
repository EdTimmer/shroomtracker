import React from 'react';
import withAuth from '../withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import mushrooms from '../mushrooms';



// import { Query } from 'react-apollo';
// import { GET_MY_SIGHTINGS } from '../queries';
// import Spinner from './Spinner';
// import Error from './Error';

// import mushrooms4 from '../images/mushrooms4.jpg';


const SortedSightings = ({ sightings, location, locationname }) => {

  if (!sightings) {
    return null;
  }

  const combinedMushroomArrays = sightings.concat(mushrooms).sort((a, b) => (a.commonname > b.commonname) ? 1 : ((b.commonname > a.commonname) ? -1 : 0));;
  console.log('mushrooms are:', mushrooms);
  console.log('combinedMushroomArrays are:', combinedMushroomArrays)
  console.log('sightings in SortedSightings are:', sightings)
  const filteredSightings = combinedMushroomArrays.filter(sighting => {
    if (sightings[sighting.commonname]) {
      return false;
    }
    sightings[sighting.commonname] = true;
    return true;
  });
  console.log('filteredSightings are:', filteredSightings)

  // const sortedSightings = filteredSightings.sort((a, b) => (a.commonname > b.commonname) ? 1 : ((b.commonname > a.commonname) ? -1 : 0));

  console.log('sightings are:', sightings)

  // console.log('sortedSightings are:', sortedSightings)

  // if (!sortedSightings) {
  //   return null;
  // }

  return (
    <div>
      {                
        <ul className="all-mushrooms">                
          {
            filteredSightings.map(sighting =>
              <li key={sighting._id} className="mushroom">

                <Link to={{
                  pathname: '/sightingsavedmushroom/add', state: {
                    commonname: sighting.commonname, latinname: sighting.latinname,
                    imageUrl: sighting.imageUrl, imageCredit: sighting.imageCredit, location: location, locationname: locationname
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
  )
}

export default withRouter(SortedSightings);