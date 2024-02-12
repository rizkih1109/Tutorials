var express = require('express');
var router = express.Router();
const models = require('../models');
const { tokenValid } = require('../helpers/util');

router.get('/', tokenValid, async (req, res, next) => {
    try {
        const todos = await models.Todo.findAll({ include: models.User });
        res.json(todos)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
});

router.post('/', tokenValid, async (req, res, next) => {
    try {
        const { title } = req.body
        const todo = await models.Todo.create({ title, executor: req.user.userid });
        res.json(todo)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
});

router.put('/:id', tokenValid, async (req, res, next) => {
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

router.delete('/:id', tokenValid, async (req, res, next) => {
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
