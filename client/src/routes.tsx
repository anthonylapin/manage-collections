import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage"
import {RegisterPage} from "./pages/RegisterPage"
import { MainPage } from './pages/MainPage'
import {AddCollectionPage} from "./pages/collections/AddCollectionPage"
import {UpdateCollectionPage} from "./pages/collections/UpdateCollectionPage"
import {DeleteCollectionPage} from "./pages/collections/DeleteCollectionPage"
import {ShowCollectionsPage} from "./pages/collections/ShowCollectionsPage"


export const useRoutes = (isAuthenticated: boolean) => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <MainPage />
                </Route>
                <Route path="/add/collection">
                    <AddCollectionPage />
                </Route>
                <Route path="/update/collection">
                    <UpdateCollectionPage />
                </Route>
                <Route path="/delete/collection">
                    <DeleteCollectionPage />
                </Route>
                <Route path="/show/collections">
                    <ShowCollectionsPage />
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