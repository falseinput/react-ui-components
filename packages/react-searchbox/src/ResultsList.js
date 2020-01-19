import * as React from 'react';
import PropTypes from 'prop-types';

import * as customProps from './customProps';

function ResultsList({
    response,
    selectedItemIndex,
    width,
    onResultSelect,
    setResultsVisible,
    getResults,
    components,
    getFormattedResult,
}) {
    const onResultClick = (result) => {
        onResultSelect({ formattedResult: getFormattedResult(result), result });
        setResultsVisible(false);
    };

    const results = getResults(response);

    if (results.length === 0) {
        return null;
    }

    return (
        <div
            className="react-searchbox__results"
            style={{ width }}
            data-testid="results-list"
        >
            {results.map((result, index) => (
                components.Result ? (
                    <components.Result
                        key={result.id}
                        result={result}
                        isSelected={index === selectedItemIndex}
                        onResultClick={() => onResultClick(result)}
                    />
                ) : null
            ))}
        </div>
    );
}

ResultsList.propTypes = {
    response: PropTypes.objectOf(PropTypes.any).isRequired,
    width: PropTypes.number.isRequired,
    setResultsVisible: PropTypes.func.isRequired,
    onResultSelect: PropTypes.func.isRequired,
    getFormattedResult: PropTypes.func.isRequired,
    getResults: PropTypes.func.isRequired,
    selectedItemIndex: PropTypes.number,
    components: customProps.components.isRequired,
};

ResultsList.defaultProps = {
    selectedItemIndex: null,
};

export default ResultsList;
