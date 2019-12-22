import pick from 'lodash.pick';

const createQueryParams = (params) => {
    return Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
}

const requester = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw response;
        }

        return response.json();
    } catch(error) {
        throw error;
    }
}

const getCommonParams = (options) => {
    return pick(options, ['key', 'language', 'lat', 'lon', 'radius', 'countrySet']);
}

const getAutocompleteParams = (options) => {
    const common = getCommonParams(options);
    const autocompleteOnly = options.resultSet ? { resultSet: options.resultSet } : {};

    return { ...common, ...autocompleteOnly };
}

const getSearchParams = (options) => {
    const common = getCommonParams(options);
    const searchOnly = pick(options, [
        'typeahead',
        'countrySet',
        'ofs',
        'limit',
        'topLeft',
        'btmRight',
        'extendedPostalCodesFor',
        'minFuzzyLevel',
        'maxFuzzyLevel',
        'idxSet',
        'categorySet',
        'brandSet',
        'connectorSet',
        'openingHours',
        'timeZone',
        'mapcodes'
    ]);

    if ('topLeft' in searchOnly || 'btmRight' in searchOnly) {
        delete common.radius;
    }

    return { ...common, ...searchOnly };
}

export const autoCompleteService = function(options) {
    const queryParams = createQueryParams(getAutocompleteParams(options));
    const url = `https://api.tomtom.com/search/2/autocomplete/${encodeURIComponent(options.query)}.json?${queryParams}`;

    return requester(url);
}

export const fuzzySearchService = function(options) {
    const queryParams = createQueryParams(getSearchParams(options));
    const url = `https://api.tomtom.com/search/2/search/${encodeURIComponent(options.query)}.json?${queryParams}`;

    return requester(url);
}
