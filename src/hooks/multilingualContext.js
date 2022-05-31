import { createContext } from "react";
import { translations } from "./../languages/translations";

export const LanguageContext = createContext(translations.english);