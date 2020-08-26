import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage"
import {RegisterPage} from "./pages/RegisterPage"
import { MainPage } from './pages/MainPage'


export const useRoutes = (isAuthenticated: boolean) => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <MainPage />
                </Route>
                <Route path="/add/collection">

                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/signin" exact>
                <AuthPage />
            </Route>
            <Route path="/signup" exact>
                <RegisterPage />
            </Route>
            <Redirect to="/signin" />
        </Switch>
    )
}