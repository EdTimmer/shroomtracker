import React from 'react';
import { Link } from 'react-router-dom';

export default ({ _id, imageUrl, commonname, sightings }) => (
  <div className="mushroom">    
    <div>
      <div>
        <img src={imageUrl} style={{height: '400px'}} alt="mushroom" />                    
      </div>
      <Link to={`/mushrooms/${_id}`} style={{color: "white"}}>
        <p>
          {commonname}
        </p>        
      </Link>          
        {
          sightings.map(sighting => (
            <div key={sighting._id}>
              <p style={{color: "white"}}>
                <Link to={`/locations/${sighting.location._id}`} style={{color: "white"}}>{sighting.location.locationname}</Link>
                <span style={{paddingLeft: "5px", paddingRight: "5px"}}>on</span>
                <Link to={`/sightings/${sighting._id}`} style={{color: "white"}}>{sighting.date}</Link>
              </p>              
            </div>
            )
          )
        }      
    </div>    
  </div>
);