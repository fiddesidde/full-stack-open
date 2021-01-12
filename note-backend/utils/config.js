if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;

module.exports = {
    DB_URL,
    PORT,
};
