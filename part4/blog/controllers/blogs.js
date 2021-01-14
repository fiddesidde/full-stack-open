const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
    if (!req.body.title || !req.body.url)
        return res.status(400).json({ error: 'Title/url is required' });
    const { title, author, url, likes } = req.body;
    const blog = new Blog({ title, author, url, likes: likes || 0 });
    result = await blog.save();
    res.status(201).json(result);
});

module.exports = blogsRouter;
