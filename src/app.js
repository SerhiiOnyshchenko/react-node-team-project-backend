const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./helpers/apiHelpes');

// const authRouter = require('./routes/api');
// const servicesSidebarRouter = require('./routes/api');
const newsRouter = require('./routes/api/news');
// const noticesRouter = require('./routes/api');
const userRouter = require('./routes/api/user');
const petRouter = require('./routes/api/pet');
const swaggerRouter = require('./routes/swagger/index.js');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use('/api/auth', authRouter);
// app.use('/api/services-sidebar', servicesSidebarRouter);
app.use('/api/news', newsRouter);
// app.use('/api/notices', noticesRouter);
app.use('/api/user', userRouter);
app.use('/api/pet', petRouter);
app.use('/api/', swaggerRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/user',
    data: 'Not found',
  });
});
app.use(errorHandler);

module.exports = app;
