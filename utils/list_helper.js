const dummy = array => {
    return 1;
};

const totalLikes = array => {
    return array.reduce((agg, ele) => ele.likes + agg, 0);
};

const favoriteBlog = array => {
    const mostLikedBlog = array.filter(
        blog =>
            blog.likes ===
            array.reduce((agg, ele) => (ele.likes > agg ? ele.likes : agg), 0)
    )[0];
    const formattedObject = {
        title: mostLikedBlog.title,
        author: mostLikedBlog.author,
        likes: mostLikedBlog.likes,
    };
    return formattedObject;
};

const mostBlogs = array => {
    const newAuthorList = [];
    array.forEach(blog => {
        if (!newAuthorList.some(author => author.author === blog.author)) {
            newAuthorList.push({ author: blog.author, blogs: 1 });
        } else {
            const i = newAuthorList.findIndex(author => {
                return author.author === blog.author;
            });
            newAuthorList[i].blogs += 1;
        }
    });
    const mostBlogs = newAuthorList.filter(
        author =>
            author.blogs ===
            newAuthorList.reduce(
                (agg, ele) => (ele.blogs > agg ? ele.blogs : agg),
                0
            )
    )[0];
    return mostBlogs;
};

const mostLikes = array => {
    const newAuthorList = [];
    array.forEach(blog => {
        if (!newAuthorList.some(author => author.author === blog.author)) {
            newAuthorList.push({ author: blog.author, likes: blog.likes });
        } else {
            const i = newAuthorList.findIndex(author => {
                return author.author === blog.author;
            });
            newAuthorList[i].likes += blog.likes;
        }
    });
    const mostLikes = newAuthorList.filter(
        author =>
            author.likes ===
            newAuthorList.reduce(
                (agg, ele) => (ele.likes > agg ? ele.likes : agg),
                0
            )
    )[0];
    return mostLikes;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
