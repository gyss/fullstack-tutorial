import {ApolloClient, NormalizedCacheObject, gql} from '@apollo/client'
import {ApolloProvider} from '@apollo/react-hooks'
import React from 'react'
import ReactDOM from 'react-dom'

import Pages from './pages'
import injectStyles from './styles'
import {cache} from './cache'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('token') || '',
    'client-name': 'Space Explorer [web]',
    'client-version': '1.0.0',
  },
  typeDefs,
  resolvers: {},
})

client
  .query({
    query: gql`
      query GetLaunch2 {
        launch(id: 56) {
          id
          mission {
            name
          }
        }
      }
    `,
  })
  .then((result) => console.log(result))

//

injectStyles()
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById('root')
)
