import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import loginForm from './components/loginForm';
import blogForm from './components/blogForm';
import { Notification, ErrorMessage } from './components/Message';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        const getBlogs = async () => {
            const blogs = await blogService.getAll();
            setBlogs(blogs);
        };
        getBlogs();
    }, []);

    useEffect(() => {
        const blogAppUserJSON = window.localStorage.getItem('blogAppUser');
        if (blogAppUserJSON) {
            const user = JSON.parse(blogAppUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async event => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem('blogAppUser', JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (error) {
            console.log(error);
            setErrorMessage('Wrong username/password');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const handleLogout = event => {
        event.preventDefault();
        window.localStorage.removeItem('blogAppUser');
        setUser(null);
    };

    const addBlog = async event => {
        event.preventDefault();
        const blogObject = {
            title: title,
            author: author,
            url: url,
        };
        try {
            const res = await blogService.create(blogObject);
            setBlogs(blogs.concat(res));
            setNotice(`${title} succesfully added`);
            setTimeout(() => {
                setNotice(null);
            }, 5000);
        } catch (error) {
            setErrorMessage(`Error: ${error}`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }

        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <>
            <Notification message={notice} />
            <ErrorMessage message={errorMessage} />
            {user === null ? (
                loginForm(
                    handleLogin,
                    username,
                    setUsername,
                    password,
                    setPassword
                )
            ) : (
                <div>
                    <h2>blogs</h2>
                    <p>
                        {user.name} logged in{' '}
                        <button type="button" onClick={handleLogout}>
                            Logout
                        </button>
                    </p>
                    <div>
                        {blogForm(
                            addBlog,
                            title,
                            setTitle,
                            author,
                            setAuthor,
                            url,
                            setUrl
                        )}
                    </div>
                    <div>
                        {blogs.map(blog => (
                            <Blog key={blog.id} blog={blog} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default App;
