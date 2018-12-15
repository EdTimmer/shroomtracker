import React from 'react';
import withAuth from './withAuth';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const AddPage = ({ session }) => (
  <div className="App">
    <h4 style={{marginTop: '20px'}}>Add A Mushroom Sighting</h4>
    <ul>
      <li>
          <h3><NavLink to="/location/add" exact>To A New Location</NavLink></h3>
      </li>
      <li>
          <h3><NavLink to="/addpagetwo">To A Saved Location</NavLink></h3>
      </li>
    </ul>

  </div>
);

export default withAuth(session => session && session.getCurrentUser)(AddPage);