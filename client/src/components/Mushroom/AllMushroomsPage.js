import React, { Component } from 'react';
import '../App.css';

import { Query } from 'react-apollo';
import { GET_ALL_MUSHROOMS } from '../queries';

import MushroomItem from './MushroomItem';
import Spinner from '../Spinner';

class AllMushroomsPage extends Component {

  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          My <strong>Shrooms</strong>
        </h1>
        <Query query={GET_ALL_MUSHROOMS}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>

            return (
              <div>
                {
                  data.getAllMushrooms.map(mushroom => (
                    <MushroomItem key={mushroom._id} {...mushroom} />
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
