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

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
    const { title, author, url, likes } = req.body;
    const updatedBlog = {
        title: title ? title : undefined,
        author: author ? author : undefined,
        url: url ? url : undefined,
        likes: likes ? likes : undefined,
    };

    const result = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
        new: true,
    });
    res.json(result);
});

module.exports = blogsRouter;
