import React from 'react';
import closedBin from '../images/bin-closed.png';
import openBin from '../images/bin-open.png';
// import edit from '../images/pencil.png';
// import editHover from '../images/edit.png';

function BookList({ book, index, removeBook }) {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author} </td>
      {/* <td className='table-icon' onClick={() => getBookToEdit(book)}>
          <img
          className='icon'
          src={edit}
          alt='Edit Button'
          onMouseOver={(e) => (e.currentTarget.src = editHover)}
          onMouseLeave={(e) => (e.currentTarget.src = edit)}
        />
      </td> */}
      <td className='table-icon' onClick={() => removeBook(index)}>
        <img
          className='icon'
          src={closedBin}
          alt='Delete Trash Bin'
          onMouseOver={(e) => (e.currentTarget.src = openBin)}
          onMouseLeave={(e) => (e.currentTarget.src = closedBin)}
        />
      </td>
    </tr>
  );
}

export default BookList;
