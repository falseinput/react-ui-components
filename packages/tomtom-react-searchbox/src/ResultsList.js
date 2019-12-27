import * as React from 'react';
import PropTypes from 'prop-types';

import * as formatters from './formatters';

function ResultsList({
    results,
    selectedItemIndex,
    width,
    onResultSelect,
    setResultsVisible,
}) {
    const onResultClick = (result) => {
        onResultSelect({ formattedResult: formatters.getFormattedResult(result), result });
        setResultsVisible(false);
    };

    return (
        <div
            className="tomtom-react-searchbox__results"
            style={{ width }}
            data-testid="results-list"
        >
            {results.results.map((result, index) => {
                const poiName = formatters.getPoiName(result);
                const address = formatters.getAddress(result);
                let resultParts = null;

                if (poiName && address) {
                    resultParts = (
                        <>
                            <div className="tomtom-react-searchbox__result-item -primary">{`${poiName} `}</div>
                            <br />
                            <div className="tomtom-react-searchbox__result-item -secondary">{address}</div>
                        </>
                    );
                } else {
                    resultParts = <div className="tomtom-react-searchbox__result-item -primary">{address}</div>;
                }

                return (
                    <div
                        data-testid="result-item"
                        className={`tomtom-react-searchbox__result  ${index === selectedItemIndex ? '-selected' : ''}`}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => onResultClick(result)}
                        key={formatters.getId(result)}
                    >
                        {resultParts}
                    </div>
                );
            })}
        </div>
    );
}

ResultsList.propTypes = {
    results: PropTypes.objectOf(PropTypes.any).isRequired,
    width: PropTypes.number.isRequired,
    selectedItemIndex: PropTypes.number.isRequired,
    setResultsVisible: PropTypes.func.isRequired,
    onResultSelect: PropTypes.func.isRequired,
};

export default ResultsList;
