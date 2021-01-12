if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.DB_URL;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to MongoDB:'));
db.once('open', () => {
    console.info('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
    const blog = new Blog(req.body);

    result = await blog.save();
    res.status(201).json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
