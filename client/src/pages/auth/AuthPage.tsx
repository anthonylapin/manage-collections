import React, { useContext, useEffect } from "react";
import { LoginForm } from "../../components/auth/LoginForm";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { SignInWithGoogleButton } from "../../components/auth/SignInWithGoogleButton";
import { OrComponent } from "../../components/common/OrComponent";
import { SignInWithFacebookButton } from "../../components/auth/SignInWithFacebookButton";
import { ThemeContext } from "styled-components";
import { darkTheme } from "../../components/themes/Themes";

export const AuthPage: React.FC = () => {
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
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  const responseSuccessGoogle = async (res: any) => {
    try {
      const data = await request("/api/auth/googlelogin", "POST", {
        tokenId: res.tokenId,
      });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  const responseFailureGoogle = () => {
    alert("Something went wrong");
  };

  const responseFacebook = async (res: any) => {
    try {
      const data = await request("/api/auth/facebooklogin", "POST", {
        accessToken: res.accessToken,
        userID: res.userID,
      });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div>
      <div className="text-center">
        <h4>Sign in</h4>
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
