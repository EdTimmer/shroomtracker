import React, { Component } from 'react';
import './App.css';
import fairy from '../images/fairy1.jpg'
import mushrooms from '../images/mushrooms1.jpg'
// import posed from 'react-pose';

// import { Query } from 'react-apollo';
// import { GET_ALL_LOCATIONS, GET_ALL_MUSHROOMS } from '../queries';

// import LocationItem from './Location/LocationItem';
// import Spinner from './Spinner';

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
      <div>
        <div className="App" style={{backgroundImage: `url(${mushrooms})`, height: '900px'}}>
          <h1 className="main-title">
            <strong>Mushroom Tracker</strong>
          </h1>          
        </div>
        <div />
      </div>
      
    )
  }
}

export default App;
