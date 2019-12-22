# tomtom-react-searchbox

Simple React component for searchbox with autocomplete.

## Installation

```
npm i --save tomtom-react-searchbox
```

## Usage

```jsx
import React from 'react'
import TomtomReactSearchbox from 'tomtom-react-searchbox';

function Example() {
    return (
        <TomtomReactSearchbox
            minNumbOfChars={3}
            placeholder="Search for all kind of things..."
            onResultChoose={(result) => console.log(result)}
            searchOptions={{
                key: '<your-api-key>',
                language: 'en-Gb',
                limit: 5
            }} />
    );
}
```

## Props

| name               | type            | Description                                                                                                                                           |
|--------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| searchOptions      | Object          | Search options. Full list of available keys and values can be found [here](https://developer.tomtom.com/search-api/search-api-documentation-search/fuzzy-search).                                                               |
| [minNumbOfChars=3] | Number          | Minimum number of characters which will trigger API call.                                                  |
| [placeholder]      | String          | Input's placeholder.                                                                                       |
| [inputElements]    | Function<Array> | Function injecting elements around input. It must return an array of length of 2 with React elements as values. For example: `[<div>Left</div>, <div>Right</div>]`. First element is placed on the left side of input, while sencond one on the right.      |
| [onResultSelect]   | Function        | Called when result is selected (by using arrow keys). Argument of this function is selected result data.   |
| [onResultChoose]   | Function        | Called when result is chosen (by clicking on pressing enter while one of the results is selected). Argument of this function is choosen result data.                                                                                                            |
| [onResultsFetch]   | Function        | Called every time API call data is fetched. Argument of this function is api results object.               |
