import React from 'react';
import { withRouter } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';
import withAuth from '../withAuth';

import { Query, Mutation } from 'react-apollo';
import { DELETE_SIGHTING, GET_ALL_LOCATIONS, UPDATE_SIGHTING, GET_ALL_SIGHTINGS } from '../../queries';
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
    latinname: this.props.location.state.latinname ? this.props.location.state.latinname : '',
    imageUrl: this.props.location.state.imageUrl ? this.props.location.state.imageUrl : '',
    imageCredit: this.props.location.state.imageCredit ? this.props.location.state.imageCredit : '',
    date: this.props.location.state.date,
    latitude: this.props.location.state.latitude ? this.props.location.state.latitude : '',
    longitude: this.props.location.state.longitude ? this.props.location.state.longitude : ''
  }

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
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
    const { _id, username, locationname, commonname, latinname, imageUrl, imageCredit, date, latitude, longitude } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, height: '900px', color: 'white' }}
      >
        <Mutation
          mutation={UPDATE_SIGHTING}
          variables={{
            _id,
            locationname,
            commonname,
            latinname,
            imageUrl,
            imageCredit,
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

                <Query query={GET_ALL_LOCATIONS} variables={{ username }}>
                  {({ data, loading, error }) => {
                    if (loading) return <Spinner />
                    if (error) return <Error error={error} />
                    // console.log(data)


                    return (
                      <div style={{ color: 'black' }}>
                        <select
                          name="locationname"
                          onChange={handleChange}
                        >
                          <option value='-1'>{locationname}</option>
                          {
                            data.getAllLocations.map(location => (
                              <option key={location._id} value={location.locationname}>
                                {location.locationname}
                              </option>
                            ))
                          }
                        </select>

                      </div>

                    )
                  }}
                </Query>
                <div>
                  <input
                    type="text"
                    name="commonname"
                    placeholder={commonname}
                    onChange={handleChange}
                    value={commonname}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="latinname"
                    placeholder={latinname}
                    onChange={handleChange}
                    value={latinname}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="imageUrl"
                    placeholder={imageUrl}
                    onChange={handleChange}
                    value={imageUrl}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="imageCredit"
                    placeholder={imageCredit}
                    onChange={handleChange}
                    value={imageCredit}
                  />
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
