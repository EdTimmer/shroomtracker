import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ _id, commonname, locationname, date }) => (
  <li>
    <Link to={`/sightings/${_id}`}><h4>{commonname}</h4></Link>
    <p>Location: {locationname}</p>
    <p>Date: {date}</p>
  </li>
);

export default SearchItem;