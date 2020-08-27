import React from 'react'
import { GoogleLogin } from 'react-google-login'
import {ILoginGoogle} from "../../interfaces/common"

export const SignInWithGoogleButton: React.FC<ILoginGoogle> = ({responseSuccessGoogle, responseFailureGoogle}) => {
    return (
        <GoogleLogin
            clientId="997018043744-pmlk5mtt5tvh529irf8071vptk13ggd1.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            render={renderProps => (
                <button
                    onClick={renderProps.onClick}
                    className="btn btn-danger"
                >
                    Login with Google
                </button>
            )}
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}