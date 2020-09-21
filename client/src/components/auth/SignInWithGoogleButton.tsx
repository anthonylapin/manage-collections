import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { TranslateContext } from "../../context/TranslateContext";
import { ILoginGoogle } from "../../interfaces/common";

export const SignInWithGoogleButton: React.FC<ILoginGoogle> = ({
  responseSuccessGoogle,
  responseFailureGoogle,
  className,
}) => {
  const { dictionary } = useContext(TranslateContext);
  return (
    <GoogleLogin
      clientId="997018043744-pmlk5mtt5tvh529irf8071vptk13ggd1.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      render={(renderProps) => (
        <button onClick={renderProps.onClick} className={className}>
          {dictionary.loginWithGoogle}
        </button>
      )}
      onSuccess={responseSuccessGoogle}
      onFailure={responseFailureGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};
