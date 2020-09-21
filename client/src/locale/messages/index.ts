import { Locales } from "../locales";
import en from "./en.locale.json";
import ru from "./ru.locale.json";

export type Dictionary = {
  [id: string]: typeof en.en | typeof ru.ru;
};

const messages: Dictionary = {
  [Locales.English]: en.en,
  [Locales.Russian]: ru.ru,
};

export default messages;
