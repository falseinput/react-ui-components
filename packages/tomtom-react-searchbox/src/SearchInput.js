import * as React from 'react';
import PropTypes from 'prop-types';

import KEY_CODES from './keyCodes';

const onKeyDown = (event) => {
    if (event.keyCode === KEY_CODES.ARROW_UP) {
        event.preventDefault();
    }
};

function SearchInput({
    value,
    inputElements,
    placeholder,
    onFocus,
    onBlur,
    onChange,
    onClear,
    inputWidthCallback,
}) {
    const inputContainerRef = React.useRef(null);

    React.useEffect(() => {
        const width = inputContainerRef.current.offsetWidth;
        inputWidthCallback(width);
    }, []);
    return (
        <div
            className="tomtom-react-searchbox__input-wrapper"
            ref={inputContainerRef}
        >
            {inputElements && inputElements({ onClear })[0]}
            <input
                placeholder={placeholder}
                type="text"
                className="tomtom-react-searchbox__input"
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
            {inputElements && inputElements({ onClear })[1]}
        </div>
    );
}

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    inputWidthCallback: PropTypes.func.isRequired,
    inputElements: PropTypes.func,
    placeholder: PropTypes.string,
    inputClassName: PropTypes.string,
};

SearchInput.defaultProps = {
    inputElements: null,
    placeholder: '',
    inputClassName: null,
};

export default SearchInput;
