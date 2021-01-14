const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helpers');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('unique identifier is called "id"', async () => {
    const response = await api.get('/api/blogs');

    for (let blog of response.body) {
        expect(blog.id).toBeDefined();
    }
});

test('posting a valid blog works', async () => {
    const newBlog = {
        title: 'Gymma',
        author: 'Fredrik Mellberg',
        url: 'http://www.google.com',
        likes: 5,
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map(n => n.title);
    expect(contents).toContain('Gymma');
});

test('likes default to 0', async () => {
    const newBlog = {
        title: 'Gymma',
        author: 'Fredrik Mellberg',
        url: 'http://www.google.com',
    };

    await api.post('/api/blogs').send(newBlog);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[2].likes).toEqual(0);
});

test('missing "title" or "url" results in "400 Bad Request"', async () => {
    const newBlog = {
        author: 'Fredrik Mellberg',
        likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
});

afterAll(() => {
    mongoose.connection.close();
});
