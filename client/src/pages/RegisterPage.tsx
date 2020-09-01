import React, { useEffect } from "react";
import { RegisterForm } from "../components/auth/RegisterForm";
import { useHttp } from "../hooks/http.hook";
import { useHistory } from "react-router-dom";

export const RegisterPage = () => {
  const history = useHistory();
  const { loading, request, clearError } = useHttp();

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
        <h4>Registration</h4>
      </div>
      <RegisterForm loading={loading} onRegister={registerHandler} />
    </div>
  );
};
