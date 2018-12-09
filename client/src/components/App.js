import React, { Component } from 'react';
import './App.css';
// import posed from 'react-pose';

import { Query } from 'react-apollo';
import { GET_ALL_LOCATIONS, GET_ALL_MUSHROOMS } from '../queries';

import LocationItem from './Location/LocationItem';
import Spinner from './Spinner';

// const LocationList = posed.ul({
//   shown: {
//     x: '0%',
//     staggerChildren: 100
//   },
//   hidden: {
//     x: '-100%'
//   }
// });

class App extends Component {

  // state = {
  //   on: false
  // }

  // componentDidMount() {
  //   setTimeout(this.slideIn, 200);
  // }

  // slideIn = () => {
  //   this.setState({ on: !this.state.on});
  // }

  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          Track Your <strong>Shrooms</strong>
        </h1>
        <Query query={GET_ALL_LOCATIONS}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>
            // console.log(data)
            // const { on } = this.state;
            return (
              <div className="cards">
                {
                  data.getAllLocations.map(location => (
                    <LocationItem key={location._id} {...location} />
                  ))
                }
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default App;
