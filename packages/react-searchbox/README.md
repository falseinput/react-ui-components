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

### Common

Props valid for both providers and base component.

* searchOptions `{Object}`
* [placeholder] `{String}`
* [autofocus] `{Boolean}`
* [components] `{Object}`
* [wrapperClassName] `{String}`
* [onResultSelect] `{Function}`
* [onResultChoose] `{Function}`
* [onResultsFetch] `{Function}`


### Advanced

Props only valid for base component.
* getResults `{Function}`
* getFormattedResult `{Function}`
* service `{Function}`

## Providers

This package exposes already ready to use components.

### Tomtom

This component wraps [Tomtom Fuzzy Search service](https://developer.tomtom.com/search-api/search-api-documentation-search/fuzzy-search).

```jsx
import TomtomSearchbox from '@falseinput/react-searchbox/tomtom';

const Example = () =>
    <TomtomSearchbox
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
