import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import Spinner from '../Spinner';

import { Query, Mutation } from 'react-apollo';
import { ADD_SIGHTING, GET_ALL_SIGHTINGS, GET_ALL_LOCATIONS, GET_CURRENT_USER } from '../../queries';
import Error from '../Error';

const initialState = {
  username: '',
  locationname: '',
  commonname: '',
  latinname: '',
  imageUrl: '',
  date: '',
  latitude: '',
  longitude: ''
}

class AddSightingSavedMushroom extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
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

  handleMushroomChange = event => {
    
    const { value } = event.target;
    // console.log('value is', value);
    const valueArray = value.split(",")
    this.setState({
      commonname: valueArray[0],
      latinname: valueArray[1],
      imageUrl: valueArray[2]
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
    const { username, locationname, commonname, latinname, imageUrl, date, latitude, longitude } = this.state;


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

                  <Query query={GET_ALL_SIGHTINGS} variables={{username}}>
                    {({ data, loading, error }) => {
                      if (loading) return <Spinner />
                      if (error) return <div>Error</div>
                      // console.log('username is', username)
                      // const { on } = this.state;
                      const filteredSightings = data.getAllSightings.filter(sighting => {
                        if (data.getAllSightings[sighting.commonname]) {
                            return false;
                        }
                        data.getAllSightings[sighting.commonname] = true;
                        return true;
                      });

                      return (
                        <div>                          
                          {
                            <select
                              // name="commonname"
                              onChange={this.handleMushroomChange}  

                            >
                            <option value="-1"> Select Mushroom </option>
                            
                              {

                                filteredSightings.map(sighting => 
                                    <option key={sighting._id} value={[sighting.commonname, sighting.latinname, sighting.imageUrl]}> {sighting.commonname} </option>)                                    
                              }

                            </select>
                          }
                        </div>
                      )
                    }}
                  </Query>

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

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddSightingSavedMushroom));