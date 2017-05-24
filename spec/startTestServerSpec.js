'use strict';

/**
 * This starts the server once so that it doesn't need to 
 * happen in each test file
 */
const app = require('../app');
const http = require('http').createServer(app).listen(3000);
