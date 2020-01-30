  
'use strict';

const mongoose = require('mongoose');
const server = require('./src/server.js');

const MONOGDB_URI = 'mongodb://localhost:27017/lab08db';

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(MONOGDB_URI, mongooseOptions);

server.start();