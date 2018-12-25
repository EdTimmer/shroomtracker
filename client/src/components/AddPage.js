import React from 'react';
import withAuth from './withAuth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import Spinner from './Spinner';

import { Query } from 'react-apollo';
import { GET_CURRENT_USER} from '../queries';
import Error from './Error';
import mushrooms4 from '../images/mushrooms4.jpg';

class AddPage extends React.Component {
  state = {
    // username: '',
    userId: '',
  }

  componentDidMount() {
    this.setState({
      userId: this.props.session.getCurrentUser.userId,
      // username: this.props.session.getCurrentUser.username
    });
  }

  render() {
    const { userId } = this.state;
    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
      
        <h1 className="main-title">
          <strong>Add A Mushroom Sighting</strong>
        </h1>
        
        <ul>
          <li>
              <h3><NavLink to="/location/add" exact>To A New Location</NavLink></h3>
          </li>
          <li>
              <h3>To A Saved Location:</h3>
          </li>
        </ul>

        <Query query={GET_CURRENT_USER}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <Error error={error} />

            return (
              <div>                          
                {

                  data.getCurrentUser.locations.length ? (
                    <ul>                  
                      {
                        data.getCurrentUser.locations.map(location => 
                          <li key={location._id} value={location.locationname}> 
                          
                            <Link to={{ pathname: '/addpagetwo', state: { passedlocationname: location.locationname, passedlocationId: location._id } }}>
                              {location.locationname} 
                            </Link>                          
                          
                          </li>)
                      }
                    </ul>
                  ) : (<div><p>You have no saved locations</p></div>)
                  
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