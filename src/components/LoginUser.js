import React from 'react'
import { withRouter } from 'react-router'
import { graphql, gql, compose } from 'react-apollo'

class CreateLogin extends React.Component {
  
  state = {
    email: '',
    password: '',
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in
    if (this.props.data.loggedInUser.id) {
      console.warn('already logged in')
      this.props.router.replace('/')
    }

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.email}
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            type='password'
            value={this.state.password}
            placeholder='Password'
            onChange={(e) => this.setState({password: e.target.value})}
          />

          {this.state.email && this.state.password &&
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.signinUser}>Log in</button>
          }
        </div>
      </div>
    )
  }

  signinUser = async () => {
    const {email, password} = this.state

    const response = await this.props.signinUser({variables: {email, password}})
    localStorage.setItem('graphcoolToken', response.data.authenticateUser.token)
    this.props.router.replace('/')
  }
}

const signinUser = gql`
  mutation ($email: String!, $password: String!) { 
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`

const userQuery = gql`
  query {
    loggedInUser {
      id
    }
  }
`

export default compose(
  graphql(signinUser, {name: 'signinUser'}),
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }})
)(withRouter(CreateLogin))
