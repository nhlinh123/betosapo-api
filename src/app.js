const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRoute = require('./routes/auth.route');
const jobRoute = require('./routes/job.route');
const categoryRoute = require('./routes/category.route');

const { httpLogStream } = require('./utils/logger');
global.__basedir = __dirname;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(
  '/resources/static/assets/uploads',
  express.static(__dirname + '/resources/static/assets/uploads')
);

app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
// Set up CORS
app.use(
  cors({
    origin: '*', // "true" will copy the domain of the request back
    // to the reply. If you need more control than this
    // use a function.

    // credentials: true, // This MUST be "true" if your endpoint is
    // // authenticated via either a session cookie
    // // or Authorization header. Otherwise the
    // // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE', // Make sure you're not blocking
    // pre-flight OPTIONS requests
  })
);

app.use('/api/auth', authRoute);
app.use('/api/job', jobRoute);
app.use('/api/category', categoryRoute);

app.get('/', (req, res) => {
  res.status(200).send({
    status: 'success',
    data: {
      message: 'API working fine',
    },
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: 'error',
    message: err.message,
  });
  next();
});

module.exports = app;
