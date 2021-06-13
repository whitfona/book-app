import React from 'react';

function WelcomeMessage(props) {
  return <h1 className='welcome-msg'>{props?.name} Reading List</h1>;
}

export default WelcomeMessage;
