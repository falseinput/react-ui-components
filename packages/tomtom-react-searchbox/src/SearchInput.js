import * as React from 'react';
import PropTypes from 'prop-types';

import { KEY_CODES } from './keyCodes';

const onKeyDown = (event) => {
    if (event.keyCode === KEY_CODES.ARROW_UP) {
         event.preventDefault()
    }
};

function SearchInput(props) {
    const inputContainerRef = React.useRef(null);

    React.useEffect(() => {
        const width = inputContainerRef.current.offsetWidth;
        props.inputWidthCallback(width);
    }, []);
    return (
        <div
            className={props.inputClassName}
            ref={inputContainerRef}>
            {props.inputElements && props.inputElements({onClear: props.onClear})[0]}
            <input
                placeholder={props.placeholder || ''}
                type="text"
                onFocus={props.onFocus}
                onKeyDown={onKeyDown}
                onBlur={props.onBlur}
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)} />
            {props.inputElements && props.inputElements({onClear: props.onClear})[1]}
        </div>
    );
}

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    inputClassName: PropTypes.string,
    onFocus: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
};

export default SearchInput;
