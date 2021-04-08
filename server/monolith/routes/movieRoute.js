const router = require('express').Router()

const MovieController = require('../controllers/movieController')

router.get('/', MovieController.findAll)
router.post('/', MovieController.createMovie)

module.exports = router