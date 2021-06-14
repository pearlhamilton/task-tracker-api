const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const taskRoutes = require('./controllers/tasks')
server.use('/tasks', taskRoutes)


// Root route
server.get('/', (req, res) => res.send('Hello, client!'))

module.exports = server