const { getDatabase } = require('../config/mongodb')

class Movie {
  static findAll() {
    return getDatabase().collection('Movies').find().toArray()
  }
  static createMovie(movie) {
    return getDatabase().collection('Movies').insertOne(movie)
  }
}

module.exports = Movie