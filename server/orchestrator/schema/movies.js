const { gql, ApolloError } = require('apollo-server')
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis()

module.exports = {
  typeDefs: gql`
    type Movie {
      _id: ID
      title: String
      popularity: Float
      overview: String
      poster_path: String
      tags:[String]
    }
    type ResponseMovie {
      message: String
    }
    extend type Query {
      movies: [Movie]
      findOneMovie(id: ID!): Movie
    }

    input MovieInput {
      title: String
      popularity: Float
      overview: String
      poster_path: String
      tags:[String]
    }

    extend type Mutation {
      addMovies(movie: MovieInput): Movie
      destroyMovie(id: ID!): ResponseMovie
      findOneMovie(id: ID!): Movie
      putMovie(id: ID!, movie: MovieInput): ResponseMovie
    }
  `,
  resolvers: {
    Query: { 
      async movies() {
        try {
          const movieData = await redis.get('movie:data')
          if (movieData) {
            // console.log('dari redis find all movie');
            return JSON.parse(movieData)
          } else {
            // console.log('dari server find all movie');
            const { data } = await axios.get('http://localhost:4001/movies')
            redis.set('movie:data', JSON.stringify(data))
            return data
          }
        } catch (err) {
          console.log(err)
          return new ApolloError(err)
        }
      },
      async findOneMovie(parent, args, context, info) {
        try {
          const { data } = await axios.get('http://localhost:4001/movies/' + args.id )
          console.log(data);
          return data[0]
        } catch (err) {
          console.log(err)
          return new ApolloError(err)
        }
      }
    },
    Mutation: { 
      async addMovies(parent, args, context, info) {
        try {
          await redis.del('movie:data')
          const { data } = await axios.post('http://localhost:4001/movies', args.movie)
          return data.ops[0]
        } catch (err) {
          console.log(err)
          return new ApolloError(err)
        }
      },
      async putMovie(parent, args, context, info){
        try {
          await redis.del('movie:data')
          const { data } = await axios.put('http://localhost:4001/movies/' + args.id, args.movie)
          return  {message: 'movie edited!'}
        } catch (err) {
          console.log(err)
          return new ApolloError(err)
        }
      },
      async destroyMovie(parent, args, context, info) {
        try {
          await redis.del('movie:data')
          const { data } = await axios.delete('http://localhost:4001/movies/' + args.id)
          console.log('movie destroyed');
          return {message: 'movie destroyed!'}
        } catch (err) {
          console.log(err)
          return new ApolloError(err)
        }
      }
    }
  }
}