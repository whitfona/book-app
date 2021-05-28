const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const hostname = '127.0.0.1';


// create database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect();

// get all data from database

app.get('/', (req, res) => {
  // res.send('Hello there!');
  connection.query('SELECT * FROM `Book_List`', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

// set up listening port
app.listen(PORT, hostname, () =>
  console.log(`Server running on http://${hostname}:${PORT}`)
);
