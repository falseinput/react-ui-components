import * as React from 'react';
import PropTypes from 'prop-types';

import * as formatters from './formatters';

function ResultsList(props) {
    if (!props.results) {
        return null;
    }

    const onResultClick = (result) => {
        props.onResultSelect({formattedResult: formatters.getFormattedResult(result), result});
        props.setResultsVisible(false);
    }

    return <div className="search-with-autocomplete__results" style={{width: props.width}}>
        {props.results.results.map((result, index) => {
            const poiName = formatters.getPoiName(result);
            const address = formatters.getAddress(result);
            let resultParts = null;

            if (poiName && address) {
                resultParts = (
                    <>
                        <div className="search-with-autocomplete__result-item -primary">{poiName} </div>
                        <div className="search-with-autocomplete__result-item -secondary">{address}</div>
                    </>
                );
            } else {
                resultParts = <div className="search-with-autocomplete__result-item -primary">{address}</div>
            }

            return (
                <div
                    className={`search-with-autocomplete__result  ${index === props.selectedItemIndex ? '-selected' : ''}`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onResultClick(result)}
                    key={formatters.getId(result)}>
                    {resultParts}
                </div>
            );
        })}
    </div>;
}

ResultsList.propTypes = {
    results: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    setResultsVisible: PropTypes.func.isRequired
};

export default ResultsList;
