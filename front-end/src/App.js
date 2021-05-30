import './App.css';
import axios from 'axios';
import Form from './Form.js';
// import Login from './Login.js';
import React, { useState, useEffect } from 'react';
import closedBin from './images/bin-closed.png';
import openBin from './images/bin-open.png';

// Title
function Welcome(props) {
  return <h1>{props.name}'s Book List</h1>;
}

function BookList({ book, index, removeBook }) {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author} </td>
      <td className='table-icon' onClick={() => removeBook(index)}>
        <img
          className='trash-can'
          src={closedBin}
          alt='Closed Trash Bin'
          onMouseOver={(e) => (e.currentTarget.src = openBin)}
          onMouseLeave={(e) => (e.currentTarget.src = closedBin)}
        />
      </td>
    </tr>
  );
}

function App() {
  // array of book objects {title, author, isRead}
  const [books, setBooks] = useState([]);
  // messages for errors or book submission
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  // get books from api
  useEffect(() => {
    axios.get('/book-list').then((books) => setBooks(books.data));
    // return () => {
    //   To Do, add clean up function
    // };
  }, [books]);

  // message disappears after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setMessage();
    }, 3000);
  }, [message]);

  // add book to list
  const addBook = (title, author, isRead) => {
    axios
      .post('/add-book', {
        title,
        author,
        isRead,
      })
      .then((res) => {
        if (res.status === 200) {
          setError(false);
          setMessage('Book Added!');
        }
      })
      .catch((err) => {
        setError(true);
        setMessage('Error! Book not added.');
      });
  };

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
    <div className='App'>
      <header className='Header'>
        {/* <Login /> */}
        <Welcome name='Nick' />
        <Form addBook={addBook} />
        {message && (
          <h2 className={`message ${error ? 'error' : 'success'}`}>
            {message}
          </h2>
        )}
      </header>
      <div className='To-Read-Books'>
        <h2>Books to Read</h2>
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
      <footer>
        <p>
          <a href='https://www.whitforddesign.ca' title='Whitford Design'>
            &#169; Whitford Design | 2021
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
