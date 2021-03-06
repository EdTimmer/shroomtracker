import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import Spinner from '../Spinner';

import { Mutation } from 'react-apollo';
import { ADD_MUSHROOM, GET_MY_MUSHROOMS, GET_CURRENT_USER, GET_SELECTION_MUSHROOMS } from '../../queries';
import Error from '../Error';
import mushrooms4 from '../../images/mushrooms4.jpg';

const initialState = {
  user: '',
  location: '',
  commonname: '',
  latinname: '',
  imageUrl: '',
  imageCredit: '',
  newMushroom: true
}

class AddMushroom extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  }

  componentDidMount() {
    this.setState({
      user: this.props.session.getCurrentUser._id,
      location: this.props.location.state.location.state ? this.props.location.state.location.state.location : this.props.location.state.location,
      commonname: this.props.location.state ? this.props.location.state.commonname : '',
      latinname: this.props.location.state ? this.props.location.state.latinname : '',
      imageUrl: this.props.location.state ? this.props.location.state.imageUrl : '',
      imageCredit: this.props.location.state ? this.props.location.state.imageCredit : '',
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
    const { commonname, latinname, imageUrl, imageCredit, user, location, newMushroom } = this.state;
    // console.log('this.state in AddMushroom is:', this.state)
    // console.log('location in AddMushroom is:', location)
    return (
      <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, height: '900px' }}>
        <Mutation
          mutation={ADD_MUSHROOM}
          variables={{ commonname, latinname, imageUrl, imageCredit, user, location, newMushroom }}
          refetchQueries={() => [
            { query: GET_MY_MUSHROOMS, variables: { user } },
            { query: GET_CURRENT_USER },
            { query: GET_SELECTION_MUSHROOMS, variables: { user } }
          ]}
        // update={this.updateCache}
        >
          {
            (addMushroom, { data, loading, error }) => {
              if (loading) return <Spinner />
              if (error) return <Error error={error} />
              return (
                <div className="App">

                  <h2 className="main-title">
                    <strong>Add Mushroom</strong>
                  </h2>

                  <div>
                    <img src={imageUrl} style={{ width: '600px' }} alt="mushroom" />
                  </div>

                  <div>
                    <h4>Common Name: {commonname}</h4>
                  </div>

                  <div>
                    <h4>Latin Name: {latinname}</h4>
                  </div>

                  <form className="form" onSubmit={event => this.handleSubmit(event, addMushroom)}>

                    <button
                      type="submit"
                      disabled={loading || this.validateForm()}
                      className="regular-button"
                    >
                      Confirm Mushroom
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddMushroom));
