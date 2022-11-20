const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./helpers/apiHelpes');

const noticesRouter = require('./routes/api/notices');
const newsRouter = require('./routes/api/news');
const userRouter = require('./routes/api/user');
const petRouter = require('./routes/api/pet');
const friendsRouter = require('./routes/api/friends');
const cityRouter = require('./routes/api/city');
const breedRouter = require('./routes/api/breed');
const swaggerRouter = require('./routes/swagger/index.js');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/notices', noticesRouter);
app.use('/api/news', newsRouter);
app.use('/api/user', userRouter);
app.use('/api/pet', petRouter);
app.use('/api/cities', cityRouter);
app.use('/api/breeds', breedRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/docs', swaggerRouter);

app.use((_, res, __) => {
	res.status(404).json({
		status: 'error',
		code: 404,
		message:
			'Use api on routes: /user, /news, /notices, /pet, /cities, /breeds, /friends, /docs',
		data: 'Not found',
	});
});
app.use(errorHandler);

module.exports = app;
