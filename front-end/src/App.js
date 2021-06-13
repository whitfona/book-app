import './App.css';
// import axios from 'axios';
import Navbar from './components/Navbar';
import WelcomeMessage from './components/WelcomeMessage';
import Register from './components/Register';
import Login from './components/Login.js';
// import AddBookForm from './components/AddBookForm';
import BookContainer from './components/BookContainer'
// import BookList from './components/BookList'
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import closedBin from './images/bin-closed.png';
// import openBin from './images/bin-open.png';


function App() {
  const [loggedin] = useState(false)
  
  return (
    <div className='App'>
        <Router>
          <Navbar loggedin={loggedin} />
          { loggedin ? <WelcomeMessage name="Nick's" /> : <WelcomeMessage />}
          <Switch>
            <Route exact path='/' component={Login} />
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
