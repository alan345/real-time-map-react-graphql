import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
import './index.css';
import { Router, Route, browserHistory } from 'react-router'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'


const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj90jghsc0ld701749s7lmky7' })


const client = new ApolloClient({ networkInterface })

ReactDOM.render(
  <ApolloProvider client={client}>
  <Router history={browserHistory}>
    <Route path='/' component={Map} />
    <Route path='create' component={Map} />
  </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
