import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import withAuth from '../withAuth';
import mushrooms4 from '../../images/mushrooms4.jpg';

import { ADD_LOCATION, GET_MY_LOCATIONS } from '../../queries';

import Spinner from '../Spinner';
import Error from '../Error';


const initialState = {
  user: '',
  locationname: '',
  address: '',
  location: ''
}

class AddLocation extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
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


  handleSubmit = (event, addLocation) => {
    event.preventDefault();
    addLocation().then(({ data }) => {
      // console.log('data after saving location:', data);
      // this.clearState();
      this.props.history.push({
        pathname: '/selectmushroom',
        state: {
          locationname: this.state.locationname,
          location: data.addLocation._id
        }
      });

    });
  }

  validateForm = () => {
    const { locationname, address } = this.state;
    const isInvalid = !locationname || !address;
    return isInvalid;
  }


  // updateCache = (cache, { data: { addLocation, user } }) => {
  //   const { getMyLocations } = cache.readQuery({ query: GET_MY_LOCATIONS, variables: {user} });

  //   cache.writeQuery({
  //     query: GET_MY_LOCATIONS,
  //     variables: {user},
  //     data: {
  //       getMyLocations: [addLocation, ...getMyLocations]
  //     }
  //   })
  // }

  render() {

    const { locationname, address, user } = this.state;

    return (
      <Mutation
        mutation={ADD_LOCATION}
        variables={{ locationname, address, user }}
        refetchQueries={() => [
          { query: GET_MY_LOCATIONS, variables: { user } },
          // { query: GET_ALL_LOCATIONS, variables: { username } }          
        ]}
      // update={this.updateCache}
      >
        {
          (addLocation, { data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <Error error={error} />
            return (
              <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, height: '900px' }}>

                <h2 className="main-title">
                  <strong>Add Location</strong>
                </h2>

                <form className="form" onSubmit={event => this.handleSubmit(event, addLocation)}>

                  <input
                    type="text"
                    name="locationname"
                    placeholder="Location Name (REQUIRED)"
                    onChange={this.handleChange}
                    value={locationname}
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Address (REQUIRED)"
                    onChange={this.handleChange}
                    value={address}
                  />

                  <button
                    disabled={loading || this.validateForm()}
                    type="submit" className="regular-button"
                    style={{ color: 'white' }}
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddLocation));
