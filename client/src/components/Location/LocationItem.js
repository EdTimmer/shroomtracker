import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

// const LocationItem = posed.li({
//   shown: { opacity: 1 },
//   hidden: { opacity: 0 }
// });

export default ({ _id, locationname, address }) => (
  <div
    className="card"
  >    
    <div className="card-text">
      <Link to={`/locations/${_id}`}><h4>{locationname}</h4></Link>
    </div> 
    
  </div>
);
