import * as React from 'react';
import PropTypes from 'prop-types';
import InputWrapper from './InputWrapper';
import ResultsList from './ResultsList';

import KEY_CODES from './keyCodes';
import * as customProps from './customProps';
import defaultComponents from './components/components';

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
            const results = await props.service({ query: value, ...props.searchOptions })
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
                const selectedItem = selectedItemIndex < props.getResults(searchResults).length - 1
                    ? selectedItemIndex + 1
                    : selectedItemIndex;
                setSelectedItemIndex(selectedItem);
                break;
            }
            case KEY_CODES.ARROW_UP: {
                const selectedItem = selectedItemIndex >= 0
                    ? selectedItemIndex - 1
                    : selectedItemIndex;
                setSelectedItemIndex(selectedItem);
                break;
            }
            case KEY_CODES.ENTER: {
                if (selectedItemIndex === -1) {
                    const response = await props.service({
                        query: input,
                        ...props.searchOptions,
                        typeahead: false,
                    }).catch();

                    const results = props.getResults(response);

                    if (results.length > 0) {
                        setInput(props.getFormattedResult(results[0]));
                        setSearchResults(response);
                        if (props.onResultChoose) {
                            props.onResultChoose(results[0]);
                        }
                    }
                    setResultsVisible(false);
                    return;
                }
                const result = props.getResults(searchResults)[selectedItemIndex];
                onResultSelect({
                    formattedResult: props.getFormattedResult(result),
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
        if (props.onResultSelect && selectedItemIndex !== -1 && resultsVisible) {
            props.onResultSelect(props.getResults(searchResults)[selectedItemIndex]);
        }
    }, [selectedItemIndex]);

    React.useEffect(() => {
        setSelectedItemIndex(-1);
        if (searchResults === null) {
            return;
        }
        if (props.onResultsFetch) {
            props.onResultsFetch(searchResults);
        }
    }, [searchResults]);


    const {
        placeholder,
        autofocus,
        wrapperClassName,
        components,
        getFormattedResult,
        getResults,
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
                    getFormattedResult={getFormattedResult}
                    getResults={getResults}
                    components={mergedComponents}
                    selectedItemIndex={selectedItemIndex}
                    onResultSelect={onResultSelect}
                    setResultsVisible={setResultsVisible}
                    response={searchResults}
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
    getFormattedResult: PropTypes.func.isRequired,
    getResults: PropTypes.func.isRequired,
    service: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    autofocus: PropTypes.bool,
    wrapperClassName: PropTypes.string,
    onResultSelect: PropTypes.func,
    onResultChoose: PropTypes.func,
    onResultsFetch: PropTypes.func,
    components: customProps.components,
};

export default SearchBox;
