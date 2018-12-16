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
    locationname: this.props.location.state.passedlocationname,
    commonname: ''
  }

  clearState = () => {
    this.setState({ 
      username: '',
      locationname: this.props.location.state.passedlocationname
    });
  }

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
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

    // const {passedlocationname} = this.props.location.state

    // console.log(passedlocationname) // "bar"

    return (
      <div className="App">
        <h4 style={{marginTop: '20px'}}>Add A Mushroom Sighting</h4>
        <ul>
          <li>
              <h3>
              <Link to={{ pathname: '/sighting/add', state: { passedlocationname: locationname } }}>
                New Mushroom Not Previously Found Anywhere To Be Added To {locationname} 
              </Link> 

              </h3>
          </li>
          <li>
              <h3>For A Saved Mushroom:</h3>
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
                
                  <ul>
                    {

                      filteredSightings.map(sighting => 
                          <li key={sighting._id} value={[sighting.commonname, sighting.latinname, sighting.imageUrl]}
                          > 

                          <Link to={{ pathname: '/sightingsavedmushroom/add', state: { passedcommonname: sighting.commonname, passedlatinname: sighting.latinname,
                          passedimageUrl: sighting.imageUrl, passedlocationname: locationname } }}>
                            {sighting.commonname}
                          </Link> 
                             


                          </li>)                                    
                    }
                  </ul>

                  
                    

              </div>
            )
          }}
        </Query>
  
      </div>
    )
  }
} 






export default withAuth(session => session && session.getCurrentUser)(withRouter(AddPageTwo));