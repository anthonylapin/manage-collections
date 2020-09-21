import React, { useContext } from "react";
import { TranslateContext } from "../../context/TranslateContext";
import { ICollection, IItemObj, ITag } from "../../interfaces/common";
import { CollectionsList } from "../collections/CollectionsList";
import { ItemsList } from "../items/ItemsList";
import { TagCloud } from "./TagCloud";

interface IMainPageComponent {
  collections: ICollection[];
  items: IItemObj[];
  tags: ITag[];
  onSearch: (id: string | undefined) => void;
}

export const MainPageComponent: React.FC<IMainPageComponent> = ({
  collections,
  items,
  tags,
  onSearch,
}) => {
  const firstFiveCollections = collections.splice(0, 4);
  const { dictionary } = useContext(TranslateContext);

  return (
    <div>
      <div className="text-center">
        <h5>{dictionary.mainPage}</h5>
      </div>
      <div className="row mt-5">
        <div className="col">
          {dictionary.tagCloud}
          <TagCloud tags={tags} onClick={onSearch} />
        </div>
        <div className="col">
          {dictionary.lastAddedItems}
          <ItemsList items={items} />
        </div>
        <div className="col">
          {dictionary.theBiggestCollections}
          <CollectionsList collections={firstFiveCollections} />
        </div>
      </div>
    </div>
  );
};
