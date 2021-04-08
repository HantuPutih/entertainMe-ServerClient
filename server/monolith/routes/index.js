const routes = require('express').Router()
const movieRoute = require('./movieRoute')
const TVRoute = require('./TVSeriesRoutes')

routes.use('/movies', movieRoute)
routes.use('/tvseries', TVRoute)


module.exports = routes
