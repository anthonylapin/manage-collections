import React from 'react'
import { BrowserRouter } from "react-router-dom"
import { useRoutes } from "./routes"
import { Navbar } from './components/common/Navbar'
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./context/AuthContext";

const App: React.FC = () => {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{token, login, logout, userId}}>
            <BrowserRouter>
                <Navbar isAuthenticated={isAuthenticated} />
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App