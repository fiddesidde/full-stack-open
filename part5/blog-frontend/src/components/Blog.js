import React, { useState } from 'react';
// import blogService from '../services/blogs';

const Blog = ({ blog, updateBlog }) => {
    const blogStyle = {
        paddingTop: 5,
        paddingLeft: 2,
        paddingBottom: 5,
        border: 'solid',
        borderWidth: 2,
        marginTop: 5,
        width: 500,
    };

    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const likeBlogOnce = event => {
        event.preventDefault();

        const updatedBlogObject = { ...blog, likes: (blog.likes += 1) };
        updateBlog(updatedBlogObject);
    };

    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible} className="title">
                {blog.title} <button onClick={toggleVisibility}>show</button>
            </div>
            <div style={showWhenVisible}>
                <div className="title">
                    {blog.title}{' '}
                    <button onClick={toggleVisibility}>hide</button>
                </div>
                <div>Link: {blog.url}</div>
                <div>
                    Likes: {blog.likes}{' '}
                    <button onClick={likeBlogOnce}>like</button>
                </div>
                <div>Author: {blog.author}</div>
            </div>
        </div>
    );
};

export default Blog;