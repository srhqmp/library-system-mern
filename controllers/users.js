const bcrypt = require('bcrypt')
const app = require('../app')
const usersRouter = require('express').Router()
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

// GET all users
usersRouter.get('/', userExtractor, async (req, res) => {
  const users = await User.find({}).populate('borrowedBooks', {
    isApproved: 1,
    dateBorrowed: 1,
    returnedDate: 1,
    bookTitle: 1,
  })
  return res.json(users)
})

// GET specific user
usersRouter.get('/:id', userExtractor, async (req, res) => {
  const user = await User.findById(req.params.id).populate('borrowedBooks', {
    borrowedBook: 1,
    author: 1,
  })
  return res.json(user)
})

// CREATE new user
usersRouter.post('/', async (req, res) => {
  const body = req.body
  const password = body.password

  if (!password || password.length < 3) {
    return res
      .status(400)
      .send({ error: 'password must be at least 3 characters long' })
      .end()
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    userType: body.userType,
    dateCreated: new Date().toISOString(),
  })

  const savedUser = await user.save()
  return savedUser ? res.status(201).json(savedUser) : res.status(400).end()
})

module.exports = usersRouter
