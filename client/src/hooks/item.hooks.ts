import { useState, useCallback, useEffect } from "react";
import { useHttp } from "./http.hook";
import { IItemObj } from "../interfaces/common";

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
