import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Register() {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [passwordVerify, setPasswordVerify] =   useState('');
  const [emailReg, setEmailReg] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const register = (e) => {
    e.preventDefault();

    if (!usernameReg) {
      setError(true);
      setMessage('Please enter a username');
    } else if (!emailReg) {
      setError(true);
      setMessage('Please enter an email');
    } else if (!passwordReg) {
      setError(true);
      setMessage('Please enter a password');
    } else if (passwordReg !== passwordVerify) {
      setError(true);
      setMessage('Passwords must match')
    }
    else {
      // registerUser()
      axios
        .post('/register', {
          username: usernameReg,
          password: passwordReg,
          email: emailReg,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            setError(false);
            setMessage('Registration Successful!');

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
      setUsernameReg('');
      setPasswordReg('');
      setEmailReg('');
    }
  };

  // const registerUser = async () => { 
  //   await axios
  //       .post('/register', {
  //         username: usernameReg,
  //         password: passwordReg,
  //         email: emailReg,
  //       })
  //       .then((res) => {
  //         // console.log(res);
  //         if (res.status === 200) {
  //           setError(false);
  //           setMessage('Registration Successful!');

  //         }
  //       })
  //       .catch((err) => {
  //         if (err.response.status === 409) {
  //           setError(true);
  //           setMessage('Username already exists!');
  //         } else {
  //           setError(true);
  //           setMessage('Registration Unsuccessful');
  //         }
  //       });
  //     setUsernameReg('');
  //     setPasswordReg('');
  //     setEmailReg('');
  // }

  // useEffect(() => {
  //   registerUser()
  // });

  // message disappears after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setMessage();
    }, 3000);
    return () => {
      setMessage('Error')
    }
  }, [message]);

  return (
    <form className='form-padding' onSubmit={register}>
      <h1>Register</h1>
      <input
        type='email'
        name='email'
        placeholder='Email...'
        onChange={(e) => {
          setEmailReg(e.target.value);
        }}
      />
      <input
        type='text'
        name='username'
        placeholder='Username...'
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}
      />
      <input
        type='password'
        name='password'
        placeholder='Password...'
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      />
      <input
        type='password'
        name='passwordVerify'
        placeholder='Retype Password...'
        onChange={(e) => {
          setPasswordVerify(e.target.value);
        }}
      />
      <input type='submit' name='submit' value='Register' />
      {message && (
        <h2 className={`message ${error ? 'error' : 'success'}`}>{message}</h2>
      )}
    </form>
  );
}

export default Register;
