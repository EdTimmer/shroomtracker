import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './index.css';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import LocationPage from './components/Location/LocationPage';
import AddLocation from './components/Location/AddLocation';
import AddMushroom from './components/Mushroom/AddMushroom';

// const client = new ApolloClient({
//   dataIdFromObject: o => o.id
// });

// Required for 2.0

import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from 'apollo-link-context';

// Connect front-end to back-end (using Apollo 2.0)

const httpLink = createHttpLink({
  //For Development
  uri: "http://localhost:4444/graphql",
  //For Deployment
  // uri: "https://recipes-react-graphql.herokuapp.com/graphql"
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token
//     }
//   }
// });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  onError: ({ networkError }) => {
    if (networkError) {
      localStorage.setItem('token', '');
    }
  }
});

const Root = ({ refetch }) => (
  <Router>
    <Fragment>
      {/*<Navbar />*/}
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/locations/:_id" component={LocationPage} />
        <Route path="/mushroom/add" component={AddMushroom} />
        <Route path="/location/add" component={AddLocation} />
        {/*<Route path="/search" exact component={Search} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/recipe/add" render={() => <AddRecipe session={session} />} />
        <Route path="/recipes/:_id" component={RecipePage} /><Route path="/mushroom/add" component={AddMushroom} />
<Route path="/profile" render={() => <Profile session={session} /> } />*/}
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);


ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById('root')
);


