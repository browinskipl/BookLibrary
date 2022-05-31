import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { LanguageContext } from "./multilingualContext";
import PropTypes from 'prop-types';

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const { language } = useContext(LanguageContext);
  let lang = '';

  if(language && language === 'english') {
    lang = 'en';
  } else {
    lang = 'pl';
  }

  useEffect(() => {
    setBooks([])
  }, [query, lang])

  useEffect(() => {
    if(query.length > 1) {
      setLoading(true);
      let cancel;
      axios({
        method: 'GET',
        url: 'https://www.googleapis.com/books/v1/volumes',
        params: { q: query, startIndex: pageNumber, maxResults: 15, langRestrict: lang },
        cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res => {
        setBooks(prevBooks => {
          return [...prevBooks, ...res.data.items];
        })
        setHasMore(res.data.items.length > 0);
        setLoading(false);
      }).catch(e => {
        if (axios.isCancel(e)) return;
        setError(true);
      })
      return () => cancel()
    }
    // eslint-disable-next-line
  }, [query, pageNumber, lang])

  return { loading, error, books, hasMore } 
}

useBookSearch.propTypes = {
  query: PropTypes.string,
  pageNumber: PropTypes.number
}