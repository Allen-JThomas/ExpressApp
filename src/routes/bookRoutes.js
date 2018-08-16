const express = require('express')
const bookController = require('../controllers/bookController')
const bookService = require('../services/goodReadServices')

const bookRouter = express.Router()

function router(nav) {
  const { getBooks, getById, authMiddleware } = bookController(bookService, nav)
  bookRouter.use(authMiddleware)

  bookRouter.route('/')
    .get(getBooks)
  bookRouter.route('/:id')
    .get(getById)

  return bookRouter
}

module.exports = router
