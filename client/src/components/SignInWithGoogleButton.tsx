import React from 'react'
import { GoogleLogin } from 'react-google-login'

export const SignInWithGoogleButton: React.FC = () => {
    return (
        <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}