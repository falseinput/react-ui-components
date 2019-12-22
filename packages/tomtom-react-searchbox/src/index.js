import * as React from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import ResultsList from './ResultsList';

import * as formatters from './formatters';
import { KEY_CODES } from './keyCodes';
import { fuzzySearchService } from './api/services';

const callTriggerCondition = (minNumbOfChars, value) => {
    if (minNumbOfChars) {
        return value.length >= minNumbOfChars;
    }

    return value.length > 0;
}

function SearchWithAutoComplete(props) {
    const [input, setInput] = React.useState('');
    const [searchResults, setSearchResults] = React.useState(null);
    const [resultsVisible, setResultsVisible] = React.useState(false);
    const [inputWidth, setInputWidth] = React.useState(null);
    const [keyDownEvent, setKeyDownEvent] = React.useState(null);
    const containerRef = React.useRef();

    async function onChange(value) {
        setInput(value);

        if (callTriggerCondition(props.minNumbOfChars, value)) {
            const results = await fuzzySearchService({query: value, ...props.searchOptions}).catch(e => console.log(e));
            setSearchResults(results);
            setResultsVisible(true);
        } else {
            setSearchResults(null);
        }
    }

    function onResultSelect(results) {
        setInput(results.formattedResult);
        props.onResultChoose(results.result);
    }

    const [selectedItemIndex, setSelectedItemIndex] = React.useState(-1);

    React.useEffect(() => {
        const handleKeyDown = async (event) => {
            switch(event.keyCode) {
                case KEY_CODES.ARROW_DOWN: {
                    const selectedItem = selectedItemIndex < searchResults.results.length - 1 ? selectedItemIndex + 1 : selectedItemIndex
                    setSelectedItemIndex(selectedItem);
                break;
                }
                case KEY_CODES.ARROW_UP: {
                    const selectedItem = selectedItemIndex > 0 ? selectedItemIndex - 1 : -1
                    setSelectedItemIndex(selectedItem);
                    break;
                }
                case KEY_CODES.ENTER: {
                    if (selectedItemIndex === -1) {
                        const results = await fuzzySearchService({query: input, ...props.searchOptions}).catch(e => console.log(e));
                        setSearchResults(results);
                        return;
                    }
                    const result = searchResults.results[selectedItemIndex];
                    onResultSelect({
                        formattedResult: formatters.getFormattedResult(result),
                        result
                    });

                    setResultsVisible(false);

                    break;
                }
                case KEY_CODES.ESCAPE: {
                    setResultsVisible(false)
                    break;
                }

            }
        }

        keyDownEvent && handleKeyDown(keyDownEvent);
    }, [keyDownEvent]);


    React.useEffect(() => {
        if (selectedItemIndex > -1) {
            props.onResultSelect(searchResults.results[selectedItemIndex]);
        }
    }, [selectedItemIndex]);

    React.useEffect(() => {
        if (props.onResultsFetched && searchResults !== null) {
            props.onResultsFetched(searchResults);
        }
    }, [searchResults])


    return <div
        className="search-with-autocomplete"
        ref={containerRef}
        onKeyDown={(event) => { event.persist(); setKeyDownEvent(event) }}>
        <SearchInput
            value={input}
            onBlur={() => setResultsVisible(false)}
            placeholder={props.placeholder}
            inputElements={props.inputElements}
            inputWidthCallback={(width) => setInputWidth(width)}
            onFocus={() => setResultsVisible(true)}
            onClear={() => setInput('')}
            onChange={onChange}
        />
        {(searchResults && resultsVisible) &&
            <ResultsList
                selectedItemIndex={selectedItemIndex}
                onResultSelect={onResultSelect}
                setResultsVisible={setResultsVisible}
                results={searchResults}
                width={inputWidth}
            />
        }
    </div>;
}

SearchWithAutoComplete.propTypes = {
    searchOptions: PropTypes.object.isRequired,
    minNumbOfChars: PropTypes.number,
    placeholder: PropTypes.string,
    inputElements: PropTypes.func,
    onResultSelect: PropTypes.func,
    onResultChoose: PropTypes.func,
    onResultsFetched: PropTypes.func
};

export default SearchWithAutoComplete;
