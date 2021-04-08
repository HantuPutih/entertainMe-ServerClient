const Movie = require('../models/movie')

class MovieController {
  static async findAll(req, res) {
    try {
      const movies = await Movie.findAll()
      res.json(movies)
    } catch (err) {
      console.log(err);
    }
  }

  static async createMovie(req,res) {
    try {
      const movies = await Movie.createMovie(req.body)
      res.json(movies)
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = MovieController