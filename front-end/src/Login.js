import React from 'react';

function Login() {
  return (
    <form className='login-form'>
      <h1>Please Log In</h1>
      <input
        type='text'
        name='username'
        //   value={username}
        placeholder='Username...'
        //   onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        name='password'
        //   value={author}
        placeholder='Password...'
        //   onChange={(e) => setAuthor(e.target.value)}
      />
      <input type='submit' name='submit' value='Submit' />
    </form>
  );
}

export default Login;
