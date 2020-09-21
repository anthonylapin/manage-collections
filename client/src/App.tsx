import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import { Navbar } from "./components/common/Navbar";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Loader } from "./components/common/Loader";
import { SearchProvider } from "./context/SearchContext";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/themes/globalStyles";
import { lightTheme, darkTheme } from "./components/themes/Themes";
import { useDarkMode } from "./hooks/darkMode.hook";
import { TranslateContext } from "./context/TranslateContext";
import { useLocale } from "./hooks/locale.hook";

const App: React.FC = () => {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  const { theme, themeToggler, mountedComponent } = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const {
    locale,
    localeToggler,
    dictionary,
    translatedComponent,
  } = useLocale();

  if (!ready) {
    return <Loader />;
  }

  if (!mountedComponent || !translatedComponent) {
    return <div />;
  }

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <TranslateContext.Provider value={{ locale, dictionary }}>
          <AuthContext.Provider
            value={{ token, login, logout, userId, isAuthenticated }}
          >
            <SearchProvider>
              <BrowserRouter>
                <Navbar
                  isAuthenticated={isAuthenticated}
                  onThemeToggle={themeToggler}
                  onLocaleToggle={localeToggler}
                />
                <div className="container">{routes}</div>
              </BrowserRouter>
            </SearchProvider>
          </AuthContext.Provider>
        </TranslateContext.Provider>
      </>
    </ThemeProvider>
  );
};

export default App;
