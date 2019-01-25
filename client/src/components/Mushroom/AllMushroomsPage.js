import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import '../App.css';

import { Query } from 'react-apollo';
import { GET_MY_MUSHROOMS } from '../../queries';
import MushroomItem from './MushroomItem';
import Spinner from '../Spinner';
import Error from '../Error';
import mushrooms4 from '../../images/mushrooms4.jpg';

class AllMushroomsPage extends Component {
  state = {
    user: ''
  }

  componentDidMount() {
    this.setState({
      user: this.props.session.getCurrentUser._id,
    });
  }
  
  render() {
    // const username = this.props.session.getCurrentUser.username;
    const {user} = this.state;

    if (!user) {
      return null;
    }
    // console.log(this.props.session.getCurrentUser.username)
    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, backgroundRepeat: "repeat" }}>
        <h1 className="main-title">
          <strong>My Myshrooms</strong>
        </h1>
        <Query query={GET_MY_MUSHROOMS} variables={{user}}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <Error error={error} />

            return (
              
              <div className='all-mushrooms'>
                {
                  data.getMyMushrooms.map(mushroom => (
                    <MushroomItem key={mushroom._id} imageUrl={mushroom.imageUrl} sightings={mushroom.sightings} commonname={mushroom.commonname} _id={mushroom._id} />
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(AllMushroomsPage));
