const createQueryParams = (params) => Object
    .entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');

const requester = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw response;
    }

    return response.json();
};

// eslint-disable-next-line
export const fuzzySearchService = (options) => {
    const queryParams = createQueryParams(options);
    const url = `https://api.tomtom.com/search/2/search/${encodeURIComponent(options.query)}.json?${queryParams}`;

    return requester(url);
};
