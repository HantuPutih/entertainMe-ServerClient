const { getDatabase } = require('../config/mongodb')

class TVSeries {
  static findAllSeries() {
    return getDatabase().collection('TV Series').find().toArray()
  }
  static createSeries(series) {
    return getDatabase().collection('TV Series').insertOne(series)
  }
}

module.exports = TVSeries