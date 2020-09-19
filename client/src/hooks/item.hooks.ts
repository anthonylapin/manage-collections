import { useState, useCallback, useEffect, useContext } from "react";
import { useHttp } from "./http.hook";
import { ICollectionFormValues, IItemObj } from "../interfaces/common";
import { AuthContext } from "../context/AuthContext";

export function useItems(collectionId: string) {
  const [items, setItems] = useState<IItemObj[]>([]);
  const [itemsToShow, setItemsToShow] = useState<IItemObj[]>(items);
  const { request } = useHttp();

  const fetchItems = useCallback(
    async (key?: string) => {
      let url = key
        ? `/api/items/${collectionId}?key=${key}`
        : `/api/items/${collectionId}`;
      const fetchedItems = await request(url);
      setItems(fetchedItems.items);
      setItemsToShow(fetchedItems.items);
    },
    [request, collectionId]
  );

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, itemsToShow, setItemsToShow, fetchItems };
}

export function useItem(itemId: string) {
  const [item, setItem] = useState<IItemObj>({ name: "" });
  const [collection, setCollection] = useState<ICollectionFormValues>({
    name: "",
    owner: "",
    description: "",
    topic: "",
    numericFieldKey1: "",
    numericFieldKey2: "",
    numericFieldKey3: "",
    oneLineFieldKey1: "",
    oneLineFieldKey2: "",
    oneLineFieldKey3: "",
    textFieldKey1: "",
    textFieldKey2: "",
    textFieldKey3: "",
    dateFieldKey1: "",
    dateFieldKey2: "",
    dateFieldKey3: "",
    checkboxFieldKey1: "",
    checkboxFieldKey2: "",
    checkboxFieldKey3: "",
  });
  const { request } = useHttp();
  const { token } = useContext(AuthContext);

  const getItems = useCallback(async () => {
    try {
      const response = await request(`/api/items/item/${itemId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setCollection(response.collection);
      setItem(response.item);
    } catch (e) {}
  }, [itemId, request, token]);

  return { getItems, item, collection };
}
