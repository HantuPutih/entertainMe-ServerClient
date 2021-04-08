const { getDatabase } = require('../config/mongodb')

class TVSeries {
  static findAllSeries() {
    return getDatabase().collection('TV Series').find().toArray()
  }
  static createSeries(series) {
    return getDatabase().collection('TV Series').insertOne(series)
  }
  static findOneSeries(id) {
    return getDatabase().collection('TV Series').find({_id: new Mongodb.ObjectID(id)}).toArray()
  }
  static putSeries(id, series) {
    return getDatabase().collection('TV Series').updateOne(
      {_id: new Mongodb.ObjectID(id)},
        {
          $set: series,
        }
      )
  }
  static destroySeries(id) {
    return getDatabase().collection('TV Series').deleteOne({_id: new Mongodb.ObjectID(id)})
  }
}

module.exports = TVSeries