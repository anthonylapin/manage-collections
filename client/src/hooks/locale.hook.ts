import { useEffect, useState } from "react";
import { Locales } from "../locale/locales";
import messages from "../locale/messages";

export const useLocale = () => {
  const [locale, setLocale] = useState<string>(Locales.English);
  const [dictionary, setDictionary] = useState(messages[locale]);
  const [translatedComponent, setTranslatedComponent] = useState(false);

  const setMode = (mode: string) => {
    window.localStorage.setItem("locale", mode);
    setLocale(mode);
    setDictionary(messages[mode]);
  };

  const localeToggler = (lang: string) => {
    setMode(lang);
  };

  useEffect(() => {
    const localLocale = window.localStorage.getItem("locale");
    localLocale && setLocale(localLocale);
    localLocale && setDictionary(messages[localLocale]);
    setTranslatedComponent(true);
  }, []);
  return { dictionary, locale, localeToggler, translatedComponent };
};
