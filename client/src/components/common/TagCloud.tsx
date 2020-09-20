import React from "react";
import { ITagCloud } from "../../interfaces/common";

export const TagCloud: React.FC<ITagCloud> = ({ tags, onClick }) => {
  const handleClick = async (id: string | undefined) => {
    onClick(id);
  };

  return (
    <ul>
      {tags.map((tag, index) => (
        <li
          onClick={() => {
            handleClick(tag._id);
          }}
          style={{ cursor: "pointer" }}
          key={index}
          value={tag._id}
        >
          <span className="text-primary">{tag.name}</span>
        </li>
      ))}
    </ul>
  );
};
