import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ loggedin, children, ...rest }) {
  return (
    <Route {...rest} render={() => {
      return loggedin ? children : <Redirect to='/' />
    }}
    />
  )
}

export default ProtectedRoute
