var express = require('express');
var router = express.Router();
const models = require('../models')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await models.User.findAll();
    res.json(users)
  } catch (err) {
    console.log(err)
    res.json(err)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body
    const user = await models.User.create({ name: name });
    res.json(user)
  } catch (err) {
    console.log(err)
    res.json(err)
  }
});

module.exports = router;
