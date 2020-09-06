import * as React from 'react';
import PropTypes from 'prop-types';

import * as customProps from './customProps';

function ResultsList({
    results,
    selectedItemIndex,
    width,
    onResultChoose,
    components,
}) {
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
                        onResultClick={() => onResultChoose(result)}
                    />
                ) : null
            ))}
        </div>
    );
}

ResultsList.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
    width: PropTypes.number.isRequired,
    onResultChoose: PropTypes.func.isRequired,
    selectedItemIndex: PropTypes.number,
    components: customProps.components.isRequired,
};

ResultsList.defaultProps = {
    selectedItemIndex: null,
};

export default ResultsList;
