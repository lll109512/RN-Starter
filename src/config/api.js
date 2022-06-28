import {API_ENDPOINT} from '@env';

const endpointBase = API_ENDPOINT;

export default {
    name: 'DecodeMobile',
    displayName: 'DecodeMobile',
    defaultFontFamily: 'Helvetica',
    apiEndpoint: `${endpointBase}/api/v1`,
    localStorageKey: 'Decode-Client'
};
