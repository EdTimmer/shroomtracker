import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';

import { Mutation } from 'react-apollo';
import { UPDATE_MUSHROOM } from '../../queries';

import mushrooms4 from '../../images/mushrooms4.jpg';


class MushroomEditPage extends React.Component {
  state = {
    _id: this.props.match.params._id,
    user: '',
    commonname: this.props.location.state.commonname,
    latinname: this.props.location.state.latinname,
    imageUrl: this.props.location.state.imageUrl,
    imageCredit: this.props.location.state.imageCredit
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

  handleSubmit = (event, updateMushroom) => {
    event.preventDefault();
    updateMushroom().then(() => {
      // this.clearState();     
      this.props.history.push(`/mushrooms/${this.state._id}`);
    })
  }

  render() {

    const { _id, commonname, latinname, imageUrl, imageCredit } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, height: '900px', color: 'white' }}
      >
        <div className="App">
          <Mutation
            mutation={UPDATE_MUSHROOM}
            variables={{
              _id,
              commonname,
              latinname,
              imageUrl,
              imageCredit
            }}
          >
            {
              updateMushroom => (

                <form
                  onSubmit={(event) => handleSubmit(event, updateMushroom)}
                >

                  <h2 className="main-title">
                    <strong>Edit Mushroom</strong>
                  </h2>

                  <div>
                    <h5>Common name (required)</h5>
                    <input
                      type="text"
                      name="commonname"
                      placeholder={commonname}
                      onChange={handleChange}
                      value={commonname}
                    />
                  </div>

                  <div>
                    <h5>Latin name</h5>
                    <input
                      type="text"
                      name="latinname"
                      placeholder={latinname}
                      onChange={handleChange}
                      value={latinname}
                    />
                  </div>

                  <div>
                    <h5>Image link (required)</h5>
                    <input
                      type="text"
                      name="imageUrl"
                      placeholder={imageUrl}
                      onChange={handleChange}
                      value={imageUrl}
                    />
                  </div>

                  <div>
                    <h5>Image credit</h5>
                    <input
                      type="text"
                      name="imageCredit"
                      placeholder={imageCredit}
                      onChange={handleChange}
                      value={imageCredit}
                    />
                  </div>

                  <button type="submit" className="regular-button">Update</button>

                </form>

              )
            }
          </Mutation>
          
        </div>

      </div>
    )
  }
};

export default withAuth(session => session && session.getCurrentUser)(withRouter(MushroomEditPage));
