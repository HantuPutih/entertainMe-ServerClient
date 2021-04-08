//isinya adalah grapQL dan apllo
const { ApolloServer, gql } = require('apollo-server');
const MovieSchema = require('./schema/movies')
const SeriesSchema = require('./schema/TVSeries')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Query 
  type Mutation
`

const resolvers = {
}


const server = new ApolloServer({
  typeDefs: [typeDefs, MovieSchema.typeDefs, SeriesSchema.typeDefs],
  resolvers: [resolvers, MovieSchema.resolvers, SeriesSchema.resolvers]
  })

server.listen().then(({ url }) => {
  console.log('apollo running on', url);
})