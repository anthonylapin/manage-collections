import { createContext, Context } from "react";
import { ITranslateToggler } from "../interfaces/common";
import { Locales } from "../locale/locales";
import messages from "../locale/messages";

export const TranslateContext: Context<ITranslateToggler> = createContext<
  ITranslateToggler
>({
  locale: Locales.English,
  dictionary: messages[Locales.English],
});
