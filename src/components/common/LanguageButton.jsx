import { useContext } from "react";
import { LanguageContext } from "../../hooks/multilingualContext";
import MultiLingualContent from "../../utility/multilingualContent"

export default function LanguageButton() {
  const { language, switchLanguage } = useContext(LanguageContext);

  return (
    <>
      <MultiLingualContent contentID="currentLanguage" />
      <button onClick={switchLanguage}> {language} </button>
    </>
  );
};

