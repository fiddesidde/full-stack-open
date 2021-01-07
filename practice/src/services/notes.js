import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

// const getAll = () => {
//     const request = axios.get(baseUrl);
//     return request.then(res => res.data);
// };

const getAll = () => {
    const request = axios.get(baseUrl);
    const nonExisting = {
        id: 10000,
        content: 'This note is note saved to server',
        date: '2020-01-05T18:00:00.098Z',
        important: true,
    };
    return request.then(res => res.data.concat(nonExisting));
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
