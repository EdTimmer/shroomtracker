import React from 'react';

import UserInfo from './UserInfo';
import withAuth from '../withAuth';
import mushrooms4 from '../../images/mushrooms4.jpg';

const Profile = ({ session }) => (
  
  <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
  
    <UserInfo session={session} />

  </div>
);

export default withAuth(session => session && session.getCurrentUser)(Profile);
