import React from 'react';

const UserInfo = ({ session }) => (
  <div style={{color: 'white'}}>
    <h2 className="main-title">
      <strong>User Information</strong>
    </h2>
    
    <p>Username: {session.getCurrentUser.username}</p>
    <p>Email: {session.getCurrentUser.email}</p>
    <p>Join Date: {session.getCurrentUser.joinDate}</p>
    
  </div>
);

export default UserInfo;
