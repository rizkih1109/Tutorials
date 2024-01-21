var express = require('express');
var router = express.Router();
const models = require('../models')

router.get('/', async (req, res, next) => {
    try {
        const todos = await models.Todo.findAll({ include: models.User });
        res.json(todos)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { title, executor } = req.body
        const todo = await models.Todo.create({ title, executor });
        res.json(todo)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { title, complete } = req.body
        const todo = await models.Todo.update({ title, complete }, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.json(todo[1])
    } catch (err) {
        console.log(err)
        res.json(err)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const todoData = await models.Todo.findOne({ where: { id: req.params.id } })
        const todo = await models.Todo.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(todoData)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
});

module.exports = router;
