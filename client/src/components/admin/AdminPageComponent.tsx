import React, { useContext } from "react";

import { TranslateContext } from "../../context/TranslateContext";

export const AdminPageComponent: React.FC = () => {
  const { dictionary } = useContext(TranslateContext);
  return (
    <div className="text-center">
      <h2>{dictionary.adminPanel}</h2>
      <div></div>
    </div>
  );
};
