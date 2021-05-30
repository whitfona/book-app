const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const hostname = '127.0.0.1';

app.use(express.json());

// create database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect();

// get all data from database
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


// set up listening port
app.listen(PORT, hostname, () =>
  console.log(`Server running on http://${hostname}:${PORT}`)
);
