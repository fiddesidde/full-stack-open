const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
    });
    res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
    if (!req.body.title || !req.body.url)
        return res.status(400).json({ error: 'Title/url is required' });
    const { title, author, url, likes } = req.body;

    const users = await User.find({});
    const user = users[0];

    const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
        user: user.id,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
    const updatedBlog = { ...req.body };

    const result = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
        new: true,
    });
    res.json(result);
});

module.exports = blogsRouter;
