import React from 'react';

function WelcomeMessage({ name, loggedin }) {
  return loggedin
    ? <h1 className='welcome-msg'>{name}'s Reading List</h1>
    : <h1 className='welcome-msg'>Reading List</h1>;
}

export default WelcomeMessage;
