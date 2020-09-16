import React, { createContext, useReducer, Dispatch } from "react";
import { IItemObj } from "../interfaces/common";
import { ItemActions, itemReducer } from "../reducers/reducers";

type InitialStateType = {
  items: IItemObj[];
  query: string;
};

const initialState = {
  items: [],
  query: "",
};

const SearchContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ItemActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { items, query }: InitialStateType,
  action: ItemActions
) => ({
  items: itemReducer({ items, query }, action).items,
  query: itemReducer({ items, query }, action).query,
});

const SearchProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider, SearchContext };
