import axios from 'axios';

const baseUrl = '/api/login';

const login = async loginObj => {
    const res = await axios.post(baseUrl, loginObj);
    return res.data;
};

export default { login };
