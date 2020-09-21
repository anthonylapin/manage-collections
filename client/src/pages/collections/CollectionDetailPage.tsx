import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "../../hooks/collection.hook";
import { ICollectionDetailParams, IItemObj } from "../../interfaces/common";
import { CollectionCard } from "../../components/collections/CollectionCard";
import { useItems } from "../../hooks/item.hooks";
import { useTags } from "../../hooks/tag.hook";
import { ThemeContext } from "styled-components";
import { darkTheme } from "../../components/themes/Themes";
import { TranslateContext } from "../../context/TranslateContext";

export const CollectionDetailPage: React.FC = () => {
  const collectionId = useParams<ICollectionDetailParams>().id;
  const { collection, getCollection, collectionExists } = useCollection(
    collectionId
  );
  const { items, fetchItems, itemsToShow, setItemsToShow } = useItems(
    collectionId
  );
  const { tags, getTags } = useTags(true);
  const isDark = useContext(ThemeContext) === darkTheme;
  const { dictionary } = useContext(TranslateContext);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  useEffect(() => {
    getTags();
  }, [getTags]);

  if (!collectionExists) {
    return <h1>{dictionary.notFound}</h1>;
  }

  const sortItems = async (key: string) => {
    try {
      await fetchItems(key);
    } catch (error) {}
  };

  const filterItems = (key: string, value: string) => {
    if (!value) {
      setItemsToShow(items);
      return;
    }

    if (key === "name") {
      setItemsToShow((prev) =>
        prev.filter((item) => item.name.includes(value))
      );
      return;
    }

    let itemsIds: string[][] = [];
    tags.forEach((tag) => {
      if (value.includes(tag.name) || tag.name.includes(value)) {
        itemsIds.push(tag.items);
      }
    });

    let merged = itemsIds.flat();
    merged = removeDuplicatesFromArray(merged);

    const newItemsToShow: IItemObj[] = [];

    itemsToShow.forEach((item) => {
      if (item._id && merged.includes(item._id)) {
        newItemsToShow.push(item);
      }
    });

    setItemsToShow(newItemsToShow);
  };

  return (
    <div>
      <CollectionCard
        collection={collection}
        items={itemsToShow}
        onSort={sortItems}
        onFilter={filterItems}
        isDark={isDark}
      />
    </div>
  );
};

function removeDuplicatesFromArray(array: string[]) {
  const arrayOfUniqueIds: string[] = [];
  const uniqueArray: string[] = [];

  array.forEach((element) => {
    if (!arrayOfUniqueIds.includes(String(element))) {
      arrayOfUniqueIds.push(String(element));
      uniqueArray.push(element);
    }
  });

  return uniqueArray;
}
