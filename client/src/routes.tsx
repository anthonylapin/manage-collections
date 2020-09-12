import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MainPage } from "./pages/MainPage";
import { CreateCollectionPage } from "./pages/collections/CreateCollectionPage";
import { UpdateCollectionPage } from "./pages/collections/UpdateCollectionPage";
import { DeleteCollectionPage } from "./pages/collections/DeleteCollectionPage";
import { ShowCollectionsPage } from "./pages/collections/ShowCollectionsPage";
import { CollectionDetailPage } from "./pages/collections/CollectionDetailPage";
import { CreateItemPage } from "./pages/items/CreateItemPage";
import { UpdateItemPage } from "./pages/items/UpdateItemPage";
import { DeleteItemPage } from "./pages/items/DeleteItemPage";
import { DetailItemPage } from "./pages/items/DetailItemPage";
export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/create/collection">
          <CreateCollectionPage />
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
        <Route path="/collection/detail/:id">
          <CollectionDetailPage />
        </Route>
        <Route path="/create/item/:collectionId">
          <CreateItemPage />
        </Route>
        <Route path="/update/item/:collectionId">
          <UpdateItemPage />
        </Route>
        <Route path="/delete/item/:collectionId">
          <DeleteItemPage />
        </Route>
        <Route path="/item/detail/:itemId">
          <DetailItemPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
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
  );
};
