import * as React from 'react';
import PropTypes from 'prop-types';
import InputWrapper from './InputWrapper';
import ResultsList from './ResultsList';

import * as formatters from './formatters';
import KEY_CODES from './keyCodes';
import { fuzzySearchService } from './api/services';
import * as customProps from './customProps';
import defaultComponents from './components/components';


import './style.css';

function SearchBox(props) {
    const [input, setInput] = React.useState('');
    const [searchResults, setSearchResults] = React.useState(null);
    const [resultsVisible, setResultsVisible] = React.useState(false);
    const [inputWidth, setInputWidth] = React.useState(null);
    const [keyDownEvent, setKeyDownEvent] = React.useState(null);
    const containerRef = React.useRef();

    async function onChange(value) {
        setInput(value);

        if (value.length >= props.minNumbOfChars) {
            const results = await fuzzySearchService({ query: value, ...props.searchOptions })
                .catch();
            setSearchResults(results);
            setResultsVisible(true);
        } else {
            setResultsVisible(false);
            setSearchResults(null);
        }
    }

    function onResultSelect(results) {
        setInput(results.formattedResult);

        if (props.onResultChoose) {
            props.onResultChoose(results.result);
        }
    }

    const [selectedItemIndex, setSelectedItemIndex] = React.useState(null);

    React.useEffect(() => {
        const handleKeyDown = async (event) => {
            switch (event.keyCode) {
            case KEY_CODES.ARROW_DOWN: {
                if (selectedItemIndex === null) {
                    return;
                }
                const selectedItem = selectedItemIndex < searchResults.results.length - 1
                    ? selectedItemIndex + 1
                    : selectedItemIndex;
                setSelectedItemIndex(selectedItem);
                break;
            }
            case KEY_CODES.ARROW_UP: {
                if (selectedItemIndex === null) {
                    return;
                }
                const selectedItem = selectedItemIndex > 0
                    ? selectedItemIndex - 1
                    : selectedItemIndex;
                setSelectedItemIndex(selectedItem);
                break;
            }
            case KEY_CODES.ENTER: {
                if (selectedItemIndex === null) {
                    return;
                }
                const result = searchResults.results[selectedItemIndex];
                onResultSelect({
                    formattedResult: formatters.getFormattedResult(result),
                    result,
                });

                setResultsVisible(false);

                break;
            }
            case KEY_CODES.ESCAPE: {
                setResultsVisible(false);
                break;
            }
            default:
            }
        };

        if (keyDownEvent) {
            handleKeyDown(keyDownEvent);
        }
    }, [keyDownEvent]);

    React.useEffect(() => {
        if (props.onResultSelect && selectedItemIndex !== null) {
            props.onResultSelect(searchResults.results[selectedItemIndex]);
        }
    }, [selectedItemIndex]);

    React.useEffect(() => {
        if (searchResults === null) {
            setSelectedItemIndex(null);
            return;
        }
        if (props.onResultsFetch) {
            props.onResultsFetch(searchResults);
        }

        setSelectedItemIndex(searchResults.results.length > 0 ? 0 : null);
    }, [searchResults]);


    const {
        placeholder,
        autofocus,
        wrapperClassName,
        components,
    } = props;

    const mergedComponents = { ...defaultComponents, ...components };

    return (
        <div
            className={['tomtom-react-searchbox', wrapperClassName].join(' ')}
            ref={containerRef}
            onKeyDown={(event) => { event.persist(); setKeyDownEvent(event) }}>
            <InputWrapper
                components={mergedComponents}
                autofocus={autofocus}
                value={input}
                placeholder={placeholder}
                onBlur={() => setResultsVisible(false)}
                inputWidthCallback={(width) => setInputWidth(width)}
                onFocus={() => setResultsVisible(true)}
                onClear={() => { setInput(''); setSearchResults(null); }}
                onChange={onChange}
            />
            {(searchResults && resultsVisible) && (
                <ResultsList
                    components={mergedComponents}
                    selectedItemIndex={selectedItemIndex}
                    onResultSelect={onResultSelect}
                    setResultsVisible={setResultsVisible}
                    results={searchResults}
                    width={inputWidth}
                />
            )}
        </div>
    );
}

SearchBox.defaultProps = {
    components: defaultComponents,
    minNumbOfChars: 3,
    placeholder: '',
    autofocus: false,
    wrapperClassName: null,
    onResultSelect: null,
    onResultChoose: null,
    onResultsFetch: null,
};


SearchBox.propTypes = {
    searchOptions: PropTypes.objectOf(PropTypes.any).isRequired,
    minNumbOfChars: PropTypes.number,
    placeholder: PropTypes.string,
    autofocus: PropTypes.bool,
    wrapperClassName: PropTypes.string,
    onResultSelect: PropTypes.func,
    onResultChoose: PropTypes.func,
    onResultsFetch: PropTypes.func,
    components: customProps.components,
};

export default SearchBox;
