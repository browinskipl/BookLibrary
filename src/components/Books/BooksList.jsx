import React, { useState, useRef, useCallback } from 'react'
import useBookSearch from "./../../hooks/useBookSearch";
import Book from './Book';
import MultiLingualContent from "../../utility/multilingualContent";

export default function BooksList() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const elementsToLoad = 15;

  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(query, pageNumber);
  
  
  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + elementsToLoad);
      }
    })
    if (node) {
      observer.current.observe(node);
    };
  }, [loading, hasMore]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <>
    <div>
      <MultiLingualContent contentID="lookForBook" />
      <input type="text" value={query} onChange={handleSearch}></input>
    </div>

      <div className='books__list'>
        {books.map((book, index) => {
        if (books.length === index + 1) {
          return <Book key={index} lastBookElementRef={lastBookElementRef} id={book.id} title={book.volumeInfo.title} description={book?.searchInfo?.textSnippet} year={book.volumeInfo.publishedDate} picture={book.volumeInfo?.imageLinks?.thumbnail} />
        } else {
          return <Book key={index} id={book.id} title={book.volumeInfo.title} description={book?.searchInfo?.textSnippet} year={book.volumeInfo.publishedDate} picture={book.volumeInfo?.imageLinks?.thumbnail} />
        }
       })}
      </div>

      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}
