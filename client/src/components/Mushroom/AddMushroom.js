import React from 'react';
// import { withRouter } from 'react-router-dom';
// import CKEditor from 'react-ckeditor-component';
import Spinner from '../Spinner';

import { Query, Mutation } from 'react-apollo';
import { ADD_MUSHROOM, GET_ALL_MUSHROOMS, GET_ALL_LOCATIONS } from '../../queries';
import Error from '../Error';
// import withAuth from '../withAuth';

const initialState = {
  commonname: '',
  latinname: '',
  locationname: '',
  imageUrl: '',
  date: '',
  coordinates: ''
}

class AddMushroom extends React.Component {
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


  handleSubmit = (event, addMushroom) => {
    event.preventDefault();
    addMushroom().then(({ data }) => {
      // console.log(data);
      this.clearState();
      this.props.history.push("/");

    });
  }

  validateForm = () => {
    const { commonname, imageUrl, date } = this.state;
    const isInvalid = !commonname || !imageUrl || !date;
    return isInvalid;
  }

  updateCache = (cache, { data: { addMushroom } }) => {
    const { getAllMushrooms } = cache.readQuery({ query: GET_ALL_MUSHROOMS });

    cache.writeQuery({
      query: GET_ALL_MUSHROOMS,
      data: {
        getAllMushrooms: [addMushroom, ...getAllMushrooms]
      }
    })
  }

  render() {
    const { commonname, latinname, locationname, imageUrl, date, coordinates } = this.state;

    return (
      <Mutation
        mutation={ADD_MUSHROOM}
        variables={{ commonname, latinname, locationname, imageUrl, date, coordinates }}
        refetchQueries={() => [
          { query: GET_ALL_MUSHROOMS }
        ]}
        update={this.updateCache}
      >
        {
          (addMushroom, { data, loading, error }) => {
            return (
              <div className="App">
                <h2 className="App">Add Mushroom</h2>

                <form className="form" onSubmit={event => this.handleSubmit(event, addMushroom)}>

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

                  <Query query={GET_ALL_LOCATIONS}>
                    {({ data, loading, error }) => {
                      if (loading) return <Spinner />
                      if (error) return <div>Error</div>
                      // console.log(data)
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
                                data.getAllLocations.map(location => <option key={location._id} value={location.locationname}> {location.locationname} </option>)
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
                    placeholder="Add Date"
                    onChange={this.handleChange}
                    value={date}
                  />

                  <input
                    type="text"
                    name="coordinates"
                    placeholder="Add Coordinates"
                    onChange={this.handleChange}
                    value={coordinates}
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

export default AddMushroom;
