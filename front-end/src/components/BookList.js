import React from 'react';
import closedBin from '../images/bin-closed.png';
import openBin from '../images/bin-open.png';

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

export default BookList;
