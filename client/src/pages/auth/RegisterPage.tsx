import React, { useContext, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useHistory } from "react-router-dom";
import { RegisterForm } from "../../components/auth/RegisterForm";
import { ThemeContext } from "styled-components";
import { darkTheme } from "../../components/themes/Themes";
import { TranslateContext } from "../../context/TranslateContext";

export const RegisterPage = () => {
  const history = useHistory();
  const { loading, request, clearError } = useHttp();
  const isDark = useContext(ThemeContext) === darkTheme;
  const { dictionary } = useContext(TranslateContext);

  useEffect(() => {
    clearError();
  }, [clearError]);

  function changeRouteToSignIn() {
    history.push("/");
  }

  const registerHandler = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      await request("/api/auth/signup", "POST", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      changeRouteToSignIn();
    } catch (e) {}
  };

  return (
    <div>
      <div className="text-center">
        <h4>{dictionary.Registration}</h4>
      </div>
      <RegisterForm
        loading={loading}
        onRegister={registerHandler}
        isDark={isDark}
      />
    </div>
  );
};
