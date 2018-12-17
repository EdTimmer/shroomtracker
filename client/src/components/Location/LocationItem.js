import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

// const LocationItem = posed.li({
//   shown: { opacity: 1 },
//   hidden: { opacity: 0 }
// });

export default ({ _id, locationname, address }) => (
  <div>    
    <div>
      <Link to={`/locations/${_id}`}><h4 style={{color: 'white'}}>{locationname}</h4></Link>
    </div>     
  </div>
);
