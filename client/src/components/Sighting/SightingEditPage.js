import React from 'react';
import { withRouter } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';
import withAuth from '../withAuth';

import { Query, Mutation } from 'react-apollo';
import { DELETE_SIGHTING, GET_SIGHTING, UPDATE_SIGHTING, GET_MY_SIGHTINGS, GET_LOCATION } from '../../queries';
import Spinner from '../Spinner';
import Error from '../Error';
// import { get } from 'https';
import mushrooms4 from '../../images/mushrooms4.jpg';


class SightingEditPage extends React.Component {
  state = {
    _id: this.props.match.params._id,
    user: '',
    location: this.props.location.state.location,
    locationname: this.props.location.state.locationname,
    mushroom: this.props.location.state.mushroom,
    commonname: this.props.location.state.commonname,
    date: this.props.location.state.date,
    latitude: this.props.location.state.latitude ? this.props.location.state.latitude : '',
    longitude: this.props.location.state.longitude ? this.props.location.state.longitude : ''
  }

  componentDidMount() {
    this.setState({
      user: this.props.session.getCurrentUser._id      
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event, updateSighting) => {
    event.preventDefault();
    updateSighting().then(() => {
      // this.clearState();     
      this.props.history.push(`/sightings/${this.state._id}`);
    })
  }

  handleDelete = deleteSighting => {
    const confirmDelete = window.confirm('Are you sure you want to delete this sighting?');
    if (confirmDelete) {
      deleteSighting().then(() => {
        this.props.history.push(`/sightings`);
      })
    }
  };

  render() {
    console.log('state is:', this.state);
    const { _id, location, user, mushroom, locationname, commonname, date, latitude, longitude } = this.state;
    const { handleChange, handleSubmit } = this;
    const locations = this.props.session.getCurrentUser.locations;
    const mushrooms = this.props.session.getCurrentUser.mushrooms;
    return (
      <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, height: '900px', color: 'white' }}
      >

        <Query query={GET_SIGHTING} variables={{ _id }}>
          {
            ({ data, loading, error }) => {

              if (loading) return <Spinner />
              if (error) return <Error error={error} />
              // console.log(data);
              return (
                <div className="App">                
                  <Mutation
                    mutation={UPDATE_SIGHTING}
                    variables={{
                      _id,
                      date,
                      latitude,
                      longitude
                    }}
                  >
                    {
                      updateSighting => (
          
                        <form
                          onSubmit={(event) => handleSubmit(event, updateSighting)}
                        >
                          <h4>Edit Sighting</h4>        
          
                          {/*<div style={{ color: 'black' }}>
                            <select
                              name="location"
                              onChange={handleChange}
                            >
                              <option value='-1'>{locationname}</option>
                              {
                                locations.map(location => (
                                  <option key={location._id} value={location.locationname}>
                                    {location.locationname}
                                  </option>
                                ))
                              }
                            </select>
                          </div>
          
                          <div style={{ color: 'black' }}>
                            <select
                              name="mushroom"
                              onChange={handleChange}
                            >
                              <option value='-1'>{commonname}</option>
                              {
                                mushrooms.map(mushroom => (
                                  <option key={mushroom._id} value={mushroom._id}>
                                    {mushroom.commonname}
                                  </option>
                                ))
                              }
                            </select>
                            </div>*/}
                          <div>
                            <h4>{locationname}</h4>
                            <h4>{commonname}</h4>                        
                          </div>
          
                          <div>
                            <input
                              type="text"
                              name="date"
                              placeholder={date}
                              onChange={handleChange}
                              value={date}
                            />
                          </div>
          
                          <div>
                            <input
                              type="text"
                              name="latitude"
                              placeholder={latitude}
                              onChange={handleChange}
                              value={latitude}
                            />
                          </div>
          
                          <div>
                            <input
                              type="text"
                              name="longitude"
                              placeholder={longitude}
                              onChange={handleChange}
                              value={longitude}
                            />
                          </div>
          
                          <button type="submit" className="button-primary">Update</button>
          
                        </form>
          
                      )
                    }
                  </Mutation>
        
                  <Mutation
                    mutation={DELETE_SIGHTING} 
                    variables={{ _id, user, location, mushroom }}
                    refetchQueries={() => [
                      { query: GET_MY_SIGHTINGS, variables: { user } },
                      { query: GET_LOCATION, variables: { _id: location } },
                    ]}
                  >
                    {
                      (deleteSighting, attrs = {}) => {
          
                        return (
                          <div>
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
          }
        </Query>        
      </div>
    )
  }
};

export default withAuth(session => session && session.getCurrentUser)(withRouter(SightingEditPage));
