import React from 'react'
import BooksList from '../components/Books/BooksList';
import LanguageButton from "../components/common/LanguageButton";

function Home() {
  return (
    <>
      <LanguageButton/>
      <BooksList/>
    </>
  )
}

export default Home