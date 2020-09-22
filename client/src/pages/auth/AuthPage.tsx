import React, { useContext, useEffect } from "react";
import { LoginForm } from "../../components/auth/LoginForm";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { SignInWithGoogleButton } from "../../components/auth/SignInWithGoogleButton";
import { OrComponent } from "../../components/common/OrComponent";
import { SignInWithFacebookButton } from "../../components/auth/SignInWithFacebookButton";
import { ThemeContext } from "styled-components";
import { darkTheme } from "../../components/themes/Themes";
import { TranslateContext } from "../../context/TranslateContext";

export const AuthPage: React.FC = () => {
  const { dictionary } = useContext(TranslateContext);
  const isDark = useContext(ThemeContext) === darkTheme;
  const auth = useContext(AuthContext);
  const { loading, request, clearError } = useHttp();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const loginHandler = async (email: string, password: string) => {
    try {
      const data = await request("/api/auth/signin", "POST", {
        email,
        password,
      });
      auth.login(data.token, data.userId, data.isSuperuser, data.isBlocked);
    } catch (e) {
      window.alert(e.message);
    }
  };

  const responseSuccessGoogle = async (res: any) => {
    try {
      const data = await request("/api/auth/googlelogin", "POST", {
        tokenId: res.tokenId,
      });
      auth.login(data.token, data.userId, data.isSuperuser, data.isBlocked);
    } catch (e) {
      window.alert(e.message);
    }
  };

  const responseFailureGoogle = () => {
    alert(dictionary.somethingWentWrong);
  };

  const responseFacebook = async (res: any) => {
    try {
      const data = await request("/api/auth/facebooklogin", "POST", {
        accessToken: res.accessToken,
        userID: res.userID,
      });
      auth.login(data.token, data.userId, data.isSuperuser, data.isBlocked);
    } catch (e) {
      window.alert(e.message);
    }
  };

  return (
    <div>
      <div className="text-center">
        <h4>{dictionary.signIn}</h4>
      </div>
      <LoginForm isDark={isDark} onLogin={loginHandler} loading={loading} />
      <OrComponent />
      <div className="text-center social-btn">
        <SignInWithGoogleButton
          responseSuccessGoogle={responseSuccessGoogle}
          responseFailureGoogle={responseFailureGoogle}
          className={isDark ? "btn btn-outline-danger" : "btn btn-danger"}
        />
        <SignInWithFacebookButton
          responseFacebook={responseFacebook}
          className={isDark ? "btn btn-outline-primary" : "btn btn-primary"}
        />
      </div>
    </div>
  );
};
