if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
let DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

if (process.env.NODE_ENV === 'test') {
    DB_URL = process.env.TEST_DB_URL;
}

module.exports = { DB_URL, PORT };
