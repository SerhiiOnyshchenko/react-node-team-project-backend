const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const { noticesRouter } = require('./routes/api/noticesRouter');
const { errorHandler } = require('./helpers/apiHelpes');

// const authRouter = require('./routes/api');
// const servicesSidebarRouter = require('./routes/api');
// const newsRouter = require('./routes/api');
// const userRouter = require('./routes/api/user');
const swaggerRouter = require('./routes/swagger/index.js');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use('/api/auth', authRouter);
// app.use('/api/services-sidebar', servicesSidebarRouter);
// app.use('/api/news', newsRouter);
app.use('/api/notices', noticesRouter);
// app.use('/api/user', userRouter);
// app.use('/api/', swaggerRouter);

app.use(errorHandler);

module.exports = app;
