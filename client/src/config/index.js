import { ApolloClient, InMemoryCache } from '@apollo/client';
import { favoriteVar } from '../graphQL/var'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        favorites : {
          read() {
            return favoriteVar
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

export default client