const router = require('express').Router()

const TVSeriesController = require('../controllers/TVSeriesController')

router.get('/tvseries', TVSeriesController.findAllSeries)
router.post('/tvseries', TVSeriesController.createSeries)
router.get('/tvseries/:id', TVSeriesController.findOneSeries)
router.put('/tvseries/:id', TVSeriesController.putSeries)
router.delete('/tvseries/:id', TVSeriesController.destroySeries)

module.exports = router