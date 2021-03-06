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


router.post('/', async (req, res) => {
    try {
        const task = await Task.create(req.body.text, req.body.day, req.body.reminder)
        console.log(task)
        res.json(task)
    } catch(err) {
        res.status(404).json({err})
    }
})


router.patch('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        console.log(task)
        const updatedTask = await task.update()
        res.json({task: updatedTask})
    } catch(err) {
        res.status(500).json({err})
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        await task.destroy()
        res.json(task)
    } catch(err) {
        res.status(404).json({err})
    }
})



module.exports = router;
