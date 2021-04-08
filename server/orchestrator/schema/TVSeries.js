const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis()

module.exports = {
  typeDefs: gql`
    type TVSeries {
      _id: ID
      title: String
      popularity: Float
      overview: String
      poster_path: String
      tags:[String]
    }
    type ResponseSeries {
      message: String
    }
    extend type Query {
      TVSeries: [TVSeries]
      findOneSeries(id: ID!): TVSeries
    }

    input SeriesInput {
      title: String
      popularity: Float
      overview: String
      poster_path: String
      tags:[String]
    }

    extend type Mutation {
      addSeries(TVSeries: SeriesInput): TVSeries
      destroySeries(id: ID!): ResponseSeries
      findOneSeries(id: ID!): TVSeries
      putSeries(id: ID!, TVSeries: SeriesInput): ResponseSeries
    }
  `,
  resolvers: {
    Query: { 
      async TVSeries() {
        try {
          const seriesData = await redis.get('series:data')
          if (seriesData) {
            console.log('dari redis find all series');
            return JSON.parse(seriesData)
          } else {
            const { data } = await axios.get('http://localhost:4002/tvseries')
            redis.set('series:data', JSON.stringify(data))
            return data
          }
          
        } catch (err) {
          console.log(err);
        }
      },
      async findOneSeries(parent, args, context, info) {
        try {
          const { data } = await axios.get('http://localhost:4002/tvseries/' + args.id )
          return data[0]
        } catch (err) {
          console.log(err);
        }
      }
    },
    
    Mutation: { 
      async addSeries(parent, args, context, info) {
        try {
          await redis.del('series:data')
          const { data } = await axios.post('http://localhost:4002/tvseries', args.TVSeries)
          // console.log('hasil post series', data.ops[0]);
          return data.ops[0]
        } catch (err) {
          console.log(err);
        }
      },
      async putSeries(parent, args, context, info){
        try {
          await redis.del('series:data')
          const { data } = await axios.put('http://localhost:4002/tvseries/' + args.id, args.TVSeries)
          return  {message: 'TVSeries edited!'}
        } catch (err) {
          console.log(err);
        }
      },
      async destroySeries(parent, args, context, info) {
        try {
          await redis.del('series:data')
          const { data } = await axios.delete('http://localhost:4002/tvseries/' + args.id)
          console.log('TVSeries destroyed');
          return {message: 'TVSeries destroyed!'}
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}