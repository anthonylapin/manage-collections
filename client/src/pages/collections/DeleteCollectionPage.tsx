import React, { useContext, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { SelectForm } from "../../components/common/SelectForm";
import { darkTheme } from "../../components/themes/Themes";
import { AuthContext } from "../../context/AuthContext";
import { TranslateContext } from "../../context/TranslateContext";
import { useCollections } from "../../hooks/collection.hook";
import { useHttp } from "../../hooks/http.hook";
import { useQuery } from "../../hooks/query.hook";

export const DeleteCollectionPage: React.FC = () => {
  const { collections, getCollections } = useCollections();
  const { request } = useHttp();
  const history = useHistory();
  const isDark = useContext(ThemeContext) === darkTheme;
  const { dictionary } = useContext(TranslateContext);
  const query = useQuery();
  const candidate = query.get("collectionId");
  const { isSuperuser } = useContext(AuthContext);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  const selectHandler = useCallback(
    async (selectedId: string) => {
      try {
        await request(`/api/collections/${selectedId}`, "DELETE");
        history.push("/");
      } catch (e) {}
    },
    [request, history]
  );

  useEffect(() => {
    if (isSuperuser && candidate) {
      selectHandler(candidate);
    }
  }, [isSuperuser, candidate, selectHandler]);

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
        target={dictionary.collectionPrescriptiveCase}
      />
    </div>
  );
};
