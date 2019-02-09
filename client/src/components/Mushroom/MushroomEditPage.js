import React from 'react';
import { withRouter } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';
import withAuth from '../withAuth';

import { Query, Mutation } from 'react-apollo';
import { DELETE_SIGHTING, GET_SIGHTING, UPDATE_SIGHTING, GET_MY_SIGHTINGS, GET_LOCATION, UPDATE_MUSHROOM } from '../../queries';
import Spinner from '../Spinner';
import Error from '../Error';
// import { get } from 'https';
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

  // handleDelete = deleteSighting => {
  //   const confirmDelete = window.confirm('Are you sure you want to delete this sighting?');
  //   if (confirmDelete) {
  //     deleteSighting().then(() => {
  //       this.props.history.push(`/sightings`);
  //     })
  //   }
  // };

  render() {
    // console.log('state is:', this.state);
    const { _id, user, commonname, latinname, imageUrl, imageCredit } = this.state;
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
                          <h4>Edit Location</h4>        
          
                          <div>
                            <input
                              type="text"
                              name="commonname"
                              placeholder={commonname}
                              onChange={handleChange}
                              value={commonname}
                            />
                          </div>

                          <div>
                            <input
                              type="text"
                              name="latinname"
                              placeholder={latinname}
                              onChange={handleChange}
                              value={latinname}
                            />
                          </div>
          
                          <div>
                            <input
                              type="text"
                              name="imageUrl"
                              placeholder={imageUrl}
                              onChange={handleChange}
                              value={imageUrl}
                            />
                          </div>

                          <div>
                            <input
                              type="text"
                              name="imageCredit"
                              placeholder={imageCredit}
                              onChange={handleChange}
                              value={imageCredit}
                            />
                          </div>
          
                                    
                          <button type="submit" className="button-primary">Update</button>
          
                        </form>
          
                      )
                    }
                  </Mutation>
        
                  {/*<Mutation
                    mutation={DELETE_SIGHTING} 
                    variables={{ _id, user, location, mushroom }}
                    refetchQueries={() => [
                      { query: GET_MY_SIGHTINGS, variables: { user } },
                      { query: GET_LOCATION, variables: { _id: location } },
                    ]}
                  >
                    {
                      (deleteSighting, attrs = {}) => {
          
                        return (
                          <div>
                            <button
                              className="delete-button"
                              onClick={() => this.handleDelete(deleteSighting)}
                            >
                              Delete Sighting
                            </button>
                          </div>
                        )
                      }
                    }          
                  </Mutation>*/}
                </div>
       
      </div>
    )
  }
};

export default withAuth(session => session && session.getCurrentUser)(withRouter(MushroomEditPage));
