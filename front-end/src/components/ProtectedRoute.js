import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ loggedin, children, ...rest }) {
  return (
    <Route {...rest} render={({ location }) => {
      return loggedin 
        ? children 
        : <Redirect to={{
          pathname: '/',
          state: { from: location }
        }} />
    }}
    />
  )
}

export default ProtectedRoute
