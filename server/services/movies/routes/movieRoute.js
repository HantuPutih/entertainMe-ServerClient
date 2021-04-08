const router = require('express').Router()

const MovieController = require('../controllers/movieController')

router.get('/movies', MovieController.findAll)
router.post('/movies', MovieController.createMovie)
router.get('/movies/:id', MovieController.findOneMovie)
router.put('/movies/:id', MovieController.putMovie)
router.delete('/movies/:id', MovieController.destroyMovie)

module.exports = router