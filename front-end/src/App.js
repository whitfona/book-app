import './App.css';
import axios from 'axios';
import Form from './Form.js';
// import Login from './Login.js';
import React, { useState, useEffect } from 'react';
import closedBin from './images/bin-closed.png';
import openBin from './images/bin-open.png';

function Welcome(props) {
  return <h1>{props.name}'s Book List</h1>;
}

function Message(props) {
  return props.success ? <h3 className="message success">Your Book Was Added!</h3> : <h3 className="message error">Error! Your Book Was Not Added.</h3>
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
  // array of book objects {title, author}
  const [books, setBooks] = useState([]);
  // console.log(books);

  // get books from api
  useEffect(() => {
    axios.get('/book-list')
      .then((books) => setBooks(books.data));
    // return () => {
    //   To Do, add clean up function
    // };
  }, [books]);

  // add book to list
  const addBook = (title, author, isRead) => {
    axios.post('/add-books', {
      title,
      author,
      isRead,
    })
    .then(alert('Book added!'))
    .catch(err => alert('ERROR BOOK NOT ADDED!'));
      // .then(res => {
      //   console.log(res);
      //   console.log(res.data);
      // })
  };

  const removeBook = (index) => {
    axios.delete('/delete-book', { data:  { index: index } } )
  }

  return (
    <div className='App'>
      <header className='Header'>
        {/* <Login /> */}
        <Welcome name='Nick' />
        <Form addBook={addBook} />
        <Message />
      </header>
      <div className='To-Read-Books'>
        <h2>To Read Books</h2>
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
        <p>&#169; Whitford Design | 2021</p>
      </footer>
    </div>
  );
}

export default App;
