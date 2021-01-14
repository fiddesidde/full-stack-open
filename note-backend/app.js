const express = require('express');
const app = express();
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const { DB_URL } = require('./utils/config');

logger.info('Connecting to', DB_URL);

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', logger.error.bind(console, 'error connecting to MongoDB:'));
db.once('open', () => {
    logger.info('Connected to MongoDB');
});

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
