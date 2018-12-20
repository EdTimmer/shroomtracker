import React from 'react';
// import { Link } from 'react-router-dom';

// const formatDate = date => {
//   const newDate = new Date(date).toLocaleDateString('en-US');
//   const newTime = new Date(date).toLocaleTimeString('en-US');
//   return `${newDate} at ${newTime}`;
// }

const UserInfo = ({ session }) => (
  <div style={{color: 'white'}}>
    <h1 className="main-title">
      <strong>User Information</strong>
    </h1>
    
    <p>Username: {session.getCurrentUser.username}</p>
    <p>Email: {session.getCurrentUser.email}</p>
    {/*<p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>*/}
    <p>Join Date: {session.getCurrentUser.joinDate}</p>
    
  </div>
);

export default UserInfo;
