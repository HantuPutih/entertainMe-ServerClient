const express = require('express')
const { connect } = require('./config/mongodb')
const app = express()
const routes = require('./routes/movieRoute')

const PORT = 4001

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)


connect().then( async (db) => {
  console.log('mongo connected!')
  
  app.listen(PORT, () => {
    console.log('running movies in port ' + PORT);
  })
})