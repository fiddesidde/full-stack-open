import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import loginForm from './components/Login-form';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const getBlogs = async () => {
            const blogs = await blogService.getAll();
            setBlogs(blogs);
        };
        getBlogs();
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
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem('blogAppUser');
        setUser(null);
    };

    return (
        <>
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
