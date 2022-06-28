import appSettings from 'config/api';
import HttpClient from 'utils/HttpClient';

const client = new HttpClient(appSettings.apiEndpoint);

export default client;
