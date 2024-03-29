const express = require('express');
require('express-async-errors');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { DB_URL } = require('./utils/config');
const middleware = require('./utils/middleware');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to MongoDB:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());
app.use(middleware.getTokenFrom);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
