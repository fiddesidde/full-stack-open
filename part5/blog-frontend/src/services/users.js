import axios from 'axios';

const baseUrl = '/api/users';

const signup = async userObj => {
    const res = await axios.post(baseUrl, userObj);
    return res.data;
};

export default { signup };
