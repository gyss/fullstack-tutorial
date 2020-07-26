import React from 'react'
import {gql, useApolloClient, ApolloClient, useMutation} from '@apollo/client'
import {isLoggedInVar} from '../cache'

import {LoginForm, Loading} from '../components'
import * as LoginTypes from './__generated__/login'

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`

export default function Login() {
  // ??? const client: ApolloClient<any> = useApolloClient()
  const [login, {loading, error}] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(
    LOGIN_USER,
    {
      onCompleted({login}) {
        localStorage.setItem('token', login as string)
        //localStorage.setItem('token', login.token as string);
        //localStorage.setItem('userId', login.id as string);
        isLoggedInVar(true)
        // ??? client.writeData({data: {isLoggedIn: true}})
      },
    }
  )

  if (loading) return <Loading />
  if (error) return <p>An error occurred</p>

  return <LoginForm login={login} />
}
