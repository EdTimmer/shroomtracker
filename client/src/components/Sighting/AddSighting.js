import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import Spinner from '../Spinner';

import { Mutation } from 'react-apollo';
import { ADD_SIGHTING, GET_MY_SIGHTINGS, GET_MY_MUSHROOMS, GET_LOCATION } from '../../queries';
import Error from '../Error';
import mushrooms4 from '../../images/mushrooms4.jpg';

class AddSighting extends React.Component {
  state = {
    user: '',
    location: '',
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

  componentDidMount() {
    this.setState({
      user: this.props.session.getCurrentUser._id,
      location: this.props.location.state.location.state ? this.props.location.state.location.state.location : this.props.location.state.location,
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  // handleMushroomChange = event => {

  //   const { value } = event.target;
  //   // console.log('value is', value);
  //   const valueArray = value.split(",")
  //   this.setState({
  //     commonname: valueArray[0],
  //     latinname: valueArray[1],
  //     imageUrl: valueArray[2]
  //   });
  // }


  handleSubmit = (event, addSighting) => {
    event.preventDefault();
    addSighting().then(({ data }) => {
      // console.log(data); 
      // this.clearState();     
      this.props.history.push(`/sightings/${data.addSighting._id}`);
    });
  }

  validateForm = () => {
    const { location, commonname, date } = this.state;
    const isInvalid = !location || !commonname || !date;
    return isInvalid;
  }

  // updateCache = (cache, { data: { AddSightingSavedMushroom, username } }) => {
  //   const { getAllSightings } = cache.readQuery({ query: GET_ALL_SIGHTINGS, variables: { username } });

  //   cache.writeQuery({
  //     query: GET_ALL_SIGHTINGS,
  //     variables: {username},
  //     data: {
  //       getAllMushrooms: [AddSightingSavedMushroom, ...getAllSightings]
  //     }
  //   })
  // }

  render() {
    const { user, location, mushroom, locationname, commonname, latinname, imageUrl, date, latitude, longitude } = this.state;


    // console.log('state is:', this.state)
    // console.log('location in AddSighting is', location)

    return (
      <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, height: '900px' }}>
        <Mutation
          mutation={ADD_SIGHTING}
          variables={{ user, location, mushroom, date, latitude, longitude }}
          refetchQueries={() => [
            { query: GET_MY_SIGHTINGS, variables: { user } },
            { query: GET_MY_MUSHROOMS, variables: { user } },
            { query: GET_LOCATION, variables: { _id: location } },
          ]}
        // update={this.updateCache}
        >
          {
            (addSighting, { data, loading, error }) => {
              if (loading) return <Spinner />
              if (error) return <Error error={error} />
              return (
                <div className="App">

                  <h2 className="main-title">
                    <strong>Add Sighting</strong>
                  </h2>

                  <form className="form" onSubmit={event => this.handleSubmit(event, addSighting)}>
                    <div>
                      <img src={imageUrl} style={{ width: '200px' }} alt="mushroom" />
                    </div>

                    <div>
                      <h4>Location: {locationname}</h4>
                    </div>

                    <div>
                      <h4>Common Name: {commonname}</h4>
                    </div>

                    <div>
                      <h4>Latin Name: {latinname}</h4>
                    </div>

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
                      type="submit" className="regular-button"
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
