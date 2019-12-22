import React from 'react';
import './App.scss';


import SearchWithAutoComplete from 'tomtom-react-searchbox';

function App() {
  return (
    <div className="App">
      <SearchWithAutoComplete
        minNumbOfChars={3}
        placeholder="Custom placeholder"
        inputElements={(props) => {
          return [
            <a href="fds" onClick={e => e.preventDefault()}>Buka</a>,
            <div onClick={props.onClear}>Clear right</div>
          ];
        }}
        searchOptions={{
          key: '<api-key>',
          language: 'en-Gb',
          limit: 5
        }} />
    </div>
  );
}

export default App;
