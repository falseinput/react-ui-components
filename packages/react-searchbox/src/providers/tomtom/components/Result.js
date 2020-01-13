import * as React from 'react';
import PropTypes from 'prop-types';

import * as formatters from '../formatters';

function Result({
    result,
    isSelected,
    onResultClick,
}) {
    const poiName = formatters.getPoiName(result);
    const address = formatters.getAddress(result);
    let resultParts = null;

    if (poiName && address) {
        resultParts = (
            <>
                <div className="react-searchbox__result-item -primary">{`${poiName} `}</div>
                <br />
                <div className="react-searchbox__result-item -secondary">{address}</div>
            </>
        );
    } else {
        resultParts = <div className="react-searchbox__result-item -primary">{address}</div>;
    }

    return (
        <div
            data-testid="result-item"
            className={`react-searchbox__result  ${isSelected ? '-selected' : ''}`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onResultClick}
            key={formatters.getId(result)}
        >
            {resultParts}
        </div>
    );
}

Result.propTypes = {
    result: PropTypes.objectOf(PropTypes.any).isRequired,
    isSelected: PropTypes.bool.isRequired,
    onResultClick: PropTypes.func.isRequired,
};

export default Result;
