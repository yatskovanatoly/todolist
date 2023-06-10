import React, { PropsWithChildren, createContext, useCallback, useState } from "react";
import { IntlProvider } from "react-intl";
import en from "../lang/en.json";
import fr from "../lang/fr.json";
import ru from "../lang/ru.json";

const defaultLocale = en

export const Context = createContext<LocaleContext>({ locale: 'en', selectLanguage: () => {} });

const langs: Record<string, Messages> = {
  ru,
  en,
  fr
}

const Localisation: React.FC<PropsWithChildren> = ({ children }) => {
  const userLocale = navigator.language;
  const [locale, setLocale] = useState<string>(userLocale);
  const selectLanguage = useCallback((locale: string) => {
    if (langs[locale]) setLocale(locale)
  }, [])

  const messages  = langs[locale] || defaultLocale

  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};

type Messages = typeof defaultLocale
type LocaleContext = {
  locale: string;
  selectLanguage: (locale: string) => void;
}

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof Messages
    }
  }
}

export default Localisation;
