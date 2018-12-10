import React from 'react';
import Spinner from '../Spinner';

import { Mutation } from 'react-apollo';
import { ADD_LOCATION, GET_ALL_LOCATIONS } from '../../queries';
import Error from '../Error';
// import withAuth from '../withAuth';

const initialState = {
  locationname: '',
  address: ''
}

class AddLocation extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  }

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


  handleSubmit = (event, addLocation) => {
    event.preventDefault();
    addLocation().then(({ data }) => {
      // console.log(data);
      this.clearState();
      this.props.history.push("/");

    });
  }

  validateForm = () => {
    const { locationname, address } = this.state;
    const isInvalid = !locationname || !address;
    return isInvalid;
  }

  updateCache = (cache, { data: { addLocation } }) => {
    const { getAllLocations } = cache.readQuery({ query: GET_ALL_LOCATIONS });

    cache.writeQuery({
      query: GET_ALL_LOCATIONS,
      data: {
        getAllLocations: [addLocation, ...getAllLocations]
      }
    })
  }

  render() {
    const { locationname, address } = this.state;

    return (
      <Mutation
        mutation={ADD_LOCATION}
        variables={{ locationname, address }}
        refetchQueries={() => [
          { query: GET_ALL_LOCATIONS }
        ]}
        update={this.updateCache}
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

export default AddLocation;
