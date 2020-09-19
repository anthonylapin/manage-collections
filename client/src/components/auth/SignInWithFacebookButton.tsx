import React from "react";
import FacebookLogin from "react-facebook-login";
import { ILoginFacebook } from "../../interfaces/common";

export const SignInWithFacebookButton: React.FC<ILoginFacebook> = ({
  responseFacebook,
  className,
}) => {
  return (
    <FacebookLogin
      appId="710002972886821"
      autoLoad={false}
      callback={responseFacebook}
      cssClass={className}
    />
  );
};
