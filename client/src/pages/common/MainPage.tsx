import React, { useContext, useEffect } from "react";
import { ThemeContext } from "styled-components";
import { MainPageComponent } from "../../components/common/MainPageComponent";
import { useCollections } from "../../hooks/collection.hook";
import { useAllItems } from "../../hooks/item.hooks";
import { useSearch } from "../../hooks/search.hook";
import { useTags } from "../../hooks/tag.hook";
const SortBySizeKey = "SIZE";
const SortByDateKey = "DATE";

export const MainPage: React.FC = () => {
  const { collections, getAllCollections } = useCollections();
  const { items, fetchItems } = useAllItems();
  const { tags, getTags } = useTags(true);
  const tagsToShow = tags.filter((tag) => tag.items.length > 0);
  const theme = useContext(ThemeContext);
  const { searchItemsByTag } = useSearch();

  useEffect(() => {
    getAllCollections(SortBySizeKey);
    fetchItems(SortByDateKey);
    getTags();
  }, [getAllCollections, fetchItems, getTags, theme]);

  return (
    <MainPageComponent
      collections={collections}
      items={items}
      tags={tagsToShow}
      onSearch={searchItemsByTag}
    />
  );
};
