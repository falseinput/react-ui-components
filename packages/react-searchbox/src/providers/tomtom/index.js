import React from 'react';

import { tomtomFuzzySearchSearchService } from './api/services';
import Result from './components/Result';
import * as formatters from './formatters';
import * as customProps from '../../customProps';
import SearchBox, { components as defaultComponents } from '../../index';

export const components = { Result, ...defaultComponents };

const TomtomSearchBox = (props) => {
    const { components: userComponents, ...restOfProps } = props;
    return (
        <SearchBox
            getFormattedResult={formatters.getFormattedResult}
            service={tomtomFuzzySearchSearchService}
            components={{
                Result,
                ...components,
                ...userComponents,
            }}
            {...restOfProps}
        />
    );
};


TomtomSearchBox.propTypes = {
    components: customProps.components
};

export default TomtomSearchBox;
