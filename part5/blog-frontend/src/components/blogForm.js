import React from 'react';

const blogForm = (addBlog, title, setTitle, author, setAuthor, url, setUrl) => {
    return (
        <form onSubmit={addBlog}>
            <div>
                Title:
                <input
                    type="text"
                    name="Title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                Author:
                <input
                    type="text"
                    name="Author"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                URL:
                <input
                    type="text"
                    name="URL"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">Add</button>
        </form>
    );
};

export default blogForm;
