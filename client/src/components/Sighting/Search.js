import React from 'react';

import { ApolloConsumer } from 'react-apollo';
import { SEARCH_SIGHTINGS } from '../../queries';
import SearchItem from './SearchItem';

class Search extends React.Component {

  state = {
    username: '',
    searchResults: []
  }

  handleChange = ({ searchSightings }) => {
    this.setState({
      searchResults: searchSightings
    })
  }

  render() {
    const { searchResults } = this.state;
    return (
      <ApolloConsumer>
      {
        client => (
          <div className="App">
            <input 
              type="search" 
              className="search"
              placeholder="Search For My Found Mushrooms" 
              onChange={async event => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_SIGHTINGS,
                  variables: { searchTerm: event.target.value}
                });
                this.handleChange(data);
              }}
            />
            <ul>
              {searchResults.map(sighting =>
                <SearchItem key={sighting._id} {...sighting} />
              )}
            </ul>
          </div>
        )
      }  
    </ApolloConsumer>
    )
  }
} 
  
  


export default Search;
