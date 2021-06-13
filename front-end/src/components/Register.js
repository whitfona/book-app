import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Register() {
  const [emailReg, setEmailReg] = useState('');
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [passwordVerify, setPasswordVerify] =   useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const register = (e) => {
    e.preventDefault();

    if (!emailReg) {
      setError(true);
      setMessage('Please enter email');
    } else if (!usernameReg) {
      setError(true);
      setMessage('Please enter username');
    }  else if (!passwordReg) {
      setError(true);
      setMessage('Please enter a password');
    } else if (passwordReg !== passwordVerify) {
      setError(true);
      setMessage('Passwords must match')
    }
    else {
      registerUser()
    }
  };

  const registerUser = () => {
        axios.post('/register', {
          username: usernameReg,
          password: passwordReg,
          email: emailReg,
        })
        .then((res) => {
          if (res.status === 200) {
            setError(false);
            setMessage('Registration Successful!');
            setEmailReg('')
            setUsernameReg('')
            setPasswordReg('')
            setPasswordVerify('')
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setError(true);
            setMessage('Username already exists!');
          } else {
            setError(true);
            setMessage('Registration Unsuccessful');
          }
        });
  }
  // message disappears after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setMessage();
    }, 3000);
    return 
  }, [message]);

  return (
    <form className='form-padding' onSubmit={register}>
      <h1>Register</h1>
      {message && (
        <h2 className={`message ${error ? 'error' : 'success'}`}>{message}</h2>
      )}
      <input
        type='email'
        name='email'
        value={emailReg}
        placeholder='Email...'
        onChange={(e) => {
          setEmailReg(e.target.value);
        }}
      />
      <input
        type='text'
        name='username'
        value={usernameReg}
        placeholder='Username...'
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}
      />
      <input
        type='password'
        name='password'
        value={passwordReg}
        placeholder='Password...'
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      />
      <input
        type='password'
        name='passwordVerify'
        value={passwordVerify}
        placeholder='Retype Password...'
        onChange={(e) => {
          setPasswordVerify(e.target.value);
        }}
      />
      <input type='submit' name='submit' value='Register' />
    </form>
  );
}

export default Register;
