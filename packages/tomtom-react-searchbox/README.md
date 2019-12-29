# tomtom-react-searchbox
[![coverage](https://img.shields.io/circleci/build/github/falseinput/react-ui-components/master
)](https://circleci.com/gh/falseinput/react-ui-components)
[![coverage](https://img.shields.io/codecov/c/github/falseinput/react-ui-components)](https://codecov.io/gh/falseinput/react-ui-components)

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
| searchOptions      | `Object`          | Search options. Full list of available keys and values can be found [here](https://developer.tomtom.com/search-api/search-api-documentation-search/fuzzy-search).                                                               |
| [minNumbOfChars=`3`] | `Number`          | Minimum number of characters which will trigger API call.                                                  |
| [placeholder=`''`]      | `String`          | Input's placeholder.                                                                                       |
| [autofocus=`false`]      | `Boolean`          | Sets autofocus on input element.                                                                                       |
| [wrapperClassName] | `String`          | Class name passed to the container div.                                                                    |
| [onResultSelect]   | `Function`        | Called when result is selected (by using arrow keys). Argument of this function is selected result data.   |
| [onResultChoose]   | `Function`        | Called when result is chosen (by clicking on pressing enter while one of the results is selected). Argument of this function is choosen result data.                                                                                                            |
| [onResultsFetch]   | `Function`        | Called every time API call data is fetched. Argument of this function is api results object.               |


## Styling

Use `wrapperClassName` prop to pass custom class name to container div. Then you can override css classes. The structure looks like this:

```html
    <div class="tomtom-react-searchbox">
        <div class="tomtom-react-searchbox__input-wrapper">
            <input class="tomtom-react-searchbox__input" />
        </div>
        <div class="tomtom-react-searchbox__results">
            <div class="tomtom-react-searchbox__result"></div>
            <div class="tomtom-react-searchbox__result"></div>
            ...
        </div>
    </div>
```
