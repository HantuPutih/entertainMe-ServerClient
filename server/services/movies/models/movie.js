const { getDatabase } = require('../config/mongodb')
const Mongodb = require('mongodb')

class Movie {
  static findAll() {
    return getDatabase().collection('Movies').find().toArray()
  }
  static createMovie(movie) {
    return getDatabase().collection('Movies').insertOne(movie)
  }
  static findOneMovie(id) {
    return getDatabase().collection('Movies').find({_id: new Mongodb.ObjectID(id)}).toArray()
  }
  static putMovie(id, movie) {
    return getDatabase().collection('Movies').updateOne(
      {_id: new Mongodb.ObjectID(id)},
        {
          $set: movie,
        }
      )
  }

  static destroyMovie(id) {
    return getDatabase().collection('Movies').deleteOne({_id: new Mongodb.ObjectID(id)})
  }
}

module.exports = Movie