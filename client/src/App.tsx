import React from 'react'
import { BrowserRouter } from "react-router-dom"
import { useRoutes } from "./routes"
import { Navbar } from './components/Navbar'

const App: React.FC = () => {
    const routes = useRoutes(false)
    return (
        <BrowserRouter>
            <Navbar isAuthenticated={false} />
            <div className="container">
                {routes}
            </div>
        </BrowserRouter>
    )
}

export default App