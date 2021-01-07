import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
};

const post = async personObj => {
    const request = await axios.post(baseUrl, personObj);
    return request.data;
};

const destroy = async id => {
    const request = await axios.delete(`${baseUrl}/${id}`);
    return request;
};

const update = async (id, newObject) => {
    const request = await axios.put(`${baseUrl}/${id}`, newObject);
    return request.data;
};

export default { getAll, post, destroy, update };
