import React from 'react';
import { Link } from 'react-router-dom';

export default ({ _id, imageUrl, commonname, sightings }) => (
  <div className="mushroom">    
    <div>
      <div>
        <img src={imageUrl} style={{height: '400px'}} alt="mushroom" />                    
      </div>
      <Link to={`/mushrooms/${_id}`}>{commonname}</Link>          
        {
          sightings.map(sighting => (
            <div key={sighting._id}>
              <Link to={`/locations/${sighting.location._id}`}>{sighting.location.locationname}</Link>
              on
              <Link to={`/sightings/${sighting._id}`}>{sighting.date}</Link>
            </div>
            )
          )
        }      
    </div>    
  </div>
);