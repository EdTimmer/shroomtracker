import React from 'react';
import withAuth from './withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import Spinner from './Spinner';

import { Query } from 'react-apollo';
import { GET_ALL_LOCATIONS } from '../queries';
import Error from './Error';

class AddPage extends React.Component {
  state = {
    username: '',
    locationname: ''
  }

  clearState = () => {
    this.setState({ locationname: '', username: '' });
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


  handleSubmit = (event, addSighting) => {
    event.preventDefault();
    addSighting().then(({ data }) => {
      console.log(data); 
      this.clearState();     
      this.props.history.push(`/sightings/${data.addSighting._id}`);
    });
  }

  render() {
    const { username, locationname } = this.state;
    return (
      <div className="App">

        <h4 style={{marginTop: '20px'}}>Add A Mushroom Sighting</h4>

        <ul>
          <li>
              <h3><NavLink to="/location/add" exact>To A New Location</NavLink></h3>
          </li>
          <li>
              <h3>To A Saved Location:</h3>
          </li>
        </ul>

        <Query query={GET_ALL_LOCATIONS} variables={{username}}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>
            // console.log('username is', username)
            // const { on } = this.state;
            return (
              <div>                          
                {
                  <ul
                    name="locationname"
                    onChange={this.handleChange}  

                  >
                  
                    {
                      data.getAllLocations.map(location => 
                          <li key={location._id} value={location.locationname}> 
                          
                            <Link to={{ pathname: '/addpagetwo', state: { passedlocationname: location.locationname } }}>
                              {location.locationname} 
                            </Link>                          
                          
                          </li>)
                    }

                  </ul>
                }
              </div>
            )
          }}
        </Query>
  
      </div>
    )
  }
} 
  


export default withAuth(session => session && session.getCurrentUser)(withRouter(AddPage));