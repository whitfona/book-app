import './App.css';
// import axios from 'axios';
import WelcomeMessage from './components/WelcomeMessage';
import Register from './components/Register';
import Login from './components/Login.js';
// import AddBookForm from './components/AddBookForm';
import BookContainer from './components/BookContainer'
// import BookList from './components/BookList'
import Footer from './components/Footer';
// import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import closedBin from './images/bin-closed.png';
// import openBin from './images/bin-open.png';


function App() {

  return (
    <div className='App'>
        <WelcomeMessage name="Nick's" />
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/book-list' component={BookContainer} />
          </Switch>
        </Router>
      <Footer />
    </div>
  );
}

export default App;
