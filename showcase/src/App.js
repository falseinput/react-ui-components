import React from 'react';
import './App.scss';
import TomtomReactSearchbox from 'tomtom-react-searchbox';

function App() {
  const [resultsFetch, setResultsFetch] = React.useState(0);
  const [resultChoose, setResultChoose] = React.useState(0);
  const [resultSelect, setResultSelect] = React.useState(0);

  return (
    <>
    <div className="header">
      <div className="section">
        <h1>Tomtom React Searchbox</h1>
        Lightweight & easily customizable searchbox component.
        <div className="select-wrapper">
          <TomtomReactSearchbox
            autofocus={true}
            placeholder="Search for an address"
            searchOptions={{
              key: process.env.REACT_APP_TOMTOM_SEARCH_API_KEY,
              language: 'en-Gb',
              limit: 5,
              typeahead: true
            }} />
          </div>
        </div>
      </div>
      <div className="section">
        <div className="subsection">
          <h2>Installation</h2>

          <pre><code className="language-">
npm i --save tomtom-react-searchbox
</code></pre>

        </div>
        <div className="subsection">
          <h2>Basic usage</h2>

<pre><code className="language-jsx">
{`<TomtomReactSearchbox
  placeholder="Search for an address"
  searchOptions={{
    key: 'your-api-key',
    language: 'en-Gb',
    limit: 5,
    typeahead: true
  }}
/>`}
  </code></pre>

        </div>
        <div className="subsection">
          <h2>Features</h2>

          <h3>Customize behaviour</h3>
          Control when call is triggered by specifying "minNumbOfChars" prop.
          <div className="select-wrapper">
          <TomtomReactSearchbox
            minNumbOfChars={5}
            placeholder="Typing 5 characters will trigger request"
            searchOptions={{
              key: process.env.REACT_APP_TOMTOM_SEARCH_API_KEY,
              language: 'en-Gb',
              limit: 5,
              typeahead: true
            }} />
          </div>

          <pre data-line="2"><code className="language-jsx" >
{`<TomtomReactSearchbox
  minNumbOfChars={5}
  placeholder="Typing 5 characters will trigger request"
  searchOptions={{
    key: 'your-api-key',
    language: 'en-Gb',
    limit: 5,
    typeahead: true
  }}
/>`}
  </code></pre>
        </div>

        <div className="subsection">
          <h3>React to the events</h3>
          There are 3 callbacks provided: <code>onResultsFetch</code> - called every time search results are retrieved from the api, <code>onResultSelect</code> - called when search result is clicked, and <code>onResultSelect</code> - called when result is selected by using arrow keys. Check it out yourself:
          <div>
            <ul>
              <li>onResultsFetch called times: {resultsFetch}</li>
              <li>onResultChoose called times: {resultChoose}</li>
              <li>onResultSelect called times: {resultSelect}</li>
            </ul>
          </div>
          <div className="select-wrapper">
            <TomtomReactSearchbox
              onResultsFetch={(results) => { setResultsFetch(resultsFetch + 1); console.log(results); }}
              onResultChoose={(result) => { setResultChoose(resultChoose + 1); console.log(result); }}
              onResultSelect={(result) => { setResultSelect(resultSelect + 1); console.log(result); }}
              placeholder="Play around to see triggered events"
              searchOptions={{
                key: process.env.REACT_APP_TOMTOM_SEARCH_API_KEY,
                language: 'en-Gb',
                limit: 5,
                typeahead: true
              }} />
          </div>
          <pre data-line="2,3,4"><code className="language-jsx" >
{`<TomtomReactSearchbox
  onResultsFetch={(results) => console.log(results)}
  onResultChoose={(result) => console.log(result)}
  onResultSelect={(result) => console.log(result)}
  placeholder="Play around to see triggered events"
  searchOptions={{
    key: 'your-api-key',
    language: 'en-Gb',
    limit: 5,
    typeahead: true
  }}
/>`}
  </code></pre>
        </div>
    </div>
    </>
  );
}

export default App;
