import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import '../App.css';

import { Query } from 'react-apollo';
import { GET_MY_SIGHTINGS } from '../../queries';

import SightingItem from './SightingItem';
import Spinner from '../Spinner';
import Error from '../Error';
import mushrooms4 from '../../images/mushrooms4.jpg'

class AllSightingsPage extends Component {

  render() {
    const user = this.props.session.getCurrentUser._id;
    // console.log(this.props.session.getCurrentUser.username)
    if (!user) {
      return null;
    }

    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
        <h1 className="main-title">
          <strong>My Mushroom Sightings</strong> 
        </h1>

        
          <Query query={GET_MY_SIGHTINGS} variables={{ user }}>
            {
              ({ data, loading, error }) => {
                if (loading) return <Spinner />
                if (error) return <Error error={error} />
                // console.log('data.getMySightings is:', data.getMySightings);
                return (            
                    <div>
                      {
                        data.getMySightings.length ? (
                          <div className="cards">                  
                            {
                              data.getMySightings.map(sighting => (
                                <SightingItem key={sighting._id} _id={sighting._id} locationname={sighting.location.locationname} commonname={sighting.mushroom.commonname} imageUrl={sighting.mushroom.imageUrl} date={sighting.date} />
                              ))
                            }
                          </div>
                        ) : (<div><p>You have no saved sightings</p></div>)            
                      }
                    </div>                       
                )
              }
            }
          </Query>

        </div>

      
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AllSightingsPage));
