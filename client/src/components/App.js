import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
// import fairy from '../images/fairy1.jpg'
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

  render() {
    return (
      <div>
        <div className="App" style={{backgroundImage: `url(${mushrooms})`, height: '900px'}}>
          <h1 className="main-title">
            <strong>Mushroom Tracker</strong>            
          </h1> 

          <Link to={'/signinexample'}>
            <button
              className="button-primary"
            >
              EXAMPLE
            </button>
          </Link>       
        </div>
      </div>
      
    )
  }
}

export default App;
