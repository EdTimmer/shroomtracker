import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import Spinner from '../Spinner';
import Error from '../Error';
import mushrooms4 from '../../images/mushrooms4.jpg';

import { Mutation } from 'react-apollo';
import { ADD_SIGHTING, ADD_MUSHROOM } from '../../queries';

class AddSighting extends React.Component {
  state = {
    user: '',
    location: this.props.location.state.location,
    mushroom: this.props.location.state.mushroom,
    locationname: this.props.location.state.locationname,
    commonname: this.props.location.state.commonname,
    latinname: this.props.location.state.latinname,
    imageUrl: this.props.location.state.imageUrl,
    imageCredit: this.props.location.state.imageCredit,
    date: '',
    latitude: '',
    longitude: ''
  };

  // clearState = () => {
  //   this.setState({
  //     user: '',
  //     location: this.props.location.state.location,
  //     locationname: this.props.location.state.locationname,
  //     commonname: '',
  //     latinname: '',
  //     imageUrl: '',
  //     imageCredit: '',
  //     date: '',
  //     latitude: '',
  //     longitude: ''
  //   });
  // }

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

  handleSubmit = (event, addSighting) => {
    event.preventDefault();
    addSighting().then(({ data }) => {
      console.log(data);
      // this.clearState();
      this.props.history.push(`/sightings/${data.addSighting._id}`);
    });
  }

  validateForm = () => {
    const { location, commonname, date } = this.state;
    const isInvalid = !location || !commonname || !date;
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
    const { user, location, mushroom, locationname, commonname, latinname, imageUrl, imageCredit, date, latitude, longitude } = this.state;
    // const {passedlocationname} = this.props.location.state
    // console.log('props are:', this.props)
    // console.log(passedlocationname) // "bar"
    // console.log('first username is', username)
    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
        <Mutation
          mutation={ADD_SIGHTING}
          variables={{ user, location, mushroom, date, latitude, longitude }}
        // refetchQueries={() => [
        //   { query: GET_CURRENT_USER },
        //   // { query: GET_ALL_LOCATIONS, variables: { username } },
        //   { query: GET_ALL_SIGHTINGS, variables: { username } },
        //   { query: GET_LOCATION_SIGHTINGS, variables: { username, locationname } },
        // ]}
        // update={this.updateCache}
        >
          {
            (addSighting, { data, loading, error }) => {
              if (loading) return <Spinner />
              if (error) return <Error error={error} />
              return (
                <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, height: '900px' }}>
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
                      name="imageCredit"
                      placeholder="Image Credit"
                      onChange={this.handleChange}
                      value={imageCredit}
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

                  </form>
                </div>
              )
            }
          }
        </Mutation>
      </div>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddSighting));
