const dummy = array => {
    return 1;
};

const totalLikes = array => {
    return array.reduce((agg, ele) => ele.likes + agg, 0);
};

module.exports = { dummy, totalLikes };
