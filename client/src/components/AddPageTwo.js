import React from 'react';
import withAuth from './withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import Spinner from './Spinner';

import { Query } from 'react-apollo';
import { GET_ALL_SIGHTINGS } from '../queries';
import Error from './Error';

class AddPageTwo extends React.Component {
  state = {
    username: '',
    locationname: '',
    commonname: ''
  }

  clearState = () => {
    this.setState({ 
      username: '',
      locationname: ''
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps) {
  //     this.setState({
  //       locationname: nextProps.location.state.foo,
  //     })
  //   }
  // }

  render() {
    const { username, locationname, commonname } = this.state;

    const {passedlocationname} = this.props.location.state

    console.log(passedlocationname) // "bar"

    return (
      <div className="App">
        <h4 style={{marginTop: '20px'}}>Add A Mushroom Sighting</h4>
        <ul>
          <li>
              <h3><NavLink to="/sighting/add" exact>For New Mushroom</NavLink></h3>
          </li>
          <li>
              <h3><NavLink to="/sightingsavedmushroom/add">For A Saved Mushroom</NavLink></h3>
          </li>
        </ul>

        <Query query={GET_ALL_SIGHTINGS} variables={{username}}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>
            // console.log('username is', username)
            // const { on } = this.state;
            const filteredSightings = data.getAllSightings.filter(sighting => {
              if (data.getAllSightings[sighting.commonname]) {
                  return false;
              }
              data.getAllSightings[sighting.commonname] = true;
              return true;
            });

            return (
              <div>                          
                {
                  <select
                    // name="commonname"
                    onChange={this.handleMushroomChange}  

                  >
                  <option value="-1"> Select Mushroom </option>
                  
                    {

                      filteredSightings.map(sighting => 
                          <option key={sighting._id} value={[sighting.commonname, sighting.latinname, sighting.imageUrl]}> {sighting.commonname} </option>)                                    
                    }

                  </select>
                }
              </div>
            )
          }}
        </Query>
  
      </div>
    )
  }
} 






export default withAuth(session => session && session.getCurrentUser)(withRouter(AddPageTwo));