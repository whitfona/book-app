import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  // axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   getLoggedInUser()
  //   // axios.get('/login')
  //   // .then((res) => {
  //   //   if (res.data.loggedIn === true) {
  //   //     setLoginStatus(res.data.user[0].username);
  //   //   }
  //   // })
  //   return () => {
  //     setUsernameLogin('')
  //     setPasswordLogin('')
  //     setLoginStatus('')
  //   }
  // }, [loginStatus])

  //   const getLoggedInUser = async () => {
  //   try {
  //     await axios.get('/login')
  //       .then((res) => {
  //       if (res.data.loggedIn === true) {
  //         setLoginStatus(res.data.user[0].username);
  //       }
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const login = (e) => {
    e.preventDefault();
    axios
      .post('/login', {
        username: usernameLogin,
        password: passwordLogin,
      })
      .then((res) => {
        if (res.data.message) {
          setLoginStatus(res.data.message);
        } else {
          setLoginStatus(res.data[0].username);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className='form-padding' onSubmit={login}>
      <h1>Please Log In</h1>
      <input
        type='text'
        name='username'
        placeholder='Username...'
        onChange={(e) => {
          setUsernameLogin(e.target.value);
        }}
      />
      <input
        type='password'
        name='password'
        placeholder='Password...'
        onChange={(e) => {
          setPasswordLogin(e.target.value);
        }}
      />
      <input type='submit' name='submit' value='Login' onClick={login} />
      <h4>{loginStatus}</h4>
    </form>
  );
}

export default Login;
