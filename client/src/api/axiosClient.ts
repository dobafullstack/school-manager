import axios from 'axios';

const baseURL = 'https://api-vietnam-city.herokuapp.com';

const axiosClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use(
    (res) => {
        if (res && res.data) {
            return res.data;
        }

        return res.data;
    },
    (err) => {
        throw err;
    }
);

export default axiosClient;
