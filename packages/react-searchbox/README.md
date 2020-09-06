# @falseinput/react-searchbox
[![build](https://img.shields.io/circleci/build/github/falseinput/react-ui-components/master
)](https://circleci.com/gh/falseinput/react-ui-components)
[![coverage](https://img.shields.io/codecov/c/github/falseinput/react-ui-components)](https://codecov.io/gh/falseinput/react-ui-components)

Powerful and customizable searchbox component for your react application.

This is package provides low level base component which you can use to create your own wrapper component using search API of your choice.
For your convenience you may use one of the [already wrapped components](#providers).

## Installation

```
npm i --save @falseinput/react-searchbox
```

## Usage

```jsx
import ReactSearchbox from '@falseinput/react-searchbox';

const Example = (props) =>
    <ReactSearchbox
        {...props}
    />;
```

## Props

* searchOptions `{Object}`
* [placeholder] `{String}`
* [autofocus] `{Boolean}`
* [components] `{Object}`
* [wrapperClassName] `{String}`
* [onResultSelect] `{Function}`
* [onResultChoose] `{Function}`
* [onResultsFetch] `{Function}`
* [onChange] `{Function}`


## Providers

This package exposes already ready to use components.

### Tomtom Fuzzy Search

This component wraps [Tomtom Fuzzy Search service](https://developer.tomtom.com/search-api/search-api-documentation-search/fuzzy-search). You will need to provide your own [API key](https://developer.tomtom.com/how-to-get-tomtom-api-key) to make it work.

```jsx
import SearchBox from '@falseinput/react-searchbox/tomtom';

const Example = () =>
    <SearchBox
        onResultChoose={(result) => console.log(result)}
        searchOptions={{
            key: '<your-api-key>',
            language: 'en-Gb',
            limit: 5,
            typeahead: true
        }}
    />;

```
## Styling

Use `wrapperClassName` prop to pass custom class name to container div. Then you can override css classes. The structure looks like this:

```html
    <div class="react-searchbox">
        <div class="react-searchbox__input-wrapper">
            <input class="react-searchbox__input" />
        </div>
        <div class="react-searchbox__results">
            <div class="react-searchbox__result"></div>
            <div class="react-searchbox__result"></div>
            ...
        </div>
    </div>
```

## Components API

You can use `components` prop to override internal components of the SearchBox. You can also access original ones by importing them as shown in this example.
```jsx
import Searchbox, {
    components
  } from '@falseinput/react-searchbox/tomtom';

  function CustomResult(props) {
    return (
      <div
        className={`my-result ${props.isSelected ? '-selected' : ''}`}>
        <div className="icon">❤</div>
        <components.Result {...props} />
      </div>
    );
  }

  <Searchbox
    components={{
        Result: CustomResult
    }}
    searchOptions={{
        key: '<your-api-key>',
        language: 'en-Gb',
        limit: 5,
        typeahead: true,
        categorySet: '7315'
    }} />
  </div>
  ```
