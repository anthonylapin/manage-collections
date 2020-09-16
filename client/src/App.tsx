import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import { Navbar } from "./components/common/Navbar";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Loader } from "./components/common/Loader";
import { SearchProvider } from "./context/SearchContext";

const App: React.FC = () => {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <SearchProvider>
        <BrowserRouter>
          <Navbar isAuthenticated={isAuthenticated} />
          <div className="container">{routes}</div>
        </BrowserRouter>
      </SearchProvider>
    </AuthContext.Provider>
  );
};

export default App;
