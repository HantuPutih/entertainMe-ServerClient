const router = require('express').Router()

const TVSeriesController = require('../controllers/TVSeriesController')

router.get('/', TVSeriesController.findAllSeries)
router.post('/', TVSeriesController.createSeries)

module.exports = router