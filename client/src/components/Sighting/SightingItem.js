import React from 'react';
import { Link } from 'react-router-dom';

export default ({ _id, locationname, commonname, date, imageUrl }) => (
  <div
    style={{ background: `url(${imageUrl}) center center / cover no-repeat`}}
    className="card"
  >

    <div className="card-text">
      <Link to={`/sightings/${_id}`}><h4>{commonname} at {locationname} on {date}</h4></Link>
    </div> 
    
  </div>
);
