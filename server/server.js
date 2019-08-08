import express from 'express';
import mongoose from 'mongoose';
import router from './router';
import single from './single';

// Connect to MongoDB
mongoose.connect('mongodb://localhost/test2');

// Initialize http server
const app = express();

const address = '0.0.0.0';
const port = 80;

// Use v1 as prefix for all API endpoints
app.use('/v1', router);
app.use('/v1', single);

const server = app.listen(port, address, () => {
  console.log(`Listening at http://${address}:${port}`);
});