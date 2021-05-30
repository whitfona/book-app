import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [emailReg, setEmailReg] = useState('');

  const register = (e) => {
    e.preventDefault();

    if (!usernameReg) {
      alert('Username is Required');
    }
    if (!passwordReg) {
      alert('Password is Required');
    }
    if (!emailReg) {
      alert('Email is Required');
    }
    // TO DO: add check for email verification
    else {
      axios
        .post('/register', {
          username: usernameReg,
          password: passwordReg,
          email: emailReg,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      setUsernameReg('');
      setPasswordReg('');
      setEmailReg('');
    }
  };

  //   const register = () => {
  //     axios
  //       .post('/register', {
  //         username: usernameReg,
  //         password: passwordReg,
  //         email: emailReg,
  //       })
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   };

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
        type='text'
        name='password'
        placeholder='Password...'
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      />
      <input
        type='text'
        name='passwordVerify'
        placeholder='Retype Password...'
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      />
      <input type='submit' name='submit' value='Submit' />
    </form>
  );
}

export default Register;
