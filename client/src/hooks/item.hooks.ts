import { useState, useCallback, useEffect, useContext } from "react";
import { useHttp } from "./http.hook";
import { ICollectionFormValues, IItemObj } from "../interfaces/common";
import { AuthContext } from "../context/AuthContext";

export function useItems(collectionId: string) {
  const [items, setItems] = useState<IItemObj[]>([]);
  const { request } = useHttp();

  const fetchItems = useCallback(async () => {
    const fetchedItems = await request(`/api/items/${collectionId}`);
    setItems(fetchedItems.foundItems);
  }, [request, collectionId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items };
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

      console.log(response);
    } catch (e) {}
  }, [itemId, request, token]);

  return { getItems, item, collection };
}
