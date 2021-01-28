const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
    });
    res.json(blogs);
});

blogsRouter.post('/', async (req, res, next) => {
    const { title, author, url, likes } = req.body;

    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    const user = await User.findById(decodedToken.id);

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

blogsRouter.delete('/:id', async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const blog = await Blog.findById(req.params.id);
    if (blog.user.toString() === decodedToken.id) {
        await Blog.findByIdAndDelete(req.params.id);
    } else {
        res.status(401).json({ error: 'invalid authorization token' });
    }
    res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
    const updatedBlog = { ...req.body };

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const blog = await Blog.findById(req.params.id);
    if (blog.user.toString() === decodedToken.id) {
        const result = await Blog.findByIdAndUpdate(
            req.params.id,
            updatedBlog,
            {
                new: true,
            }
        );
        res.json(result);
    } else {
        res.status(401).json({ error: 'invalid authorization token' });
    }
});

module.exports = blogsRouter;
