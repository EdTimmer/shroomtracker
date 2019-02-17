import React from 'react';
import { withRouter } from 'react-router-dom';

import { ApolloConsumer } from 'react-apollo';

const handleSignout = (client, history) => {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push('/');
}

const Signout = ({ history, username }) => (
  <ApolloConsumer>
    {
      client => {
        return (
          <button style={{color: 'white', fontSize: "14px"}} onClick={() => handleSignout(client, history)}>Signout {username}</button>
        )
      }
    }
  </ApolloConsumer>
);

export default withRouter(Signout);
