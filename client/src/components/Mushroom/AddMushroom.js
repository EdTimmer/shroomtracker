import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import Spinner from '../Spinner';
import AddSighting from '../Sighting/AddSighting';

import { Mutation } from 'react-apollo';
import { ADD_MUSHROOM, GET_ALL_MUSHROOMS } from '../../queries';
import Error from '../Error';

const initialState = {
  commonname: '',
  latinname: '',
  imageUrl: '',
  username: ''
}

class AddMushroom extends React.Component {
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


  handleSubmit = (event, addMushroom) => {
    event.preventDefault();
    addMushroom().then(({ data }) => {
      // console.log(data); 
      // this.clearState();     
      // this.props.history.push("/");
    });
  }

  validateForm = () => {
    const { commonname, imageUrl } = this.state;
    const isInvalid = !commonname || !imageUrl;
    return isInvalid;
  }

  updateCache = (cache, { data: { addMushroom, username } }) => {
    const { getAllMushrooms } = cache.readQuery({ query: GET_ALL_MUSHROOMS, variables: { username } });

    cache.writeQuery({
      query: GET_ALL_MUSHROOMS,
      variables: {username},
      data: {
        getAllMushrooms: [addMushroom, ...getAllMushrooms]
      }
    })
  }

  render() {
    const { commonname, latinname, imageUrl, username } = this.state;

    return (
      <Mutation
        mutation={ADD_MUSHROOM}
        variables={{ commonname, latinname, imageUrl, username }}
        refetchQueries={() => [
          { query: GET_ALL_MUSHROOMS, variables: { username } }
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

                  

                  <button
                    disabled={loading || this.validateForm()}
                    type="submit" className="botton-primary"
                  >
                    Submit
                </button>
                  {error && <Error error={error} />}
                </form>
                <AddSighting commonname={commonname} username={this.props.session.getCurrentUser.username} />
              </div>
            )
          }
        }
      </Mutation>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddMushroom));
