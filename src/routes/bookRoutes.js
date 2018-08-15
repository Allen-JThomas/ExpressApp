const express = require('express')

const bookRouter = express.Router()

function router(nav) {
  const books = [
    {
      title: 'War And Peace',
      genre: 'History',
      author: 'Ya boi',
      read: false
    },
    {
      title: 'Moby Dick',
      genre: 'History',
      author: 'Ya boi',
      read: false
    }
  ]

  bookRouter.route('/')
    .get((req, res) => {
      res.render(
        'bookListView',
        {
          nav,
          title: 'Library',
          books
        }
      )
    })
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: books[id]
        }
      )
    })

  return bookRouter
}

module.exports = router
