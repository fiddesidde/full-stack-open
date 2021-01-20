const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helpers');
const Blog = require('../models/blog');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
});

describe('when there is initially some blogs saved', () => {
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
});

describe('addition of a new blog', () => {
    test('posting a valid blog works', async () => {
        const newBlog = {
            title: 'Gymma',
            author: 'Ray Reddington',
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
            author: 'Ray Reddington',
            url: 'http://www.google.com',
        };

        await api.post('/api/blogs').send(newBlog);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd[2].likes).toEqual(0);
    });

    test('fails with status code 400 if "title" or "url" is missing', async () => {
        const newBlog = {
            author: 'Ray Reddington',
            likes: 5,
        };

        await api.post('/api/blogs').send(newBlog).expect(400);
    });
});

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

        const titles = blogsAtEnd.map(r => r.title);
        expect(titles).not.toContain(blogToDelete.title);
    });
});

describe('updating a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];

        const updatedInfo = {
            likes: 500,
        };

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedInfo)
            .expect(200);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

        const updatedLikes = blogsAtEnd[0].likes;
        expect(updatedLikes).toEqual(500);
    });
});

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('sekret', 10);
        const user = new User({ username: 'root', passwordHash });

        await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'fiddesidde',
            name: 'Fredrik M',
            password: 'fiddesidde',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper status code and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'root',
            name: 'Groot root',
            password: 'fiddesidde',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('`username` to be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
    test('creation fails with proper status code and message if username missing', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            name: 'Groot root',
            password: 'fiddesidde',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('`username` is required');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
    test('creation fails with proper status code and message if password missing', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'PapaJohn',
            name: 'Groot root',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('password missing');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
    test('creation fails with proper status code and message if username too short', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'Pa',
            name: 'Groot root',
            password: 'fiddesidde',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain(
            'shorter than the minimum allowed length'
        );

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
    test('creation fails with proper status code and message if password too short', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'Papajjjj',
            name: 'Groot root',
            password: 'fi',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain(
            'password needs to be atleast 3 characters long'
        );

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
