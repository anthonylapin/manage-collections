import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { ManageCollectionsForm } from "../../components/collections/ManageCollectionsForm";
import { darkTheme } from "../../components/themes/Themes";

export const ManageCollectionsPage = () => {
  const theme = useContext(ThemeContext);
  const isDark: boolean = theme === darkTheme;

  return <ManageCollectionsForm isDark={isDark} />;
};
