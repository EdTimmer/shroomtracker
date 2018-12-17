import React from 'react';
import { Link } from 'react-router-dom';
// import posed from 'react-pose';

// const LocationItem = posed.li({
//   shown: { opacity: 1 },
//   hidden: { opacity: 0 }
// });

export default ({ _id, locationname, commonname, date, imageUrl }) => (
  <div
    style={{ background: `url(${imageUrl}) center center / cover no-repeat`}}
    className="card"
  >

    <div className="card-text">
      <Link to={`/sightings/${_id}`}><h4>{commonname} on {date}</h4></Link>
    </div> 
    
  </div>
);
