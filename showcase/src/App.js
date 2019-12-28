import React from 'react';
import './App.scss';
import SearchWithAutoComplete from 'tomtom-react-searchbox';

function App() {
  return (
    <div className="App">
      <SearchWithAutoComplete
        minNumbOfChars={3}
        autofocus={true}
        searchOptions={{
          key: process.env.REACT_APP_TOMTOM_SEARCH_API_KEY,
          language: 'en-Gb',
          limit: 5
        }} />
    </div>
  );
}

export default App;
