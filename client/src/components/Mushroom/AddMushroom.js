import React from 'react';
// import { withRouter } from 'react-router-dom';
// import CKEditor from 'react-ckeditor-component';

import { Mutation } from 'react-apollo';
import { ADD_MUSHROOM, GET_ALL_MUSHROOMS } from '../../queries';
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
    const isInvalid = !commononame || !imageUrl || !date;
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
          { query: GET_LOCATION_MUSHROOMS, variables: { locationname } }
        ]}
        update={this.updateCache}
      >
        {
          (addMushroom, { data, loading, error }) => {
            return (
              <div className="App">
                <h2 className="App">Add Recipe</h2>

                <form className="form" onSubmit={event => this.handleSubmit(event, addMushroom)}>

                  <input
                    type="text"
                    name="name"
                    placeholder="Recipe Name"
                    onChange={this.handleChange}
                    value={name}
                  />

                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="Recipe Image"
                    onChange={this.handleChange}
                    value={imageUrl}
                  />

                  <select
                    name="category"
                    onChange={this.handleChange}
                    value={category}
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>

                  <input
                    type="text"
                    name="description"
                    placeholder="Add description"
                    onChange={this.handleChange}
                    value={description}
                  />

                  <label htmlFor="instructions">Add Instructions</label>
                  <CKEditor
                    name="instructions"
                    content={instructions}
                    events={{ change: this.handleEditorChange }}
                  />
                  {/*<textarea
                    name="instructions"
                    placeholder="Add instructions"
                    onChange={this.handleChange}
                    value={instructions}
                  ></textarea>*/}

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

export default withAuth(session => session && session.getCurrentUser)(withRouter(addMushroom));
