import * as React from 'react';
import PropTypes from 'prop-types';

import * as formatters from './formatters';
import * as customProps from './customProps';

function ResultsList({
    results,
    selectedItemIndex,
    width,
    onResultSelect,
    setResultsVisible,
    components,
}) {
    const onResultClick = (result) => {
        onResultSelect({ formattedResult: formatters.getFormattedResult(result), result });
        setResultsVisible(false);
    };

    if (results.results.length === 0) {
        return null;
    }

    return (
        <div
            className="tomtom-react-searchbox__results"
            style={{ width }}
            data-testid="results-list"
        >
            {results.results.map((result, index) => (
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
    results: PropTypes.objectOf(PropTypes.any).isRequired,
    width: PropTypes.number.isRequired,
    setResultsVisible: PropTypes.func.isRequired,
    onResultSelect: PropTypes.func.isRequired,
    selectedItemIndex: PropTypes.number,
    components: customProps.components.isRequired,
};

ResultsList.defaultProps = {
    selectedItemIndex: null,
};

export default ResultsList;
