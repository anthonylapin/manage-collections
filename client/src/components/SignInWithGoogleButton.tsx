import React from 'react'
import { GoogleLogin } from 'react-google-login'

interface ILoginGoogle {
    responseSuccessGoogle: (res: any) => void,
    responseFailureGoogle: () => void
}

export const SignInWithGoogleButton: React.FC<ILoginGoogle> = ({responseSuccessGoogle, responseFailureGoogle}) => {
    return (
        <GoogleLogin
            clientId="997018043744-pmlk5mtt5tvh529irf8071vptk13ggd1.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}