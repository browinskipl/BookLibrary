import { useContext } from "react";
import { LanguageContext } from "../hooks/multilingualContext";
import { translations } from "../languages/translations";

export default function MultilingualContent({ contentID }) {
  const { language } = useContext(LanguageContext);

  return translations[language][contentID];
}