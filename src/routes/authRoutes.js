const express = require('express')
const { MongoClient } = require('mongodb')
const debug = require('debug')('app:authRoutes')
const passport = require('passport')

const authRouter = express.Router()

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body
      const url = 'mongodb://localhost:27017'
      const dbName = 'libraryApp';

      (async function addUser() {
        let client
        try {
          client = await MongoClient.connect(url)
          debug('Connected directly to the server')

          const db = client.db(dbName)

          const col = db.collection('users')
          const user = { username, password }

          // result is a really big object and
          // the data that we want is in result.ops
          const result = await col.insertOne(user)

          // log in as user and redirect
          req.login(result.ops[0], () => {
            res.redirect('/auth/profile')
          })
          debug(result.ops[0])
        } catch (error) {
          debug(error)
        }
        client.close()
      }())
    })

  authRouter.route('/profile')
    // pattern to protect 1 route
    // .all((req, res, next) => {
    //   if (req.user) {
    //     next()
    //   } else {
    //     res.redirect('/')
    //   }
    // })
    .get((req, res) => {
      res.json(req.user)
    })
  authRouter.route('/signIn')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign in '
      })
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }))
  return authRouter
}

module.exports = router
