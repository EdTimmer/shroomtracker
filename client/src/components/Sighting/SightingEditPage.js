import React from 'react';
import { withRouter, Link } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';
import withAuth from '../withAuth';

import { Query, Mutation } from 'react-apollo';
import { DELETE_SIGHTING, GET_ALL_SIGHTINGS } from '../../queries';
import Spinner from '../Spinner';
import Error from '../Error';
// import { get } from 'https';
import mushrooms4 from '../../images/mushrooms4.jpg';


class SightingEditPage extends React.Component {
  state = {
    _id: this.props.match.params._id,
    username: '',
    locationname: this.props.location.state.locationname,
    commonname: this.props.location.state.commonname,
    latinname: this.props.location.state.latinname,
    imageUrl: this.props.location.state.imageUrl,
    imageCredit: this.props.location.state.imageCredit,
    date: this.props.location.state.date,
    latitude: this.props.location.state.latitude,
    longitude: this.props.location.state.longitude
  }
  
  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  handleDelete = deleteSighting => {
    const confirmDelete = window.confirm('Are you sure you want to delete this sighting?  If this is the only sighting for this mushroom and you added this mushroom to our database, then your record of this mushroom will be also erased.');
    if (confirmDelete) {
      deleteSighting().then(()=> {
        this.props.history.push(`/sightings`);
      })
    }
  };

  render() {
    // console.log('state is:', this.state);
    const { _id, username, locationname, commonname, latinname, imageUrl, imageCredit, date, latitude, longitude } = this.state;
    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px', color: 'white'}}
      >
        {commonname}
      
        <Mutation
          mutation={DELETE_SIGHTING} variables={{ _id }}
          refetchQueries={() => [
            { query: GET_ALL_SIGHTINGS, variables: { username } } 
          ]}          
        >
          {
            (deleteSighting, attrs = {}) => {

              return (
                <div>
                  <button
                    className="button-primary"
                    // onClick={() => this.loadRecipe(recipe)}
                  >Update</button>
                  <button
                    className="delete-button"
                    onClick={() => this.handleDelete(deleteSighting)}

                  >
                    Delete Sighting
                  </button>
                </div>
              )
            }
          }

        </Mutation>
      </div>
      
    )
  }
  
};

export default withAuth(session => session && session.getCurrentUser)(withRouter(SightingEditPage));
