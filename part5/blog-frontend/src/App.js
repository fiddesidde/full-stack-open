import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import { Notification, ErrorMessage } from './components/Message';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [notice, setNotice] = useState(null);
    const [loginVisible, setLoginVisible] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);

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

    const addBlog = async blogObject => {
        try {
            const res = await blogService.create(blogObject);
            setBlogs(blogs.concat(res));
            setNotice(`'${res.title}' succesfully added`);
            setTimeout(() => {
                setNotice(null);
            }, 5000);
        } catch (error) {
            setErrorMessage(`Error: ${error}`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const loginForm = () => {
        const hideWhenVisible = { display: loginVisible ? 'none' : '' };
        const showWhenVisible = { display: loginVisible ? '' : 'none' };

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setLoginVisible(true)}>login</button>
                </div>
                <div style={showWhenVisible}>
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) =>
                            setUsername(target.value)
                        }
                        handlePasswordChange={({ target }) =>
                            setPassword(target.value)
                        }
                        handleSubmit={handleLogin}
                    />
                    <button onClick={() => setLoginVisible(false)}>
                        cancel
                    </button>
                </div>
            </div>
        );
    };

    const blogForm = () => {
        const hideWhenVisible = { display: createVisible ? 'none' : '' };
        const showWhenVisible = { display: createVisible ? '' : 'none' };

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setCreateVisible(true)}>
                        new blog?
                    </button>
                </div>
                <div style={showWhenVisible}>
                    <BlogForm createBlog={addBlog} />
                    <button onClick={() => setCreateVisible(false)}>
                        cancel
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <Notification message={notice} />
            <ErrorMessage message={errorMessage} />
            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <h2>blogs</h2>
                    <p>
                        {user.name} logged in{' '}
                        <button type="button" onClick={handleLogout}>
                            Logout
                        </button>
                    </p>
                    <div>{blogForm()}</div>
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
