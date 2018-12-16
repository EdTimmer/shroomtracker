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
import Navbar from './components/Navbar';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import withSession from "./components/withSession";
import AddPage from "./components/AddPage";
import AddPageTwo from "./components/AddPageTwo";
import AllLocationsPage from './components/Location/AllLocationsPage';
import AllSightingsPage from './components/Sighting/AllSightingsPage';
import LocationPage from './components/Location/LocationPage';
// import MushroomPage from './components/Mushroom/MushroomPage';
import AddLocation from './components/Location/AddLocation';
// import AddMushroom from './components/Mushroom/AddMushroom';
import AddSighting from './components/Sighting/AddSighting';
import AddSightingSavedMushroom from './components/Sighting/AddSightingSavedMushroom';
import SightingPage from './components/Sighting/SightingPage';
import Profile from './components/Profile/Profile';

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

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  onError: ({ networkError }) => {
    if (networkError) {
      localStorage.setItem('token', '');
    }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/addpage" render={() => <AddPage session={session} /> } />
        <Route path="/addpagetwo" render={() => <AddPageTwo session={session} /> } />
        <Route path="/locations/:_id" render={() => <LocationPage session={session} />} />
        <Route path="/sightings/:_id" render={() => <SightingPage session={session} />} />
        {/*<Route path="/mushrooms/:_id" render={() => <MushroomPage session={session} />} />
<Route path="/mushroom/add" render={() => <AddMushroom session={session} />} />*/}
        <Route path="/location/add" render={() => <AddLocation session={session} />} />
        <Route path="/sighting/add" render={() => <AddSighting session={session} />} />
        <Route path="/sightingsavedmushroom/add" render={() => <AddSightingSavedMushroom session={session} />} />
        <Route path="/locations" render={() => <AllLocationsPage session={session} />} />
        <Route path="/sightings" render={() => <AllSightingsPage session={session} />} />
        {/*<Route path="/search" exact component={Search} />*/}
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        {/*<Route path="/recipe/add" render={() => <AddRecipe session={session} />} />
        <Route path="/recipes/:_id" component={RecipePage} />
        <Route path="/mushroom/add" component={AddMushroom} />*/}
        <Route path="/profile" render={() => <Profile session={session} /> } />
        
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);


