var express = require('express');
var router = express.Router();
const Todo = require('../models/Todo');
const User = require('../models/User');
const { tokenValid } = require('../helpers/util');


router.get('/', tokenValid, async function (req, res, next) {
  try {
    const { title, complete, page = 1, sortBy = "_id", sortMode = 'asc' } = req.query
    const params = {executor: req.user.userid}
    const sort = {}
    sort[sortBy] = sortMode

    if (title) {
      params['title'] = new RegExp(name, 'i')
    }

    if (complete) {
      params['complete'] = JSON.parse(complete)
    }

    const limit = 3
    const offset = (page - 1) * limit
    const total = await Todo.countDocuments(params)
    const pages = Math.ceil(total / limit)

    const todos = await Todo.find(params).populate('executor').sort(sort).limit(limit).skip(offset)
    res.json({ data: todos, page, pages })
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.post('/', tokenValid, async function (req, res, next) {
  try {
    const { title } = req.body
    const todo = await Todo.create({ title, executor: req.user.userid })
    const user = await User.findById(req.user.userid)
    user.todos.push(todo)
    await user.save()
    res.json(todo)
  } catch (err) {
    console.log(err)
    res.status(500).json({ err })
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const { title, complete } = req.body
    const todo = await Todo.findByIdAndUpdate(req.params.id, { title, complete }, { new: true })
    res.json(todo)
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    res.json(todo)
  } catch (err) {
    res.status(500).json({ err })
  }
});

module.exports = router;
