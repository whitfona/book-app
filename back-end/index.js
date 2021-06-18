const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { createToken, validateToken } = require('./JTW')
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const hostname = '127.0.0.1';

app.set('view-engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    key: 'userId',
    secret: 'subscribe',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// create database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect();

// get all books from database
app.get('/book-list', (req, res) => {
  // res.send('Hello there!');
  connection.query('SELECT * FROM `Book_List`', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

// get single book from database
app.post('/edit-book', (req, res) => {
  connection.query(`SELECT * FROM Book_List WHERE Book_List.id = ${req.body.index}`, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.json(result);
  });
});

// edit book in database
app.put('/edit-book', (req, res) => {
  connection.query(`UPDATE Book_List SET VALUES (NULL, "${req.body.title}", "${req.body.author}", "${req.body.isRead}")`, err => {
    if(err) {
      console.log(err)
    }
    res.send('Book added');
    res.status(200);
  })
});

// add book to database
app.post('/add-book', (req, res) => {
  connection.query(`INSERT INTO Book_List VALUES (NULL, "${req.body.title}", "${req.body.author}", "${req.body.isRead}")`, err => {
    if(err) {
      console.log(err)
    }
    res.send('Book added');
    res.status(200);
  })
});

// delete book from database
app.delete('/delete-book', (req, res) => {
  connection.query(`DELETE FROM Book_List WHERE Book_List.id = ${req.body.index}`, err => {
    if (err) {
      console.log(err)
    }
    res.send(`Book Deleted`);
  });
});

// register user (add user to database)
app.post('/register', (req, res) => {
  const {username, password, email} = req.body;

  // query database to see if username already exisits
  connection.query(
    'SELECT * FROM Users WHERE username = ?',
    username,
    (err, match) => {
      if (err) {
        res.send(err);
      } else if (match.length > 0) {
        res.status(409).send({ message: 'Username already exisits' });
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          connection.query(
            'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)',
            [username, hash, email],
            (err, result) => {
              if (err) {
                res.send(err);
              }
              if (result) {
                res.status(200).send(result);
              }
            }
          );
        });
      }
    }
  );
});

app.get('/login', validateToken, (req, res) => {
  if (req.authenticated) {
    res.status(200).send({ authenticated : true })
  } else {
    res.status(400).send({ authenticated: false });
  }
});

// login user (validate user is in database)
app.post('/login', (req, res) => {
    const {username, password} = req.body;

    connection.query(
      'SELECT * FROM Users WHERE username = ?',
      username,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (err, response) => {
            if (response) {
              user = result[0]
              // res.send(user)
              console.log(user)
              
              const accessToken = createToken(user);

              res.cookie('reading-token', accessToken, {
                maxAge: 60*60*24*1000,
                httpOnly: true,
              }).send(user)
            } else {
              res.send({ message: 'Wrong username or password!' });
            }
          })
        } else {
          res.send({ message: "User doesn't exist"});
        }
      }
    );
})

app.get('/logout', (req, res) => {
  res.cookie('reading-token', '', {
    maxAge: 1
  }).send('')
});


// set up listening port
app.listen(PORT, hostname, () =>
  console.log(`Server running on http://${hostname}:${PORT}`)
);
