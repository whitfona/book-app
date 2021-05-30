import React, { useState } from 'react';
import axios from 'axios';

function AddBookForm({ setError, setMessage}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [read, setRead] = useState('');

  const addBook = (e) => {
    e.preventDefault();
    if (!title || !author) return;
    // check for status of book as 'read' (1) or 'to-read' (0)
    let isRead = 1;
    if (read === 'to-read') {
      isRead = 0;
    }
    
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
      
    setTitle('');
    setAuthor('');
  };

  return (
    <form className='form-padding' onSubmit={addBook}>
      <input
        type='text'
        name='bookTitle'
        value={title}
        placeholder='Title...'
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        name='BookAuthor'
        value={author}
        placeholder='Author...'
        onChange={(e) => setAuthor(e.target.value)}
      />
      <div className='flex-container'>
        <select onChange={(e) => setRead(e.target.value)}>
          <option value='read'>Read</option>
          <option value='to-read'>To Read</option>
        </select>
        <input type='submit' name='submit' value='Submit' />
      </div>
    </form>
  );
}

export default AddBookForm;
