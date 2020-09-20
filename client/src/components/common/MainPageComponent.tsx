import React from "react";
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

  return (
    <div>
      <div className="text-center">
        <h5>Main page</h5>
      </div>
      <div className="row mt-5">
        <div className="col">
          Tag cloud
          <TagCloud tags={tags} onClick={onSearch} />
        </div>
        <div className="col">
          Last added items
          <ItemsList items={items} />
        </div>
        <div className="col">
          The biggest collections
          <CollectionsList collections={firstFiveCollections} />
        </div>
      </div>
    </div>
  );
};
