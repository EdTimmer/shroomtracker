import React from 'react';
import withAuth from './withAuth';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const AddPageTwo = ({ session }) => (
  <div className="App">
    <h4 style={{marginTop: '20px'}}>Add A Mushroom Sighting</h4>
    <ul>
      <li>
          <h3><NavLink to="/sighting/add" exact>For New Mushroom</NavLink></h3>
      </li>
      <li>
          <h3><NavLink to="/sightingsavedmushroom/add">For A Saved Mushroom</NavLink></h3>
      </li>
    </ul>

  </div>
);

export default withAuth(session => session && session.getCurrentUser)(AddPageTwo);