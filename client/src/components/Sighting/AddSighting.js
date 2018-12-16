import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import Spinner from '../Spinner';

import { Query, Mutation } from 'react-apollo';
import { ADD_SIGHTING, GET_ALL_SIGHTINGS, GET_ALL_LOCATIONS, GET_CURRENT_USER } from '../../queries';
import Error from '../Error';

// const initialState = {
//   username: '',
//   locationname: this.props.location.state.passedlocationname,
//   commonname: '',
//   latinname: '',
//   imageUrl: '',
//   date: '',
//   latitude: '',
//   longitude: ''
// }

class AddSighting extends React.Component {
  state = {
    username: '',
    locationname: this.props.location.state.passedlocationname,
    commonname: '',
    latinname: '',
    imageUrl: '',
    date: '',
    latitude: '',
    longitude: ''
  };

  clearState = () => {
    this.setState({
      username: '',
      locationname: this.props.location.state.passedlocationname,
      commonname: '',
      latinname: '',
      imageUrl: '',
      date: '',
      latitude: '',
      longitude: ''
    });
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


  handleSubmit = (event, addSighting) => {
    event.preventDefault();
    addSighting().then(({ data }) => {
      console.log(data); 
      this.clearState();     
      this.props.history.push(`/sightings/${data.addSighting._id}`);
    });
  }

  validateForm = () => {
    const { locationname, commonname, date } = this.state;
    const isInvalid = !locationname || !commonname || !date;
    return isInvalid;
  }

  // updateCache = (cache, { data: { addSighting, username } }) => {
  //   const { getAllSightings } = cache.readQuery({ query: GET_ALL_SIGHTINGS, variables: { username } });

  //   cache.writeQuery({
  //     query: GET_ALL_SIGHTINGS,
  //     variables: {username},
  //     data: {
  //       getAllMushrooms: [addSighting, ...getAllSightings]
  //     }
  //   })
  // }

  render() {
    const { username, locationname, commonname, latinname, imageUrl, date, latitude, longitude } = this.state;
    // const {passedlocationname} = this.props.location.state
    // console.log('props are:', this.props)
    // console.log(passedlocationname) // "bar"
    // console.log('first username is', username)
    return (
      <Mutation
        mutation={ADD_SIGHTING}
        variables={{ username, locationname, commonname, latinname, imageUrl, date, latitude, longitude }}
        refetchQueries={() => [
          { query: GET_CURRENT_USER },
          { query: GET_ALL_LOCATIONS, variables: { username } },
          { query: GET_ALL_SIGHTINGS, variables: { username } }
        ]}
        // update={this.updateCache}
      >
        {
          (addSighting, { data, loading, error }) => {
            return (
              <div className="App">
                <h2 className="App">Add Sighting</h2>

                <form className="form" onSubmit={event => this.handleSubmit(event, addSighting)}>

                  <div>
                    <h4>Location: {locationname}</h4>
                  </div>

                  <input
                    type="text"
                    name="commonname"
                    placeholder="Common Name"
                    onChange={this.handleChange}
                    value={commonname}
                  />

                  <input
                    type="text"
                    name="latinname"
                    placeholder="Latin Name"
                    onChange={this.handleChange}
                    value={latinname}
                  />

                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="Mushroom Image"
                    onChange={this.handleChange}
                    value={imageUrl}
                  />

                  <input
                    type="text"
                    name="date"
                    placeholder="Date"
                    onChange={this.handleChange}
                    value={date}
                  />

                  <input
                    type="text"
                    name="latitude"
                    placeholder="Latitude"
                    onChange={this.handleChange}
                    value={latitude}
                  />

                  <input
                    type="text"
                    name="longitude"
                    placeholder="Longitude"
                    onChange={this.handleChange}
                    value={longitude}
                  />

                  <button
                    disabled={loading || this.validateForm()}
                    type="submit" className="botton-primary"
                  >
                    Submit
                </button>
                  {error && <Error error={error} />}
                </form>
              </div>
            )
          }
        }
      </Mutation>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddSighting));
