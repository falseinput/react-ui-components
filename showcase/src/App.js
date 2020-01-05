import React from 'react';
import './App.scss';
import { SearchBox as TomtomReactSearchbox, components } from 'tomtom-react-searchbox';

function CustomClear({ onClear }) {
  return <div onClick={onClear}>Clear</div>;
}

function CustomResultItem(props) {
  const icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>;
  return (
    <div
      className={`my-result ${props.isSelected ? '-selected' : ''}`}>
      <div className="icon">{icon}</div>
      <components.Result {...props} />
    </div>
  );
}

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

        <div className="subsection">
          <h2>Components API</h2>

          Components API lets use completely replace searchbox's components or wrap default ones into your owns.

          <div className="select-wrapper">

          <TomtomReactSearchbox
            placeholder='Search for a restaurant'
            components={{
              Clear: CustomClear,
              Result: CustomResultItem
            }}
            searchOptions={{
              key: process.env.REACT_APP_TOMTOM_SEARCH_API_KEY,
              language: 'en-Gb',
              limit: 5,
              categorySet: '7315',
              typeahead: true
            }} />
          </div>

          <pre data-line="23,24,25,26"><code className="language-jsx" >
{`import {
  SearchBox as TomtomReactSearchbox,
  components
} from 'tomtom-react-searchbox';

function CustomClear({ onClear }) {
  return <div onClick={onClear}>Clear</div>;
}

function CustomResult(props) {
  const icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>;
  return (
    <div
      className={\`my-result \${props.isSelected ? '-selected' : ''}\`}>
      <div className="icon">{icon}</div>
      <components.Result {...props} />
    </div>
  );
}

<TomtomReactSearchbox
placeholder='Search for a restaurant'
components={{
  Clear: CustomClear,
  Result: CustomResult
}}
searchOptions={{
  key: 'your-api-key',
  language: 'en-Gb',
  limit: 5,
  typeahead: true,
  categorySet: '7315'
}} />
</div>`}
  </code></pre>
        </div>

    </div>
    </>
  );
}

export default App;
