const axios = require('axios')
const debug = require('debug')('app:goodReadService')
const xml2js = require('xml2js')

const parser = xml2js.Parser({ explicitArray: false })
function goodReadService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.json?key=QTbszKy6k7KSQPWMDRTB6Q`)
        // could do an await instead of then catch
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err)
            } else {
              debug(result)
              resolve(result.GoodreadsResponse.book)
            }
          })
        })
        .catch((error) => {
          debug(error)
          reject(error)
        })
    })
  }
  return { getBookById }
}

module.exports = goodReadService()
