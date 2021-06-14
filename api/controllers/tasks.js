const express = require('express');
const router = express.Router();


const Task = require('../models/task')


router.get('/', async (req, res) => {
    try {
        const tasks = await Task.all
        res.json({tasks})
    } catch(err) {
        res.status(500).json({err})
    }
})


module.exports = router;
