import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import withAuth from '../withAuth';

import { ADD_LOCATION, GET_ALL_LOCATIONS, GET_CURRENT_USER } from '../../queries';

import Spinner from '../Spinner';
import Error from '../Error';


const initialState = {
  username: '',
  locationname: '',
  address: ''  
}

class AddLocation extends React.Component {
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


  handleSubmit = (event, addLocation) => {
    event.preventDefault();
    addLocation().then(({ data }) => {
      // console.log(data);
      this.clearState();
      this.props.history.push("/addpagetwo");

    });
  }

  validateForm = () => {
    const { locationname, address } = this.state;
    const isInvalid = !locationname || !address;
    return isInvalid;
  }

  // updateCache = (cache, { data: { addLocation, username } }) => {
  //   const { getAllLocations } = cache.readQuery({ query: GET_ALL_LOCATIONS, variables: {username} });

  //   cache.writeQuery({
  //     query: GET_ALL_LOCATIONS,
  //     variables: {username},
  //     data: {
  //       getAllLocations: [addLocation, ...getAllLocations]
  //     }
  //   })
  // }

  render() {
    const { locationname, address, username } = this.state;

    return (
      <Mutation
        mutation={ADD_LOCATION}
        variables={{ locationname, address, username }}
        refetchQueries={() => [
          { query: GET_CURRENT_USER },
          { query: GET_ALL_LOCATIONS, variables: { username } }          
        ]}
        // update={this.updateCache}
      >
        {
          (addLocation, { data, loading, error }) => {
            return (
              <div className="App">
                <h2 className="App">Add Location</h2>

                <form className="form" onSubmit={event => this.handleSubmit(event, addLocation)}>

                  <input
                    type="text"
                    name="locationname"
                    placeholder="Location Name"
                    onChange={this.handleChange}
                    value={locationname}
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={this.handleChange}
                    value={address}
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddLocation));
