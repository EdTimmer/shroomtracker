import React from 'react';
import { withRouter, Link } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';
import withAuth from '../withAuth';

import { Query } from 'react-apollo';
import { GET_SIGHTING } from '../../queries';
import Spinner from '../Spinner';
import Error from '../Error';
// import { get } from 'https';
import mushrooms4 from '../../images/mushrooms4.jpg';


class SightingEditPage extends React.Component {
  state = {
    _id: this.props.match.params._id
  }
  
  render() {
    console.log('state is:', this.state);
    const { _id } = this.state;
    return (
      <Query query={GET_SIGHTING} variables={{ _id }}>
        {
          ({ data, loading, error }) => {
  
            if (loading) return <Spinner />
            if (error) return <Error error={error} />
            // console.log(data.getSighting);          
  
            return (
              <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px', color: 'brown'}}>
                
                {
                  data.getSighting.commonname
                }
              </div>
            )
          }
        }
      </Query>
    )
  }
  
};

export default withAuth(session => session && session.getCurrentUser)(withRouter(SightingEditPage));
