const express = require('express')
const { connect } = require('./config/mongodb')
const app = express()
const routes = require('./routes/TVSeriesRoutes')

const PORT = 4002

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

connect().then( async (db) => {
  console.log('mongo connected!')
  
  app.listen(PORT, () => {
    console.log('running tv series in port ' + PORT);
  })
})