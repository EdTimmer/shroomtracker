import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

// const LocationItem = posed.li({
//   shown: { opacity: 1 },
//   hidden: { opacity: 0 }
// });

export default ({ _id, commonname, latinname, imageUrl, date, coordinates }) => (
  <div
    className="card"
  >    
    <div className="card-text">
      <Link to={`/mushrooms/${_id}`}><h4>{commonname}</h4></Link>
    </div> 
    
  </div>
);