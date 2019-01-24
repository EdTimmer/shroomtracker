import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import Spinner from '../Spinner';
// import AddSighting from '../Sighting/AddSighting';

import { Mutation } from 'react-apollo';
import { ADD_MUSHROOM, GET_MY_MUSHROOMS } from '../../queries';
import Error from '../Error';
import mushrooms4 from '../../images/mushrooms4.jpg';

const initialState = {
  user: '',
  location: '',
  commonname: '',
  latinname: '', 
  imageUrl: '',
  imageCredit: ''  
}

class AddNewMushroom extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  }

  componentDidMount() {
    this.setState({
      user: this.props.session.getCurrentUser._id,
      location: this.props.location.state ? this.props.location.state.location : '',
      // commonname: this.props.location.state ? this.props.location.state.commonname : '',
      // latinname: this.props.location.state ? this.props.location.state.latinname : '', 
      // imageUrl: this.props.location.state ? this.props.location.state.imageUrl : '',
      // imageCredit: this.props.location.state ? this.props.location.state.imageCredit : '',
    });
  }

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
      // this.clearState();     
      this.props.history.push({
        pathname: "/sighting/add",
        state: {
          location: this.state.location,
          locationname: this.props.location.state.locationname,
          mushroom: data.addMushroom._id,
          commonname: data.addMushroom.commonname,
          latinname: data.addMushroom.latinname,
          imageUrl: data.addMushroom.imageUrl,
          imageCredit: data.addMushroom.imageCredit
        }
      });
    });
  }

  validateForm = () => {
    const { commonname, imageUrl } = this.state;
    const isInvalid = !commonname || !imageUrl;
    return isInvalid;
  }

  // updateCache = (cache, { data: { addMushroom, username } }) => {
  //   const { getAllMushrooms } = cache.readQuery({ query: GET_ALL_MUSHROOMS, variables: { username } });

  //   cache.writeQuery({
  //     query: GET_ALL_MUSHROOMS,
  //     variables: {username},
  //     data: {
  //       getAllMushrooms: [addMushroom, ...getAllMushrooms]
  //     }
  //   })
  // }

  render() {
    const { commonname, latinname, imageUrl, imageCredit, user, location } = this.state;
    console.log('this.state in AddNewMushroom is:', this.state)
    console.log('location in AddNewMushroom is:', location)
    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
        <Mutation
          mutation={ADD_MUSHROOM}
          variables={{ commonname, latinname, imageUrl, imageCredit, user, location }}
          refetchQueries={() => [
            { query: GET_MY_MUSHROOMS, variables: { user } }
          ]}
          // update={this.updateCache}
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

                    <input
                      type="text"
                      name="imageCredit"
                      placeholder="Image Credit"
                      onChange={this.handleChange}
                      value={imageCredit}
                    />                  

                    <button
                      type="submit"
                      disabled={loading || this.validateForm()}
                      className="button-primary"
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
      </div>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddNewMushroom));
