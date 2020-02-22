const router = require('express').Router();
const db = require('./auth-modal')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
  // implement registration
  const { username, password } = req.body
  !username || !password ?
    res.status(403).json({message: 'please provide a username and a password'}) :
    db.insert({ username, password: bcrypt.hashSync(password, 4) })
      .then(id => {
        db.findById(id)
          .then(user => {
            const token = generateToken(user)
            const { id, username } = user
            res.status(201).json({message: `successfully registered as ${username}`, id, username, token})
          })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: 'unable to register user', err})
      })
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body
  !username || !password ?
    res.status(403).json({message: 'please provide a username and a password'}) :
    db.findByUsername(username)
        .then(user => {
          if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)
            const { id, username } = user
            res.status(201).json({message: `logged in as ${username}`, id, username, token})
          }else{
            res.status(403).json({message: 'invalid username or password'})
          }
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({message: 'unable to login user', err})
        })
});

module.exports = router;
