import axios from 'axios';
const baseUrl = 'https://peaceful-inlet-09370.herokuapp.com/api/notes';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data);
};

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(res => res.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(res => res.data);
};

// Shorthand for getAll: getAll, ...
export default { getAll, create, update };
