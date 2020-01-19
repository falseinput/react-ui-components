export const getId = (result) => result.id;

export const getPoiName = (result) => {
    if (result.poi !== undefined && typeof result.poi.name !== 'undefined') {
        return result.poi.name;
    }
    return '';
};

export const getAddress = (result) => {
    const address = [];
    if (typeof result.address.freeformAddress !== 'undefined') {
        address.push(result.address.freeformAddress);
    }
    if (typeof result.address.countryCodeISO3 !== 'undefined') {
        address.push(result.address.countryCodeISO3);
    }
    return address.join(', ');
};

export const getFormattedResult = (result) => [getPoiName(result), getAddress(result)].filter((value) => value.length).join(', ');
