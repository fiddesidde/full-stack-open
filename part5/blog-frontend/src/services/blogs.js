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

const update = blogObject => {
    console.log(blogObject);

    // console.log(updatedBlog);
    // console.log(updatedBlog);
    return null;
};

export default { getAll, create, setToken, update };
