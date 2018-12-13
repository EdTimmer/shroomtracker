import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import Spinner from '../Spinner';

import { Query, Mutation } from 'react-apollo';
import { ADD_SIGHTING, GET_ALL_LOCATION_MUSHROOM_SIGHTINGS, GET_ALL_MUSHROOM_SIGHTINGS, GET_ALL_LOCATIONS } from '../../queries';
import Error from '../Error';

// const initialState = {
//   commonname: this.props.commonname,
//   username: this.props.username,
//   locationname: '',
//   date: '',
//   latitude: '',
//   longitude: ''

// }

class AddSighting extends React.Component {
  // state = { ...initialState };
  state = {
    commonname: this.props.commonname,
    username: this.props.username,
    locationname: '',
    date: '',
    latitude: '',
    longitude: ''
  }

  // clearState = () => {
  //   this.setState({ ...initialState });
  // }

  // componentDidMount() {
  //   this.setState({
  //     username: this.props.session.getCurrentUser.username
  //   });
  // }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }


  handleSubmit = (event, addSighting) => {
    event.preventDefault();
    addSighting().then(({ data }) => {
      // console.log(data); 
      // this.clearState();     
      this.props.history.push("/");
    });
  }

  validateForm = () => {
    const { locationname, date } = this.state;
    const isInvalid = !locationname || !date;
    return isInvalid;
  }

  // updateCache = (cache, { data: { addMushroom, username } }) => {
  //   const { getAllMushrooms } = cache.readQuery({ query: GET_ALL_LOCATION_MUSHROOM_SIGHTINGS, variables: { username } });

  //   cache.writeQuery({
  //     query: GET_ALL_LOCATION_MUSHROOM_SIGHTINGS,
  //     variables: {username},
  //     data: {
  //       getAllMushrooms: [addMushroom, ...getAllMushrooms]
  //     }
  //   })
  // }

  render() {
    const { commonname, username, locationname, date, latitude, longitude } = this.state;
    console.log('first username is', username)
    return (
      <Mutation
        mutation={ADD_SIGHTING}
        variables={{ commonname, username, locationname, date, latitude, longitude }}
        refetchQueries={() => [
          { query: GET_ALL_LOCATIONS, variables: { username } }
        ]}
        update={this.updateCache}
      >
        {
          (addSighting, { data, loading, error }) => {
            return (
              <div className="App">
                <h2 className="App">Add Sighting</h2>

                <form className="form" onSubmit={event => this.handleSubmit(event, addSighting)}>

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


                  <Query query={GET_ALL_LOCATIONS} variables={{username}}>
                    {({ data, loading, error }) => {
                      if (loading) return <Spinner />
                      if (error) return <div>Error</div>
                      console.log('username is', username)
                      // const { on } = this.state;
                      return (
                        <div>                          
                          {
                            <select
                              name="locationname"
                              onChange={this.handleChange}  

                            >
                            <option value="-1"> Select Location </option>
                              {
                                data.getAllLocations.map(location => 
                                    <option key={location._id} value={location.locationname}> {location.locationname} </option>)
                              }

                            </select>
                          }
                        </div>
                      )
                    }}
                  </Query>


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
