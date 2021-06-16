import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import WelcomeMessage from './components/WelcomeMessage';
import Register from './components/Register';
import Login from './components/Login.js';
// import AddBookForm from './components/AddBookForm';
import BookContainer from './components/BookContainer'
// import BookList from './components/BookList'
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';
// import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import closedBin from './images/bin-closed.png';
// import openBin from './images/bin-open.png';


function App() {
  const [loggedin, setLoggedin] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
  axios.get('/login')
    .then((res) => {
      if (res.data.authenticated) {
        setLoggedin(true)
      }
    })
    .catch((err) => {
      console.log(err)
    })
    // TO DO... clean up function
    //  return () => setAuth(false)
  }, [user])

  return (
    <div className='App'>
        <Router>
          <Navbar loggedin={loggedin} setLoggedin={setLoggedin}/>
          <WelcomeMessage name={user} loggedin={loggedin}/>
          <Switch>
            {/* <Route exact path='/' component={Login} /> */}
            {/* {loggedin ? <Redirect to='/book-list' /> : <Login setLoggedin={setLoggedin} setUser={setUser}/>} */}
            <Route exact path='/'>
              <Login setLoggedin={setLoggedin} setUser={setUser} loggedin={loggedin}/>
            </Route>
            <Route path='/register' component={Register} />
            <ProtectedRoute path='/book-list' loggedin={loggedin}>
              <BookContainer />
            </ProtectedRoute>
          </Switch>
        </Router>
      <Footer />
    </div>
  );
}

export default App;
