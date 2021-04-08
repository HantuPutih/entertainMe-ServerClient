const TVSeries = require('../models/TVSeries')

class TVSeriesController {
  static async findAllSeries(req, res) {
    try {
      const series = await TVSeries.findAllSeries()
      res.json(series)
    } catch (err) {
      console.log(err);
    }
  }

  static async createSeries(req,res) {
    try {
      const series = await TVSeries.createSeries(req.body)
      res.json(series)
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TVSeriesController