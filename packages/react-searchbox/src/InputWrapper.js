import * as React from 'react';
import PropTypes from 'prop-types';

import * as customProps from './customProps';
import KEY_CODES from './keyCodes';

const onKeyDown = (event) => {
    if (event.keyCode === KEY_CODES.ARROW_UP) {
        event.preventDefault();
    }
};

function InputWrapper({
    value,
    placeholder,
    autofocus,
    onFocus,
    onBlur,
    onChange,
    onClear,
    inputWidthCallback,
    components,
}) {
    const inputContainerRef = React.useRef(null);

    React.useEffect(() => {
        const width = inputContainerRef.current.offsetWidth;
        inputWidthCallback(width);
    }, []);
    return (
        <div
            className="react-searchbox__input-wrapper"
            ref={inputContainerRef}
        >
            <input
                placeholder={placeholder}
                // eslint-disable-next-line
                autoFocus={autofocus}
                type="text"
                className="react-searchbox__input"
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
            />
            { value && components.Clear && <components.Clear onClear={onClear} /> }
        </div>
    );
}

InputWrapper.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    inputWidthCallback: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    autofocus: PropTypes.bool.isRequired,
    components: customProps.components.isRequired,
};

export default InputWrapper;
