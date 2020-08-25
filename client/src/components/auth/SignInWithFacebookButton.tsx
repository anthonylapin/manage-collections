import React from 'react'
import FacebookLogin from 'react-facebook-login'

interface ILoginFacebook {
    responseFacebook: (res: any) => void,
}

export const SignInWithFacebookButton: React.FC<ILoginFacebook> = ({responseFacebook}) => {
    return (
        <FacebookLogin
            appId="710002972886821"
            autoLoad={false}
            callback={responseFacebook}
            cssClass="btn btn-primary"
        />
    )
}