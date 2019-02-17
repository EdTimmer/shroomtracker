import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';

import { Mutation } from 'react-apollo';
import { UPDATE_LOCATION } from '../../queries';
import mushrooms4 from '../../images/mushrooms4.jpg';


class LocationEditPage extends React.Component {
  state = {
    _id: this.props.match.params._id,
    user: '',
    locationname: this.props.location.state.locationname,
    address: this.props.location.state.address
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

  handleSubmit = (event, updateLocation) => {
    event.preventDefault();
    updateLocation().then(() => {
      // this.clearState();     
      this.props.history.push(`/locations/${this.state._id}`);
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
    console.log('state is:', this.state);
    const { _id, locationname, address } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="App" style={{ backgroundImage: `url(${mushrooms4})`, height: '900px', color: 'white' }}
      >
                <div className="App">                
                  <Mutation
                    mutation={UPDATE_LOCATION}
                    variables={{
                      _id,
                      locationname,
                      address
                    }}
                  >
                    {
                      updateLocation => (
          
                        <form
                          onSubmit={(event) => handleSubmit(event, updateLocation)}
                        >
                          
                          <h2 className="main-title">
                            <strong>Edit Location</strong>
                          </h2>        
          
                          <div>
                            <input
                              type="text"
                              name="locationname"
                              placeholder={locationname}
                              onChange={handleChange}
                              value={locationname}
                            />
                          </div>
          
                          <div>
                            <input
                              type="text"
                              name="address"
                              placeholder={address}
                              onChange={handleChange}
                              value={address}
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(LocationEditPage));
