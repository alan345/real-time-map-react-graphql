import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
import App from './components/App'
import CreateUser from './components/CreateUser'
import LoginUser from './components/LoginUser'
import './index.css';
import { Router, Route, browserHistory } from 'react-router'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'


const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj90jghsc0ld701749s7lmky7' })

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('graphcoolToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`
    }
    next()
  },
}])

const client = new ApolloClient({ networkInterface })

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={Map} />
      <Route path='app' component={App} />
      <Route path='login' component={LoginUser} />
      <Route path='signup' component={CreateUser} />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
