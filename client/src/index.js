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
import SigninExample from './components/Auth/SigninExample';
import Signup from './components/Auth/Signup';
import withSession from "./components/withSession";
import SelectLocation from "./components/CreateEntry/SelectLocation";
import SelectMushroom from "./components/CreateEntry/SelectMushroom";
import AllLocationsPage from './components/Location/AllLocationsPage';
import AllSightingsPage from './components/Sighting/AllSightingsPage';
import LocationPage from './components/Location/LocationPage';
import LocationEditPage from './components/Location/LocationEditPage';
import MushroomPage from './components/Mushroom/MushroomPage';
import AddLocation from './components/Location/AddLocation';
import AddMushroom from './components/Mushroom/AddMushroom';
import AddNewMushroom from './components/Mushroom/AddNewMushroom';
import AllMushroomsPage from './components/Mushroom/AllMushroomsPage';
import AddSighting from './components/Sighting/AddSighting';
import SightingPage from './components/Sighting/SightingPage';
import SightingEditPage from './components/Sighting/SightingEditPage';
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
  // uri: "https://<INSERT_HEROKU_URL>.herokuapp.com/graphql"
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
        <Route path="/selectlocation" render={() => <SelectLocation session={session} />} />
        <Route path="/selectmushroom" render={() => <SelectMushroom session={session} />} />
        <Route path="/locations/:_id" render={() => <LocationPage session={session} />} />
        <Route path="/sightings/:_id" render={() => <SightingPage session={session} />} />
        <Route path="/sightingsedit/:_id" render={() => <SightingEditPage session={session} />} />
        <Route path="/locationsedit/:_id" render={() => <LocationEditPage session={session} />} />
        <Route path="/location/add" render={() => <AddLocation session={session} />} />        
        <Route path="/sighting/add" render={() => <AddSighting session={session} />} />
        <Route path="/locations" render={() => <AllLocationsPage session={session} />} />
        <Route path="/sightings" render={() => <AllSightingsPage session={session} />} />        
        <Route path="/mushrooms/:_id" render={() => <MushroomPage session={session} />} />
        <Route path="/mushrooms" render={() => <AllMushroomsPage session={session} />} />        
        <Route path="/mushroom/add" render={() => <AddMushroom session={session} />} />
        <Route path="/mushroom/newadd" render={() => <AddNewMushroom session={session} />} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signinexample" render={() => <SigninExample refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/profile" render={() => <Profile session={session} />} />

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


