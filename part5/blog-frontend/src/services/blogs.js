import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const create = async blogObject => {
    const config = {
        headers: { Authorization: token },
    };

    const res = await axios.post(baseUrl, blogObject, config);
    return res.data;
};

const update = async blogObject => {
    const { likes, author, title, url, id } = blogObject;
    const user = blogObject.user.id;
    const body = {
        user,
        likes,
        author,
        title,
        url,
    };
    const config = {
        headers: { Authorization: token },
    };

    const res = await axios.put(`${baseUrl}/${id}`, body, config);
    return res.data;
};

const remove = async blogId => {
    const config = {
        headers: { Authorization: token },
    };
    await axios.delete(`${baseUrl}/${blogId}`, config);
};

export default { getAll, create, setToken, update, remove };
