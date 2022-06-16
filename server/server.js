// TODO: Add MONGOURI to .env and statically serve the build/bundle.js file when it is time for production.

require('dotenv').config(); //Allows usage of stored sensitive information, MongoDB connection URI and StripeAPI key.
const mongoose = require('mongoose');
const express = require('express');

// Router to handle all application requests to user events, item events, checkout
const apiRouter = require('./routes/api');

const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // Enables all CORS requests
app.use(express.json()); // Parses incoming requests with a json body
app.use(express.urlencoded({ extended: true })); //Parses incoming requests with urlencoded payloads

// Reroute any request to /api/user to the Router where it will handle further endpoints
app.use('/api/user', apiRouter);

// Catch-all error handling to any route not defined.
app.use('*', (req, res) => {
  res.sendStatus(404);
});

// Global error handler, any middleware function passing next(err) will follow this structure.
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Confirmation in terminal that the server is started.
app.listen(PORT, () => {
  console.log(`listening to PORT: ${PORT}`);
});

// Connect to either production or dev database based off of how application is spun up, npm start or npm run dev.
mongoose.connect(
  process.env.NODE_ENV === 'test'
    ? process.env.MONGOURI_TEST
    : process.env.MONGOURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Confirmation in terminal on application spin up that a connection to the database is set up.
mongoose.connection.once('open', () => {
  console.log(`Connected to ${process.env.NODE_ENV} Database 🥳`);
});
