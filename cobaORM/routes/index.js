var express = require('express');
var router = express.Router();
const models = require('../models')
const { generateToken } = require('../helpers/util')

router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body

    const user = await models.User.findOne({ where: { email } })

    if (!user) throw Error("user doesn't exixt")

    if (!user.checkPassword) throw Error("password is wrong")

    const token = generateToken({userid: user.id})

    res.json({
      succsess: true,
      data: {
        email: user.email,
        token
      }
    })

  } catch (err) {
    res.status(500).json({ succsess: false, message: err.message })
  }
});

module.exports = router;
