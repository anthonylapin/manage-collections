import {createContext} from 'react'

interface IAuthContext {
    token: string | null,
    userId: string | null,
    login: (jwtToken: string, id: string) => void,
    logout: () => void,
    isAuthenticated?: boolean
}

export const AuthContext = createContext<IAuthContext>({
    token: null,
    userId: null,
    login: (jwtToken: string, id: string) => {},
    logout: () => {},
    isAuthenticated: false
})
