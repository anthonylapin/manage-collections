import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { SelectForm } from "../../components/common/SelectForm";
import { darkTheme } from "../../components/themes/Themes";
import { TranslateContext } from "../../context/TranslateContext";
import { useCollections } from "../../hooks/collection.hook";
import { useHttp } from "../../hooks/http.hook";

export const DeleteCollectionPage: React.FC = () => {
  const { collections, getCollections } = useCollections();
  const { request } = useHttp();
  const history = useHistory();
  const isDark = useContext(ThemeContext) === darkTheme;
  const { dictionary } = useContext(TranslateContext);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  const selectHandler = async (selectedId: string) => {
    try {
      await request(`/api/collections/${selectedId}`, "DELETE");
      history.push("/");
    } catch (e) {}
  };

  return (
    <div>
      <SelectForm
        items={collections.map((item) => ({
          _id: item._id,
          name: item.name,
        }))}
        onSelect={selectHandler}
        buttonClass={isDark ? "btn btn-outline-danger" : "btn btn-danger"}
        buttonAction={dictionary.Delete}
        target={dictionary.collection}
      />
    </div>
  );
};
