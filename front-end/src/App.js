import './App.css';
import Form from './Form.js';
import Login from './Login.js';
import React, { useState } from 'react';
import closedBin from './images/bin-closed.png';
import openBin from './images/bin-open.png';

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
  // array of book objects {title, author}
  const [books, setBooks] = useState([]);
  console.log(books);

  // add book to list
  const addBook = (title, author, isRead) => {
    const newBook = [...books, { title, author, isRead  }];
    setBooks(newBook);
  };

  // remove book from list
  const removeBook = (index) => {
    // console.log(index)
    setBooks(books.filter((book) => book.title !== index));
  };

  return (
    <div className='App'>
      <header className='Header'>
        {/* <Login /> */}
        <Welcome name='Nick' />
        <Form addBook={addBook} />
      </header>
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
              .map((book, index) => (
                <BookList
                  key={index}
                  index={book.title}
                  book={book}
                  removeBook={removeBook}
                />
              ))}
          </tbody>
        </table>
      </div>
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
              .map((book, index) => (
                <BookList
                  key={index}
                  index={book.title}
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
