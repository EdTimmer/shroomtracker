import React from 'react';
import { withRouter } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';
import withAuth from '../withAuth';
import Spinner from '../Spinner';

import { Mutation } from 'react-apollo';
import { ADD_SIGHTING, GET_ALL_SIGHTINGS, GET_LOCATION_SIGHTINGS, GET_CURRENT_USER } from '../../queries';
import Error from '../Error';

// const initialState = {
//   username: '',
//   locationname: this.props.location.state.passedlocationname,
//   commonname: this.props.location.state.passedcommonname,
//   latinname: this.props.location.state.passedlatinname,
//   imageUrl: this.props.location.state.passedimageUrl,
//   date: '',
//   latitude: '',
//   longitude: ''
// }

class AddSightingSavedMushroom extends React.Component {
  state = { 
    user: '',
    location: this.props.location.state.location,
    locationname: this.props.location.state.locationname,
    commonname: this.props.location.state.commonname,
    latinname: this.props.location.state.latinname,
    imageUrl: this.props.location.state.imageUrl,
    imageCredit: this.props.location.state.imageCredit,
    date: '',
    latitude: '',
    longitude: ''
  };

  clearState = () => {
    this.setState({
      user: '',
      location: this.props.location.state.location,
      locationname: this.props.location.state.locationname,
      commonname: this.props.location.state.commonname,
      latinname: this.props.location.state.latinname,
      imageUrl: this.props.location.state.imageUrl,
      imageCredit: this.props.location.state.imageCredit,
      date: '',
      latitude: '',
      longitude: ''
    });
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
      this.clearState();     
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
    const { user, location, locationname, commonname, latinname, imageUrl, imageCredit, date, latitude, longitude } = this.state;


    // console.log('state is:', this.state)
    // console.log(this.props.location.state)

    return (
      <Mutation
        mutation={ADD_SIGHTING}
        variables={{ user, location, commonname, latinname, imageUrl, imageCredit, date, latitude, longitude }}
        // refetchQueries={() => [
        //   { query: GET_CURRENT_USER },
        //   // { query: GET_ALL_LOCATIONS, variables: { username } },
        //   { query: GET_ALL_SIGHTINGS, variables: { username } },
        //   { query: GET_LOCATION_SIGHTINGS, variables: { username, locationname } }
        // ]}
        // update={this.updateCache}
      >
        {
          (addSighting, { data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <Error error={error} />
            return (
              <div className="App" style={{color: 'black'}}>
                <h2 className="App">Add Sighting</h2>

                <form className="form" onSubmit={event => this.handleSubmit(event, addSighting)}>
                  <div>
                    <img src={imageUrl} style={{width: '200px'}} alt="mushroom" />                    
                  </div>

                  <div>
                    <h4>Image Credit: {imageCredit}</h4>
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
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddSightingSavedMushroom));
