import React, { useState } from 'react';

function Form({ addBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [read, setRead] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return;
    // check for status of drop down menu
    let isRead = 1;
    if (read === 'to-read') {
      isRead = 0;
    }
    addBook(title, author, isRead);
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
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

export default Form;
