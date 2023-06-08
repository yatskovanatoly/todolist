import React, { createContext, useState } from "react";
import { IntlProvider } from "react-intl";
import French from "../lang/fr.json";
import English from "../lang/en.json";
import Russian from "../lang/ru.json";

export const Context = createContext<{
  locale: string;
  selectLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}>({ locale: "", selectLanguage: () => {} });

const userLocale = navigator.language;
let lang: Record<string, string> = {};
if (userLocale === "en") {
  lang = English;
} else if (userLocale === "fr") {
  lang = French;
} else if (userLocale === "ru") {
  lang = Russian;
} else {
  lang = English;
}

interface LocalisationProps {
  children: React.ReactNode;
}

const Localisation: React.FC<LocalisationProps> = ({ children }) => {
  const [locale, setLocale] = useState<string>(userLocale);
  const [messages, setMessages] = useState<Record<string, string>>(lang);

  function selectLanguage(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    setLocale(newLocale);
    if (newLocale === "en") {
      setMessages(English);
    } else if (newLocale === "fr") {
      setMessages(French);
    } else if (newLocale === "ru") {
      setMessages(Russian);
    } else {
      setMessages(English);
    }
  }

  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Localisation;
