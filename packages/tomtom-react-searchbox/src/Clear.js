import * as React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from './assets/clear.svg';

function Clear({ onClear }) {
    return (
        <div
            className="tomtom-react-searchbox__clear"
            onClick={onClear}
            data-testid="clear"
        >
            <CloseIcon />
        </div>
    );
}

Clear.propTypes = {
    onClear: PropTypes.func.isRequired,
};

export default Clear;
