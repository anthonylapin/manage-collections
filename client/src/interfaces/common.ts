export interface INavbarProps {
    isAuthenticated: boolean
}

export interface ICreateCollection {
    topics: ITopic[]
}

export interface ITopic {
    id: string,
    name: string
}

export interface ILoginForm {
    loading: boolean,
    onLogin: (email: string, password: string) => void
}

export interface IRegisterForm {
    loading: boolean,
    onRegister: (firstName: string, lastName: string, email: string, password: string) => void
}

export interface ILoginFacebook {
    responseFacebook: (res: any) => void,
}

export interface ILoginGoogle {
    responseSuccessGoogle: (res: any) => void,
    responseFailureGoogle: () => void
}

export interface IAuthContext {
    token: string | null,
    userId: string | null,
    login: (jwtToken: string, id: string) => void,
    logout: () => void,
    isAuthenticated?: boolean
}