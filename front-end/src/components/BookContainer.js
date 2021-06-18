// import './App.css';
import axios from 'axios';
import BookList from './BookList';
// import AddBookForm from './AddBookForm';
import React, { useState, useEffect } from 'react';
import AddBookForm from './AddBookForm';
// import Message from './Message'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import closedBin from './images/bin-closed.png';
// import openBin from './images/bin-open.png';

function BookContainer() {
  // // array of book objects {title, author, isRead}
  const [books, setBooks] = useState([]);
  // // messages for errors or book submission
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  // get books from api
  useEffect(() => {
    axios.get('/book-list').then((books) => setBooks(books.data));
    // return () => {
    //   To Do, add clean up function
    // };
  }, [message]);

  // message disappears after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setMessage();
    }, 3000);
  }, [message]);

  const removeBook = (index) => {
    axios
      .delete('/delete-book', { data: { index: index } })
      .then((res) => {
        if (res.status === 200) {
          setError(false);
          setMessage('Book Deleted!');
        }
      })
      .catch((err) => {
        setError(true);
        setMessage('Error! Book not deleted.');
        // console.log(err);
      });
  };

  return (
    <div>
      <AddBookForm setError={setError} setMessage={setMessage} />
      {message && (
        <h2 className={`message ${error ? 'error' : 'success'}`}>{message}</h2>
      )}
      {/* <Message /> */}
      <div className='To-Read-Books'>
        <h2>Books to Read</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books
              .filter((book) => !book.isRead)
              .reverse()
              .map((book, index) => (
                <BookList
                  key={index}
                  index={book.id}
                  book={book}
                  removeBook={removeBook}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div className='Read-Books'>
        <h2>Read Books</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books
              .filter((book) => book.isRead)
              .reverse()
              .map((book, index) => (
                <BookList
                  key={index}
                  index={book.id}
                  book={book}
                  removeBook={removeBook}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookContainer;
