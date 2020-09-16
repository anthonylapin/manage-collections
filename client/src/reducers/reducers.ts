import { IItemObj } from "../interfaces/common";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Search = "SEARCH_ITEMS",
  Clear = "CLEAR_ITEMS",
}

// Items
type ItemPayload = {
  [Types.Search]: {
    items: IItemObj[];
    query: string;
  };
  [Types.Clear]: {
    items: IItemObj[];
    query: string;
  };
};

export type ItemActions = ActionMap<ItemPayload>[keyof ActionMap<ItemPayload>];

export const itemReducer = (
  state: { items: IItemObj[]; query: string },
  action: ItemActions
) => {
  switch (action.type) {
    case Types.Search:
      return { items: [...action.payload.items], query: action.payload.query };
    case Types.Clear:
      return { items: [], query: "" };
    default:
      return state;
  }
};
