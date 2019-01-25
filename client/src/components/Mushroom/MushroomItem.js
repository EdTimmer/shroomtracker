import React from 'react';
import { Link } from 'react-router-dom';

export default ({ imageUrl, commonname, sightings }) => (
  <div
    style={{ background: `url(${imageUrl}) center center / cover no-repeat`}}
    className="card"
  >    
    <div className="card-text">
      <h4>{commonname}</h4>
      
      {
        sightings.map(sighting => (
          <div key={sighting._id}>
            <h4>{sighting.location.locationname} on {sighting.date}</h4>
            <Link to={`/sightings/${sighting._id}`}><h4>link</h4></Link>
          </div>
          )
        )
      }
      
    </div> 
    
  </div>
);