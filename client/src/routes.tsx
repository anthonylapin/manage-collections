import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ManageCollectionsPage } from "./pages/collections/ManageCollectionsPage";
import { CreateCollectionPage } from "./pages/collections/CreateCollectionPage";
import { UpdateCollectionPage } from "./pages/collections/UpdateCollectionPage";
import { DeleteCollectionPage } from "./pages/collections/DeleteCollectionPage";
import { ShowCollectionsPage } from "./pages/collections/ShowCollectionsPage";
import { CollectionDetailPage } from "./pages/collections/CollectionDetailPage";
import { CreateItemPage } from "./pages/items/CreateItemPage";
import { UpdateItemPage } from "./pages/items/UpdateItemPage";
import { DeleteItemPage } from "./pages/items/DeleteItemPage";
import { DetailItemPage } from "./pages/items/DetailItemPage";
import { AuthPage } from "./pages/auth/AuthPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { SearchItemsPage } from "./pages/items/SearchItemsPage";
import { MainPage } from "./pages/common/MainPage";

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/manage/collections" exact>
          <ManageCollectionsPage />
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
        <Route path="/search/results">
          <SearchItemsPage />
        </Route>
        <Route path="/">
          <MainPage />
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
      <Route path="/item/detail/:itemId">
        <DetailItemPage />
      </Route>
      <Route path="/collection/detail/:id">
        <CollectionDetailPage />
      </Route>
      <Route path="/search/results">
        <SearchItemsPage />
      </Route>
      <Route path="/">
        <MainPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
