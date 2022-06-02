import React, { useState } from 'react'
import { limitCharacters } from "./../../helpers/limitCharacters";
import MultiLingualContent from "../../utility/multilingualContent";
import PropTypes from 'prop-types';

function Book({lastBookElementRef, id, title, description, year, picture}) {
  
  const [book, setBook] = useState();
  const [warning, setWarning] = useState(false);
  const savedClass = 'book--saved';
  const localStorageName = 'books';

  const getBooksLocalStorage = () => {
    const storedBooks = JSON.parse(localStorage.getItem(localStorageName));

    if(storedBooks) {
      return storedBooks;
    }
  }

  const getBookLocalStorage = (id) => {
    const books = getBooksLocalStorage();

    if(books && books.includes(id)) {
      return id;
    }
  }
  const handleSaveBook = (id, e) => {
    if(getBookLocalStorage(id)) {
      displayWarning();
    } else {
      setBookLocalStorage(id);
      addClass(e);
      setBook(id);
    }
  }
  
  const setBookLocalStorage = (id) => {
    const storedBooks = getBooksLocalStorage();
    
    if(storedBooks) {
      const newStoredBooksArray = [...storedBooks, id];
      
      localStorage.setItem(localStorageName, JSON.stringify(newStoredBooksArray));
    } else {
      const storedBooksArray = [id];

      localStorage.setItem(localStorageName, JSON.stringify(storedBooksArray));
    }
  }

  const removeBookLocalStorage = (id, e) => {
    removeClass(e);
    const storedBooks = getBooksLocalStorage();

    const filteredItems = storedBooks.filter(item => item !== id);
    
    localStorage.removeItem(localStorageName);
    localStorage.setItem(localStorageName, JSON.stringify(filteredItems));
  }

  const displayWarning = () => {
    setWarning(true);
    setTimeout(() => setWarning(false), 3000);
  }

  const addClass = (e) => {
    const elementClassList = e.target.parentNode.parentNode.classList;

    if(!elementClassList.contains(savedClass)) {
      elementClassList.add(savedClass);
    }
  }

  const removeClass = (e) => {
    const elementClassList = e.target.parentNode.parentNode.classList;

    if(elementClassList.contains(savedClass)) {
      elementClassList.remove(savedClass);
    }
  }

  return (
    <>
    { warning ? <MultiLingualContent contentID="warning" /> : ''}
    <div ref={lastBookElementRef} className="book">
      <div>
        <img src={picture} alt="Logo"/>
      </div>
      <div className='book__info'>
        {title && <h2>{title}</h2>}
        {year && <span>({year})</span>}
        {/* Instead of using dangerouslySetInnerHTML I could write HTML parser */}
        {description && <p dangerouslySetInnerHTML={{ __html: limitCharacters(description ? description : null) }}></p>}
        <button onClick={(e) => handleSaveBook(id, e)}> <MultiLingualContent contentID="save" /></button>
        <button onClick={(e) => removeBookLocalStorage(id, e)}> <MultiLingualContent contentID="remove" /></button>
      </div>
    </div>
    </>
  )
}

Book.propTypes = {
  lastBookElementRef: PropTypes.func,
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  year: PropTypes.string,
  picture: PropTypes.string,
}

export default Book