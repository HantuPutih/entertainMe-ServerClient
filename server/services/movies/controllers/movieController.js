const Movie = require('../models/movie')
const Redis = require("ioredis");

class MovieController {
  static async findAll(req, res) {
    try {
      const movies = await Movie.findAll()
      res.status(200).json(movies)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async createMovie(req,res) {
    try {
      const movies = await Movie.createMovie(req.body)
      res.status(201).json(movies)
    } catch (err) {
      res.status(500).json(err)

    }
  }

  static async findOneMovie(req, res) {
    try {
      const movies = await Movie.findOneMovie(req.params.id)
      res.status(200).json(movies)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async putMovie(req, res) {
    try {
      const movies = await Movie.putMovie(req.params.id, req.body)
      res.status(200).json(movies)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async destroyMovie(req,res) {
    try {
      // await Redis.del('movie:data')
      const movies = await Movie.destroyMovie(req.params.id)
      res.status(200).json(movies)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}


module.exports = MovieController