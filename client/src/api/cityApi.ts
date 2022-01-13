import City from '../models/City';
import axiosClient from './axiosClient';

const cityApi = {
    getCities: async (): Promise<City[]> => await axiosClient.get('/'),
};

export default cityApi;
