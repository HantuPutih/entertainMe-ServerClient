//isinya yang akan hubungin ke services movies dan series
const express = require('express');
const app = express();
const PORT = 4005
const axios = require('axios').default;
const Redis = require("ioredis");
const redis = new Redis()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', ( req, res) => {
  //hit ke movies
  let movies
  let series
  let movieData
  redis.get('movieExpress:data')
  .then(response =>
    { 
    console.log(response)
    movieData = JSON.parse(response)}
  ).catch(console.log)
  
  if (movieData) {
    console.log('dari redis find all');
    return JSON.parse(movieData)
  } else {
    console.log('dari server find all');
    axios({
      method: "GET",
      url: 'http://localhost:4001/movies'
    }).then(response => {
      movies = response.data
      return axios({
        method: "GET",
        url: 'http://localhost:4002/tvseries'
      })
    }).then(response => {
      series = response.data
      redis.set('movieExpress:data', JSON.stringify({movies, series}))
      res.status(200).json({movies, series})
    })
    .catch(console.log)
  }
})

app.post('/addmovie', (req,res) => {
  // console.log(req.body);
  redis.del('movieExpress:data')
  axios({
    method: 'POST',
    url: 'http://localhost:4001/movies',
    data: req.body
  }).then(response => {
    res.status(201).json(response.data)
  }).catch(console.log)
})

app.get('/movie/:id', (req,res) => {
  axios({
    method: 'GET',
    url: 'http://localhost:4001/movies/' + req.params.id,
  }).then(response => {
    res.status(200).json(response.data)
  }).catch(console.log)
})

app.put('/movie/:id', (req,res) => {
  redis.del('movieExpress:data')
  axios({
    method: 'PUT',
    url: 'http://localhost:4001/movies/' + req.params.id,
    data: req.body
  }).then(response => {
    res.status(200).json(response.data)
  }).catch(console.log)
})

app.delete('/movie/:id', (req,res) => {
  redis.del('movieExpress:data')
  axios({
    method: 'DELETE',
    url: 'http://localhost:4001/movies/' + req.params.id,
  }).then(response => {
    res.status(200).json({msg: 'deleted'})
  }).catch(console.log)
})

app.listen(PORT, ()=> {
  console.log('running express on ' + PORT);
})