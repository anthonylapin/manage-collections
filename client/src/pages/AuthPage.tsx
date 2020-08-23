import React, {useContext, useEffect} from 'react'
import {LoginForm} from "../components/LoginForm"
import {AuthContext} from "../context/AuthContext"
import {useHttp} from "../hooks/http.hook"
import {SignInWithGoogleButton} from "../components/SignInWithGoogleButton";

export const AuthPage: React.FC = () => {
    const auth = useContext(AuthContext)
    const {loading, request, clearError} = useHttp()

    useEffect(() => {
        clearError()
    }, [clearError])

    const loginHandler = async (email: string, password: string) => {
        try {
            const data = await request('/api/auth/signin', 'POST', {email, password})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    const responseSuccessGoogle = async (res: any) => {
        try {
            const data = await request('/api/auth/googlelogin', 'POST', {tokenId: res.tokenId})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    const responseFailureGoogle = () => {

    }
   return (
       <div>
           <div className="text-center">
               <h4>Auth Page</h4>
           </div>
           <LoginForm onLogin={loginHandler} loading={loading} />
           <SignInWithGoogleButton
               responseSuccessGoogle={responseSuccessGoogle}
               responseFailureGoogle={responseFailureGoogle}
           />
       </div>
   )
}