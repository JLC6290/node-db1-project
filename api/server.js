const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

const AccountRouter = require('./AccountRouter');

server.use('/api/accounts', AccountRouter);

module.exports = server;
