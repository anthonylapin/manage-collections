import React, { useContext } from "react";
import { TranslateContext } from "../../context/TranslateContext";

export const OrComponent = () => {
  const { dictionary } = useContext(TranslateContext);
  return (
    <div className="or-container">
      <div className="line-separator"></div>
      <div className="or-label">{dictionary.or}</div>
      <div className="line-separator"></div>
    </div>
  );
};
