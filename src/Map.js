import React, { Component } from 'react'
import WorldChat from './WorldChat'
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo'
import generateStupidName from 'sillyname'
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws'



import { graphql, gql } from 'react-apollo'
import { withRouter } from 'react-router'




// __SUBSCRIPTIONS_API_ENDPOINT__ looks similar to: `wss://subscriptions.graph.cool/v1/<PROJECT_ID>`
const wsClient = new SubscriptionClient('wss://subscriptions.us-west-2.graph.cool/v1/cj92pvw0b0uqj011653p93h87', {
  reconnect: true,
  timeout: 20000
})

// __SIMPLE_API_ENDPOINT__ looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj92pvw0b0uqj011653p93h87' })

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id,
})


const WORLDCHAT_USERNAME_KEY = 'WORLDCHAT_USERNAME'

class Map extends React.Component {

  _isLoggedIn = () => {
    return this.props.data.loggedInUser && this.props.data.loggedInUser.id !== null
  }

  componentWillMount(

  ) {

    // testing
    // localStorage.removeItem(WORLDCHAT_USERNAME_KEY)

    let name = localStorage.getItem(WORLDCHAT_USERNAME_KEY)
    if (!Boolean(name)) {
      name = generateStupidName()
      console.log('No name in localStorage, generated new: ', name)
      localStorage.setItem(WORLDCHAT_USERNAME_KEY, name)
    }
    console.log('Name in localStorage: ', name)

  }

  render() {

    console.log(this.props)
    return (
      <ApolloProvider client={client}>

        <WorldChat
          name={localStorage.getItem(WORLDCHAT_USERNAME_KEY)}
        />
      </ApolloProvider>
    )
  }
}

const userQuery = gql`
  query {
    loggedInUser {
      id
    }
  }
`

export default graphql(userQuery, { options: {fetchPolicy: 'network-only'}})(withRouter(Map))
