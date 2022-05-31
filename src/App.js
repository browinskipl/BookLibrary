import React, {useState} from 'react'
import Home from './Pages/Home'
import "./design/styles.css"
import { LanguageContext } from "./hooks/multilingualContext";

export default function App() {
  const [language, setLanguage] = useState("english");

  function switchLanguage() {
    setLanguage((language) => (language === "english" ? "polski" : "english"));
  }

  return (
    <>
      <LanguageContext.Provider value={{ language, switchLanguage }}>
        <Home/>
      </LanguageContext.Provider>
    </>
  )
}
