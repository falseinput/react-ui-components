import * as React from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import ResultsList from './ResultsList';

import * as formatters from './formatters';
import KEY_CODES from './keyCodes';
import { fuzzySearchService } from './api/services';

import './style.css';

function SearchWithAutoComplete(props) {
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

    const [selectedItemIndex, setSelectedItemIndex] = React.useState(-1);

    React.useEffect(() => {
        const handleKeyDown = async (event) => {
            switch (event.keyCode) {
            case KEY_CODES.ARROW_DOWN: {
                const selectedItem = selectedItemIndex < searchResults.results.length - 1
                    ? selectedItemIndex + 1
                    : selectedItemIndex;
                setSelectedItemIndex(selectedItem);
                break;
            }
            case KEY_CODES.ARROW_UP: {
                const selectedItem = selectedItemIndex > 0 ? selectedItemIndex - 1 : -1;
                setSelectedItemIndex(selectedItem);
                break;
            }
            case KEY_CODES.ENTER: {
                if (selectedItemIndex === -1) {
                    const results = await fuzzySearchService({
                        query: input,
                        ...props.searchOptions,
                    }).catch();
                    setSearchResults(results);
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
        if (!resultsVisible) {
            setSelectedItemIndex(-1);
        }
    }, [resultsVisible]);

    React.useEffect(() => {
        if (props.onResultSelect && selectedItemIndex > -1) {
            props.onResultSelect(searchResults.results[selectedItemIndex]);
        }
    }, [selectedItemIndex]);

    React.useEffect(() => {
        if (props.onResultsFetch && searchResults !== null) {
            props.onResultsFetch(searchResults);
        }
    }, [searchResults]);


    const { placeholder, inputElements, wrapperClassName } = props;
    return (
        <div
            className={['tomtom-react-searchbox', wrapperClassName].join(' ')}
            ref={containerRef}
            onKeyDown={(event) => { event.persist(); setKeyDownEvent(event) }}>
            <SearchInput
                value={input}
                placeholder={placeholder}
                inputElements={inputElements}
                onBlur={() => setResultsVisible(false)}
                inputWidthCallback={(width) => setInputWidth(width)}
                onFocus={() => setResultsVisible(true)}
                onClear={() => { setInput(''); setSearchResults(null); }}
                onChange={onChange}
            />
            {(searchResults && resultsVisible) && (
                <ResultsList
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

SearchWithAutoComplete.propTypes = {
    searchOptions: PropTypes.objectOf(PropTypes.any).isRequired,
    minNumbOfChars: PropTypes.number,
    placeholder: PropTypes.string,
    wrapperClassName: PropTypes.string,
    onResultSelect: PropTypes.func,
    onResultChoose: PropTypes.func,
    onResultsFetch: PropTypes.func,
};

SearchWithAutoComplete.defaultProps = {
    minNumbOfChars: 3,
    placeholder: '',
    wrapperClassName: null,
    onResultSelect: null,
    onResultChoose: null,
    onResultsFetch: null,
};

export default SearchWithAutoComplete;
