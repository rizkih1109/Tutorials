var express = require('express');
var router = express.Router();
var User = require('../models/User')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) throw Error("user doesn't exixt")

    if (!bcrypt.compareSync(password, user.password)) throw Error("password is wrong")

    const token = jwt.sign({ userid: user._id }, 'rubicamp');

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

router.post('/register', async function (req, res, next) {
  try {
    const { email, password, repassword } = req.body

    if (password !== repassword) throw Error("Password doesn't match")

    const user = await User.findOne({ email })

    if (user) throw Error("email already exist")

    const hash = bcrypt.hashSync(password, saltRounds);
    const userCreated = await User.create({ email, password: hash })
    const token = jwt.sign({ userid: userCreated._id }, 'rubicamp');

    res.json({
      succsess: true,
      data: {
        email: userCreated.email,
        token
      }
    })
  } catch (err) {
    res.status(500).json({ succsess: false, message: err.message })
  }
});

module.exports = router;
