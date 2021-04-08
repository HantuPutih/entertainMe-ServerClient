const TVSeries = require('../models/TVSeries')

class TVSeriesController {
  static async findAllSeries(req, res) {
    try {
      const series = await TVSeries.findAllSeries()
      res.status(200).json(series)
    } catch (err) {
      console.log({err});
      res.status(500).json({err})
    }
  }

  static async createSeries(req,res) {
    try {
      const series = await TVSeries.createSeries(req.body)
      res.status(201).json(series)
    } catch (err) {
      console.log({err});
      res.status(500).json({err});
    }
  }

  static async findOneSeries(req, res) {
    try {
      const series = await TVSeries.findOneSeries(req.params.id)
      res.status(200).json(series)
    } catch (err) {
      console.log({err});
      res.status(500).json({err})
    }
  }
  
  static async putSeries(req, res) {
    try {
      const series = await TVSeries.findOneSeries(req.params.id, req.body)
      res.status(200).json(series)
    } catch (err) {
      console.log({err});
      res.status(500).json({err})
    }
  }

  static async destroySeries(req, res) {
    try {
      const series = await TVSeries.destroySeries(req.params.id)
      res.status(200).json(series)
    } catch (err) {
      console.log({err});
      res.status(500).json({err})
      
    }
  }
}

module.exports = TVSeriesController